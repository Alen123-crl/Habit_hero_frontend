import { Box, Typography, Stack, Button, Paper } from "@mui/material";
import AuthHeader from "../components/common/AuthHeader";
import Footer from "../components/common/Footer";
import { Outlet, Link, useLocation } from "react-router-dom";

function AuthLayout() {
    const { pathname } = useLocation();
    const isLogin = pathname === "/login";

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

            <AuthHeader />

            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    px: 2,
                    py: 4,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <Box
                    sx={{
                        flex: 1,
                        maxWidth: "500px",
                        pr: 3,
                    }}
                >
                    <Typography variant="h4" fontWeight={700} mb={2}>
                        Welcome to Habit Hero
                    </Typography>

                    <Paper
                        elevation={0}
                        sx={{
                            bgcolor: "#f8f9fb",
                            height: 200,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#888",
                        }}
                    >
                        Illustration / Branding
                    </Paper>
                </Box>


                <Box
                    sx={{
                        flex: 1,
                        maxWidth: "420px",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}
export default AuthLayout
