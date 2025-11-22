import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function AuthHeader() {
  const { pathname } = useLocation();

  return (
    <AppBar position="static" elevation={0} sx={{
      backgroundColor: "#f6deadff", color: "black"
    }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        <Typography variant="h5" fontWeight={700}>
          Habit Hero
        </Typography>

        <Box>
          <Button
            component={Link}
            to="/login"
            variant={pathname === "/login" ? "text" : "outlined"}
            sx={{
              backgroundColor: pathname === "/login" ? "#ab7f27ff" : "transparent",
              color: pathname === "/login" ? "#000" : "#2b2823ff",
              borderColor: "#f9eacbff",
              "&:hover": {
                backgroundColor: pathname === "/login"
                  ? "#775b1cff"
                  : "rgba(22, 21, 17, 0.2)",
                borderColor: "#e0ba61ff",
              },
              mr: 1
            }}>
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant={pathname === "/signup" ? "contained" : "outlined"}
            sx={{
              backgroundColor: pathname === "/signup" ? "#ab7f27ff" : "transparent",
              color: pathname === "/signup" ? "#000" : "#2b2823ff",
              borderColor: "#f9eacbff",
              "&:hover": {
                backgroundColor: pathname === "/signup" ? "#775b1cff" : "rgba(22, 21, 17, 0.2)",
                borderColor: "#e0ba61ff",
              }
            }}
          >
            Sign Up
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
export default AuthHeader
