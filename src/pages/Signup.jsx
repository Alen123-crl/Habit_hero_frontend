import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [profilePic, setProfilePic] = useState(null);

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
          width: 380,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
          Create an Account
        </Typography>


        <TextField
          fullWidth
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="dense"
        />

        <TextField
          fullWidth
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="dense"
        />

    
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="dense"
        />

   
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="dense"
        />

      
        <TextField
          fullWidth
          type="number"
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          margin="dense"
        />

     
        <Button 
          variant="outlined" 
          component="label" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Upload Profile Picture
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </Button>

        {profilePic && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected: {profilePic.name}
          </Typography>
        )}

 
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1 }}
        >
          Sign Up
        </Button>

        <Divider sx={{ my: 3 }}>OR</Divider>

        
        <Button variant="outlined" fullWidth sx={{ py: 1 }}>
          Continue with Google
        </Button>

        <Typography variant="body2" textAlign="center" mt={3}>
          Already have an account?
          <span style={{ color: "#1976d2", cursor: "pointer" }}>
            &nbsp;Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default SignUp;
