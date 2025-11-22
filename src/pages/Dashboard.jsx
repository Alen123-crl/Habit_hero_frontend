import React, { useState, useEffect, useContext } from "react";
import MotivationQuote from "../components/common/MotivationQuote";
import ProfileCard from "../components/common/ProfileCard";
import AnalyticsOverview from "../components/common/AnalyticsOverview";
import RecentHabitsTable from "../components/common/RecentHabitsTable";
import EditProfileModal from "../components/common/EditProfileModal";
import SnackbarAlert from "../components/common/SnackbarAlert";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import ConfirmDialog from "../components/common/ConfirmDialog";
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", age: "", email: "", pro_pic: null
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
  const [quote, setQuote] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  const quotes = [
    "Don't watch the clock; do what it does. Keep going.",
    "You are stronger than you think.",
    "Small steps every day lead to big results.",
  ];

  useEffect(() => {
    if (firstRender) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setFirstRender(false);
    }
  }, [firstRender]);


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

  const confirmDeleteAccount = () => {
    setConfirmOpen(true);
  };

  const deleteAccount = async () => {
    try {
      await API.delete("/user/me");
      logout();
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to delete account.", severity: "error" });
    } finally {
      setConfirmOpen(false);
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
      <MotivationQuote quote={quote} />
      <ProfileCard user={user} onEdit={() => setOpen(true)} onDelete={confirmDeleteAccount} />
      <AnalyticsOverview analytics={analytics} />
      <RecentHabitsTable habits={recentHabits} />
      <EditProfileModal open={open} onClose={() => setOpen(false)} form={form} setForm={setForm} errors={errors} onSave={updateProfile} />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={deleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
      <SnackbarAlert snackbar={snackbar} setSnackbar={setSnackbar} />
    </Box>
  );
}
