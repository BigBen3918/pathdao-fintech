import fs from "fs";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import config from "../config.json";

const htmlTemplate = fs
    .readFileSync(__dirname + "/email/template.html")
    .toString("utf8");

// encrypt password
export const CryptPassword = async (password: string, hashKey: number | 10) => {
    return await bcrypt.hash(password, hashKey);
};

// decrypt password
export const DecryptPassword = async (
    password: string,
    savedPassword: string
) => {
    return await bcrypt.compare(password, savedPassword);
};

// Unique Token Generator
export const GenerateToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

// Split Number (000, 000, 000)
export const styledNumber = (param: string | number) => {
    return param
        .toString()
        .replace(
            new RegExp(
                `(?!^)(?=(\\d{3})+${
                    param.toString().includes(".") ? "\\." : "$"
                })`,
                "g"
            ),
            ","
        );
};

// Match Date Format
export const ValidDate = (param: string) => {
    const checkDateRegexp =
        /^\d{4}([-\.\/])(?:0[1-9]|1[0-2])\1(?:0[1-9]|[12]\d|3[01])$/;

    return checkDateRegexp.test(param);
};

// Phone Number Format
export const StyledPhoneNumber = (param: string | number) => {
    const mobileRegexp = /(?=(\d{4})+$)/g;

    return param.toString().replace(mobileRegexp, "-");
};

// Current Time
export const Now = () => Math.round(new Date().getTime() / 1000);

// Mail Transfer
export const sendEmail = async (
    title: string,
    link: string,
    userEmail: string
) => {
    try {
        const html = htmlTemplate.replace(/\{([^>]*)\}/g, (full, keyword) => {
            if (keyword === "title") {
                return title;
            } else if (keyword === "orderlink") {
                return link;
            }
        });
        console.log(html);

        const transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass,
            },
        });

        await transporter.sendMail({
            from: "bitcoinevm@gmail.com",
            to: userEmail,
            subject: "Message",
            html: html,
        });

        console.log("Successfully Email Sent");
    } catch (error) {
        console.log(error);
        throw new Error("Email Not Sent");
    }
};
