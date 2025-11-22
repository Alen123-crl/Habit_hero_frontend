import { useEffect, useState, useContext } from "react";
import {
  Box, Card, Typography, Avatar, IconButton, Modal,
  TextField, Button, CircularProgress, Grid, Table, TableHead, TableRow, TableCell, TableBody,
  Snackbar, Alert
} from "@mui/material";

import {
  Edit as EditIcon, Close as CloseIcon, Email as EmailIcon,
  Cake as CakeIcon, Person as PersonIcon, Save as SaveIcon,
  CloudUpload as CloudUploadIcon, Delete as DeleteIcon,
} from "@mui/icons-material";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const modalStyle = {
  position: "absolute",
  top: "50%", left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: 450 },
  bgcolor: "background.paper",
  borderRadius: 3,
  p: 3,
};

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [open, setOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errors, setErrors] = useState({});
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [recentHabits, setRecentHabits] = useState([]);
  const [form, setForm] = useState({
    first_name: "", last_name: "", age: "", email: "", pro_pic: null
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

  const getUser = async () => {
    try {
      const { data } = await API.get("/user/me");
      setUser(data);
      setForm({ ...data, pro_pic: null });
    } finally {
      setLoadingUser(false);
    }
  };

  const getAnalytics = async () => {
    try {
      const { data } = await API.get("/analytics/overview/");
      setAnalytics(data);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const updateProfile = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));

    try {
      await API.patch("/user/me", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setErrors({});
      await getUser();
      setOpen(false);

      setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });

    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
        setSnackbar({ open: true, message: "Failed to update profile.", severity: "error" });
      }
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("Delete account?")) return;
    try {
      await API.delete("/user/me");
      logout();
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to delete account.", severity: "error" });
    }
  };

  const getRecentHabits = async () => {
    try {
      const { data } = await API.get("/habits/");
      const latest = data
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3);

      setRecentHabits(latest);
    } catch (err) {
      console.error("Failed to load habits", err);
      setSnackbar({ open: true, message: "Failed to load recent habits.", severity: "error" });
    }
  };

  useEffect(() => {
    getUser();
    getAnalytics();
    getRecentHabits();
  }, []);


  if (loadingUser)
    return (
      <Box sx={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ minHeight: "90vh", p: 3, background: "#f7f0e5" }}>

      {/* --------- Profile Card ---------- */}
      <Card
        sx={{
          maxWidth: 700,
          mx: "auto",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Grid container spacing={2} alignItems="center">

          {/* Avatar Section */}
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            display="flex"
            justifyContent="center"
          >
            <Avatar
              src={user.pro_pic || "/default.png"}
              sx={{
                width: { xs: 100, sm: 120 },
                height: { xs: 100, sm: 120 },
              }}
            />
          </Grid>

          {/* User Info Section */}
          <Grid item xs={12} sm={8} md={9}>
            <Typography
              variant="h4"
              fontWeight={600}
              textAlign={{ xs: "center", sm: "left" }}
            >
              {user.first_name} {user.last_name}
            </Typography>

            <Box mt={2} textAlign={{ xs: "center", sm: "left" }}>
              <Typography>
                <EmailIcon fontSize="small" /> {user.email}
              </Typography>
              <Typography>
                <CakeIcon fontSize="small" /> Age: {user.age}
              </Typography>
            </Box>

            {/* Buttons */}
            <Box
              mt={2}
              display="flex"
              gap={1}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={deleteAccount}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* --------- Analytics --------- */}
      {!loadingAnalytics && analytics && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 5
          }}
        >
          <Box sx={{ maxWidth: 1000, width: "100%" }}>
            <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
              Analytics Overview
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              {/* Total Habits */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="h6">Total Habits</Typography>
                  <Typography variant="h3" fontWeight="bold" color="primary">
                    {analytics.total_habits}
                  </Typography>
                </Card>
              </Grid>

              {/* Longest Streak */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="h6">Longest Streak</Typography>
                  <Typography variant="h3" fontWeight="bold" color="success.main">
                    {analytics.longest_streak || 0} Days
                  </Typography>
                </Card>
              </Grid>

              {/* Success Rate */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="h6">Success Rate</Typography>
                  <Typography variant="h3" fontWeight="bold" color="warning.main">
                    {analytics.avg_success_rate || 0}%
                  </Typography>
                </Card>
              </Grid>

              {/* Best Days */}
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3 }}>
                  <Typography variant="h6" mb={2} textAlign="center">
                    Best Days
                  </Typography>
                  {analytics.best_days && analytics.best_days.length > 0 ? (
                    analytics.best_days.map((day, i) => (
                      <Typography key={i} textAlign="center">
                        {day.date ? new Date(day.date).toLocaleDateString() : day} ({day.count || ''} check-ins)
                      </Typography>
                    ))
                  ) : (
                    <Typography textAlign="center">No data</Typography>
                  )}
                </Card>
              </Grid>

              {/* Habits By Category */}
              {analytics.habits_by_category && analytics.habits_by_category.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2} textAlign="center">
                      Habits By Category
                    </Typography>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ccc" }}>Category</th>
                          <th style={{ textAlign: "right", padding: "8px", borderBottom: "1px solid #ccc" }}>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.habits_by_category.map((c, index) => (
                          <tr key={index}>
                            <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                              {{
                                health: "Health",
                                work: "Work",
                                learning: "Learning",
                                fitness: "Fitness",
                                mental_health: "Mental Health",
                                productivity: "Productivity",
                                other: "Other",
                              }[c.category] || c.category}
                            </td>
                            <td style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #eee" }}>
                              {c.count}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      )}

      {/* --------- Recent Habits Table --------- */}
      {recentHabits.length > 0 && (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
          <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
            Recent Habits
          </Typography>

          <Card sx={{ p: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Category</b></TableCell>
                  <TableCell><b>Frequency</b></TableCell>
                  <TableCell><b>Start Date</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recentHabits.map((habit) => (
                  <TableRow key={habit.id}>
                    <TableCell>{habit.name}</TableCell>
                    <TableCell>{habit.category}</TableCell>
                    <TableCell>{habit.frequency}</TableCell>
                    <TableCell>{habit.start_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Box>
      )}

      {/* --------- Edit Modal ---------- */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6">Edit Profile</Typography>
            <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
          </Box>

          <TextField
            fullWidth
            label="First Name"
            margin="dense"
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1 }} /> }}
            error={!!errors.first_name}
            helperText={errors.first_name?.[0]}
          />

          <TextField
            fullWidth
            label="Last Name"
            margin="dense"
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1 }} /> }}
            error={!!errors.last_name}
            helperText={errors.last_name?.[0]}
          />

          <TextField
            fullWidth
            type="number"
            label="Age"
            margin="dense"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            InputProps={{ startAdornment: <CakeIcon sx={{ mr: 1 }} /> }}
            error={!!errors.age}
            helperText={errors.age?.[0]}
          />

          <TextField
            fullWidth
            label="Email"
            margin="dense"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1 }} /> }}
            error={!!errors.email}
            helperText={errors.email?.[0]}
          />

          <Button component="label" variant="outlined" fullWidth sx={{ mt: 2 }} startIcon={<CloudUploadIcon />}>
            Upload Image
            <input type="file" hidden accept="image/*"
              onChange={(e) => setForm({ ...form, pro_pic: e.target.files[0] })} />
          </Button>

          {form.pro_pic && (
            <Box textAlign="center" mt={2}>
              <Avatar src={URL.createObjectURL(form.pro_pic)} sx={{ width: 90, height: 90 }} />
            </Box>
          )}

          <Button fullWidth sx={{ mt: 3 }} variant="contained"
            startIcon={<SaveIcon />} onClick={updateProfile}>
            Save
          </Button>
        </Box>
      </Modal>

      {/* --------- Snackbar ---------- */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
