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
            return result.data;
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

        return result.data;
    } catch (err: any) {
        return "auth_error";
    }
};

// Export Functions
const Action = {
    Registry,
    Login,
    CheckAuth,
};

export default Action;
