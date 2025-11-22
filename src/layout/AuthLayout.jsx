import { Box, Typography, Paper } from "@mui/material";
import AuthHeader from "../components/common/AuthHeader";
import Footer from "../components/common/Footer";
import { Outlet, useLocation } from "react-router-dom";

function AuthLayout() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AuthHeader />

      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        mt={4}
        mb={2}
      >
        Welcome to Habit Hero
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          px: { xs: 2, sm: 4 },
          py: { xs: 1, sm: 2 },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: { xs: "100%", sm: "90%", md: "900px" },
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            my: { xs: 1, md: 0 },
          }}
        >
        
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#f9eacbff",
              p: { xs: 2, md: 3 },
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRight: { md: "1px solid #e6e9f2" },
            }}
          >
            <Box
              component="img"
              src="https://www.archerandolive.com/cdn/shop/articles/square_70b1ddf3-0c44-4554-9465-fcd26f097da8.jpg?v=1503610055"
              alt="Habit Tracker"
              sx={{
                width: "90%",
                height: "70%",
                objectFit: "cover",
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            />
          </Box>

        
          <Box
            sx={{
              flexBasis: { xs: "100%", md: "50%" },
              p: { xs: 3, sm: 4, md: 4 },
              display: "flex",
              justifyContent: "center",
              alignItems: { xs: "flex-start", md: "center" },
              minWidth: 0,
              overflowY: "auto",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 400, md: 450 } }}>
              <Outlet />
            </Box>
          </Box>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
}

export default AuthLayout;
