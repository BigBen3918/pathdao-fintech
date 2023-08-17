import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedLayout = () => {
    const auth = useSelector((state: any) => state.auth.authStatus);
    return <>{auth ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

const AuthLayout = () => {
    const auth = useSelector((state: any) => state.auth.authStatus);
    return <>{!auth ? <Outlet /> : <Navigate to={"/dashboard"} />}</>;
};

export { ProtectedLayout, AuthLayout };
