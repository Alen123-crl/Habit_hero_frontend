import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";

function AppHeader() {
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Habits", path: "/habits" },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{ backgroundColor: "#f6deadff", color: "black" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight={700}>
          Habit Hero
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                variant={pathname === item.path ? "text" : "outlined"}
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
                {item.label}
              </Button>
            ))}
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
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
