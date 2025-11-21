import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [backendErrors, setBackendErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    setBackendErrors({});
    setGeneralError("");
    setLoading(true);

    try {
      await API.post("/signup/", formData);
      navigate("/login");
    } catch (err) {
      const data = err?.response?.data;

      if (data && typeof data === "object") {
        setBackendErrors(data);
      } else {
        setGeneralError("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 400, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Create Account
      </Typography>

      {generalError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {generalError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>

        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          {...register("first_name", { required: "First name is required" })}
          error={!!errors.first_name || !!backendErrors.first_name}
          helperText={
            errors.first_name?.message || backendErrors.first_name?.[0]
          }
        />

        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          {...register("last_name", { required: "Last name is required" })}
          error={!!errors.last_name || !!backendErrors.last_name}
          helperText={
            errors.last_name?.message || backendErrors.last_name?.[0]
          }
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register("email", {
            required: "Email is required",
          })}
          error={!!errors.email || !!backendErrors.email}
          helperText={errors.email?.message || backendErrors.email?.[0]}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register("password", {
            required: "Password is required",
          })}
          error={!!errors.password || !!backendErrors.password}
          helperText={errors.password?.message || backendErrors.password?.[0]}
        />

        <TextField
          fullWidth
          label="Age"
          margin="normal"
          {...register("age", { required: "Age is required" })}
          error={!!errors.age || !!backendErrors.age}
          helperText={errors.age?.message || backendErrors.age?.[0]}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            mt: 2,
            borderRadius: "100px",
            background: "#444444",
            "&:hover": { backgroundColor: "#333" },
            fontWeight: 600,
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm;
