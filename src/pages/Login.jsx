import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (errMessage) {
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
      <Typography variant="h5" textAlign="center" mb={3}>
        Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          fullWidth
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          fullWidth
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>

        <Divider>OR</Divider>

        <Button variant="outlined" fullWidth>Continue with Google</Button>

        <Typography textAlign="center" mt={1}>
          Don’t have an account?
          <Link to="/signup">&nbsp;Sign up</Link>
        </Typography>
      </Box>
    </Paper>
  );
}

export default LoginForm;
