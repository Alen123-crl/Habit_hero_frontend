import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function AuthHeader() {
  const { pathname } = useLocation();

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h5" fontWeight={700}>
          MyApp
        </Typography>

        <Box>
          <Button
            component={Link}
            to="/login"
            variant={pathname === "/login" ? "text" : "outlined"}
            sx={{ mr: 1 }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant={pathname === "/signup" ? "text" : "contained"}
          >
            Sign Up
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
export default AuthHeader
