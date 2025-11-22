import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
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
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        textAlign="center"
        mb={3}
        sx={{
          fontSize: { xs: "24px", sm: "26px" },
          fontWeight: 600,
          color: "#2b2823ff",
        }}
      >
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#d1a245ff" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          fullWidth
          type="password"
          variant="outlined"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#d1a245ff" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 1,
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Divider sx={{ my: 1 }}>OR</Divider>

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
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#d1a245ff",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginForm;
