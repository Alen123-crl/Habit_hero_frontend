import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import LoginForm from "../pages/Login";
import SignUpForm from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import AppLayout from "../layout/AppLayout";

export default function AppRoutes() {
    return (
        <Routes>

            {/* PUBLIC AUTH ROUTES */}
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<Navigate to="login" replace />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
            </Route>

            {/* PROTECTED APPLICATION ROUTES */}
            <Route path="/" element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>

        </Routes>
    );
}
