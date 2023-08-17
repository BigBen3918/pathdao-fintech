import Action from "../service";

export const useSyncAuth = () => {
    var auth = localStorage.getItem("token");

    (async () => {
        if (auth) auth = await Action.CheckAuth();
    })();

    return auth;
};
