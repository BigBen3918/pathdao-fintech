import { AuthApi, NormalApi } from "./http-common";

const Registry = async (param: any) => {
    try {
        let result: any = await NormalApi.post("/api/signup", param);

        if (result.data.success) {
            return true;
        } else {
            throw new Error("Failed Registry");
        }
    } catch (err: any) {
        throw new Error(err.message);
    }
};

const Login = async (param: any) => {
    try {
        let result: any = await NormalApi.post("/api/signin", param);

        if (result.data.token) {
            localStorage.setItem("token", result.data.token);

            return true;
        } else {
            throw new Error("Failed Login");
        }
    } catch (err: any) {
        throw new Error(err.message);
    }
};

const CheckAuth = async () => {
    try {
        let result: any = await AuthApi.post("/api/checkauth", {});

        return result.data.token;
    } catch (err: any) {
        if (err.response.status === 403) {
            // localStorage.removeItem("token");
            console.log(err);
        }
        return null;
    }
};

// Export Functions
const Action = {
    Registry,
    Login,
    CheckAuth,
};

export default Action;
