import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../utils";

const auth = useAuth();

const ProtectedLayout = () => {
    return <>{auth ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

const AuthLayout = () => {
    return <>{!auth ? <Outlet /> : <Navigate to={"/dashboard"} />}</>;
};

export { ProtectedLayout, AuthLayout };
