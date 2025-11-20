import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 350,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
          Welcome Back
        </Typography>

        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />

        <Button variant="contained" fullWidth sx={{ mt: 2, py: 1 }}>
          Login
        </Button>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button variant="outlined" fullWidth sx={{ py: 1 }}>
          Continue with Google
        </Button>

        <Typography variant="body2" textAlign="center" mt={3}>
          Don’t have an account?
          <span style={{ color: "#1976d2", cursor: "pointer" }}>
            &nbsp;Sign up
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginForm;
