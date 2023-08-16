import { Auth } from "./auth";

const RestApi = (router: any) => {
    // User API
    router.post("/signin", Auth.SIGNIN);
    router.post("/signup", Auth.SIGNUP);
    router.post("/password-reset", Auth.PASSRESET);
};

export default RestApi;
