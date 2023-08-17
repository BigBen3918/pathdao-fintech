import Action from "../service";

export const useAuth = () => {
    var auth = localStorage.getItem("token");

    (async () => {
        if (auth) auth = await Action.CheckAuth();
    })();

    return auth ? true : false;
};
