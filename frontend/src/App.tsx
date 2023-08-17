import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WalletProvider from "./components/Wallet";
import { AuthLayout, ProtectedLayout } from "./components/FilterLayout";

// Tailwind Global StyleSheet
import "./assets/styles/index.css";

const Login = lazy(() => import("./view/auth/login"));
const Registry = lazy(() => import("./view/auth/registry"));
const Dashboard = lazy(() => import("./view/pages/dashboard"));
const NotFound = lazy(() => import("./view/404"));

function App() {
    return (
        <WalletProvider>
            <Router>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Routes>
                        <Route path="/" element={<ProtectedLayout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                        <Route path="/" element={<AuthLayout />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/registry" element={<Registry />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Router>
        </WalletProvider>
    );
}

export default App;
