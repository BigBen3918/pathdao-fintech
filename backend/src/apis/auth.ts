import { Request, Response, NextFunction } from "express";
import { ethers } from "ethers";
import jwt from "jsonwebtoken";

import { Controllers } from "../controllers";
import { CryptPassword, DecryptPassword } from "../utils";
import setlog from "../utils/setlog";
import config from "../config.json";

const SIGNIN = async (req: Request, res: Response) => {
    try {
        const { email, password }: SignInObject = req.body;

        if (!(email.toString().trim() && password.toString().trim())) {
            return res.status(400).send("Please Enter All Required Data.");
        }

        const [user] = await Controllers.Auth.find({
            filter: { email: email.toLowerCase().trim() },
        });

        // User check
        if (!user) {
            return res.status(404).send("User Not Exist. Please Registry");
        }

        // Password check
        const pass = await DecryptPassword(password, user.password);

        if (pass) {
            // if (!user.verify) {
            //     return res.status(403).send("User Not Verified. Please Verify");
            // }

            const token = jwt.sign(
                { user_id: user._id, email: email.toLowerCase().trim() },
                String(config.jwtTokenKey),
                {
                    expiresIn: "10000",
                }
            ); // Create token

            res.status(200).json({ token: token });
        } else {
            return res.status(400).send("Password or Username Is Not Correct");
        }
    } catch (err: any) {
        setlog("auth/SIGNIN", err);
        res.status(500).send("Failed SignIn");
    }
};

const SIGNUP = async (req: Request, res: Response) => {
    try {
        const { email, password, signature }: SignUpObject = req.body;

        if (!(email.trim() && password.trim())) {
            return res.status(400).send("Please enter all required data.");
        } // Check user

        const account = ethers.verifyMessage(config.signatureMsg, signature);

        const [oldUser] = await Controllers.Auth.find({
            filter: { email: email.toLowerCase().trim() },
        });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        let encryptedPassword = await CryptPassword(password, 10); // Encrypt password

        const result = await Controllers.Auth.create({
            email: email.toLowerCase().trim(),
            password: encryptedPassword,
            address: account,
        }); // Save user data

        if (result) {
            res.status(200).json({
                success: true,
            });
        } else {
            throw new Error("Dabase Error");
        }
    } catch (err: any) {
        setlog("auth/SIGNUP", err);
        res.status(500).send("Failed SignUp");
    }
};

const PASSRESET = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user: any = await Controllers.Auth.find({
            filter: { email: email.toString().trim() },
        });

        if (!user)
            return res.status(400).send("User With Given Email Doesn't Exist");
    } catch (err: any) {
        setlog("auth/PASSRESET", err);
        res.status(500).send("Failed Password Reset");
    }
};

const CheckAuth = async (req: any, res: Response) => {
    const token = jwt.sign(
        { user_id: req.user._id, email: req.user.email },
        String(config.jwtTokenKey),
        {
            expiresIn: "2h",
        }
    ); // Update token

    res.status(200).json({ token: token });
};

// Middleware
const Middleware = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = <string>req.headers["authorization"] || "";

        jwt.verify(
            token,
            config.jwtTokenKey,
            async (err: any, userData: any) => {
                if (err) return res.status(403).send(err.message);

                const user: any = await Controllers.Auth.find({
                    filter: {
                        email: userData.email,
                    },
                });
                req.user = user; // Save user data

                next();
            }
        );
    } catch (err: any) {
        setlog("auth/Middleware", err);
        res.status(401).send("Autherization Error");
    }
};

export const Auth = {
    SIGNIN,
    SIGNUP,
    PASSRESET,
    Middleware,
    CheckAuth,
};
