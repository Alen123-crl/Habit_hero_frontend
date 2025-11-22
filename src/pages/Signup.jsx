import React, { useState } from "react";
import {
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Cake as CakeIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
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

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "#d1a245ff" },
      "&.Mui-focused fieldset": { borderColor: "#d1a245ff" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#d1a245ff" },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        fontWeight={600}
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: "24px", sm: "28px" },
          color: "#2b2823ff",
          mb: 3,
        }}
      >
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
          variant="outlined"
          {...register("first_name", { required: "First name is required" })}
          error={!!errors.first_name || !!backendErrors.first_name}
          helperText={
            errors.first_name?.message || backendErrors.first_name?.[0]
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#d1a245ff" }} />
              </InputAdornment>
            ),
          }}
          sx={textFieldSx}
        />

        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          variant="outlined"
          {...register("last_name")}
          error={!!errors.last_name || !!backendErrors.last_name}
          helperText={
            errors.last_name?.message || backendErrors.last_name?.[0]
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#d1a245ff" }} />
              </InputAdornment>
            ),
          }}
          sx={textFieldSx}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          {...register("email", {
            required: "Email is required",
          })}
          error={!!errors.email || !!backendErrors.email}
          helperText={errors.email?.message || backendErrors.email?.[0]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#d1a245ff" }} />
              </InputAdornment>
            ),
          }}
          sx={textFieldSx}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          {...register("password", {
            required: "Password is required",
          })}
          error={!!errors.password || !!backendErrors.password}
          helperText={errors.password?.message || backendErrors.password?.[0]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#d1a245ff" }} />
              </InputAdornment>
            ),
          }}
          sx={textFieldSx}
        />

        <TextField
          fullWidth
          label="Age"
          type="number"
          margin="normal"
          variant="outlined"
          {...register("age", { required: "Age is required" })}
          error={!!errors.age || !!backendErrors.age}
          helperText={errors.age?.message || backendErrors.age?.[0]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CakeIcon sx={{ color: "#d1a245ff" }} />
              </InputAdornment>
            ),
          }}
          sx={textFieldSx}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 2,
            py: 1.2,
            borderRadius: 2,
            backgroundColor: "#d1a245ff",
            color: "#fff",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#b9872dff",
            },
            "&:disabled": {
              backgroundColor: "#d1a245ff",
              opacity: 0.7,
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            py: 1.2,
            borderRadius: 2,
            borderColor: "#d1a245ff",
            color: "#2b2823ff",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#b9872dff",
              backgroundColor: "#f9eacbff",
            },
          }}
        >
          Continue with Google
        </Button>

        <Typography textAlign="center" mt={2} fontSize={{ xs: "14px", sm: "16px" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#d1a245ff",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
