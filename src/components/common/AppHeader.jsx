import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";


function AppHeader() {
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);
  return (
    <AppBar position="static" elevation={0} color="transparent" sx={{
      backgroundColor: "#f6deadff", color: "black"
    }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        <Typography variant="h5" fontWeight={700}>
          Habit Hero
        </Typography>

        <Box>


          <Button
            component={Link}
            to="/dashboard"
            variant={pathname === "/dashboard" ? "text" : "outlined"}
            sx={{
              mr: 1,
              color: "#2b2823ff",
              borderColor: "#d1a245ff",
              "&:hover": {
                backgroundColor: "#f9eacbff",
                borderColor: "#b9872dff",
                color: "#000",
              },
            }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/habits"
            variant={pathname === "/habits" ? "text" : "outlined"}
            sx={{
              color: "#2b2823ff",
              borderColor: "#d1a245ff",
              "&:hover": {
                backgroundColor: "#f9eacbff",
                borderColor: "#b9872dff",
                color: "#000",
              },
            }}
          >
            Habits
          </Button>
          <Button
            onClick={logout}
            variant={pathname === "/login" ? "text" : "outlined"}
            sx={{
              m: 1,
              color: "#2b2823ff",
              borderColor: "#d1a245ff",
              "&:hover": {
                backgroundColor: "#f9eacbff",
                borderColor: "#b9872dff",
                color: "#000",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
