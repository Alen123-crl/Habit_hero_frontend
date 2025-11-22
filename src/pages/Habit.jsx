import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Chip,
  TextField,
  Collapse,
  CircularProgress,
  Divider,
  Modal,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import API from "../api/axios";

export default function HabitChecklist() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNotes, setOpenNotes] = useState({});
  const [openHistory, setOpenHistory] = useState({});
  const [noteText, setNoteText] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editHabit, setEditHabit] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Unified Snackbar state
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error", // "error" | "success" | "info" | "warning"
  });

  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    category: "other",
    frequency: "daily",
    start_date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    { value: "health", label: "Health" },
    { value: "work", label: "Work" },
    { value: "learning", label: "Learning" },
    { value: "fitness", label: "Fitness" },
    { value: "mental_health", label: "Mental Health" },
    { value: "productivity", label: "Productivity" },
    { value: "other", label: "Other" },
  ];

  const frequencies = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
  ];

  const getHabits = async () => {
    try {
      const { data } = await API.get("/habits/");
      setHabits(data);
    } finally {
      setLoading(false);
    }
  };

  const checkInHabit = async (habit) => {
    try {
      await API.post(`/habits/${habit.id}/checkin/`, {
        notes: noteText[habit.id] || "",
      });
      setNoteText((prev) => ({ ...prev, [habit.id]: "" }));
      getHabits();
      setAlert({ open: true, message: "Checked in successfully!", severity: "success" });
    } catch (err) {
      const message = err.response?.data?.error || "Check-in failed. Please try again.";
      setAlert({ open: true, message, severity: "error" });
    }
  };

  const addHabit = async () => {
    try {
      await API.post("/habits/", newHabit);
      setOpenModal(false);
      setNewHabit({
        name: "",
        description: "",
        category: "other",
        frequency: "daily",
        start_date: new Date().toISOString().split("T")[0],
      });
      getHabits();
      setAlert({ open: true, message: "Habit added successfully!", severity: "success" });
    } catch (err) {
      const message =
        err.response?.data?.start_date?.[0] ||
        err.response?.data?.error ||
        "Failed to add habit";
      setAlert({ open: true, message, severity: "error" });
    }
  };

  const deleteHabit = async (habitId) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;

    try {
      await API.delete(`/habits/${habitId}/`);
      getHabits();
      setAlert({ open: true, message: "Habit deleted successfully!", severity: "success" });
    } catch (err) {
      const message = err.response?.data?.error || "Failed to delete habit";
      setAlert({ open: true, message, severity: "error" });
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const getTodayCount = (habit) =>
    habit.check_ins.filter((ci) => ci.date === today).length;
  const getLastCheckin = (habit) =>
    !habit.check_ins.length ? "None" : habit.check_ins[0].date;

  useEffect(() => {
    getHabits();
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ minHeight: "90vh", p: { xs: 2, md: 3 }, background: "#f7f0e5" }}>
      <Typography variant="h4" fontWeight={600} textAlign="center" mb={3}>
        Daily Habit Checklist
      </Typography>

      {/* Add Habit Button */}
      <Box textAlign="center" mb={3}>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Habit
        </Button>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {habits.map((habit) => {
          const todayCount = getTodayCount(habit);
          const lastCheckIn = getLastCheckin(habit);

          return (
            <Grid item xs={12} sm={6} md={4} key={habit.id}>
              <Card sx={{ p: 2, borderRadius: 3, background: "#fff" }}>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography variant="h6" fontWeight={600}>
                    {habit.name}
                  </Typography>

                  <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    <Chip label={habit.category} color="primary" size="small" />
                    <Chip label={habit.frequency} color="secondary" size="small" />
                  </Box>

                  <Typography color="text.secondary">
                    Current Streak: <b>{habit.current_streak} days</b>
                  </Typography>
                  <Typography color="text.secondary">
                    Longest Streak: <b>{habit.longest_streak} days</b>
                  </Typography>
                  <Typography color="text.secondary">
                    Success Rate: <b>{habit.success_rate}%</b>
                  </Typography>
                  <Typography color="text.secondary">
                    Last Check-in: {lastCheckIn}
                  </Typography>

                  <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => checkInHabit(habit)}
                      disabled={habit.start_date > today}
                    >
                      + Check-in
                    </Button>
                    <Typography fontWeight={600}>Today: {todayCount}</Typography>
                  </Box>

                  <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                    <Button
                      size="small"
                      startIcon={<NotesIcon />}
                      onClick={() =>
                        setOpenNotes((prev) => ({ ...prev, [habit.id]: !prev[habit.id] }))
                      }
                    >
                      Add Note
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setEditHabit(habit);
                        setOpenEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => deleteHabit(habit.id)}
                    >
                      Delete
                    </Button>

                    <Button
                      size="small"
                      startIcon={openHistory[habit.id] ? <RemoveIcon /> : <AddIcon />}
                      onClick={() =>
                        setOpenHistory((prev) => ({ ...prev, [habit.id]: !prev[habit.id] }))
                      }
                    >
                      Check-ins
                    </Button>
                  </Box>

                  {/* Notes Input */}
                  <Collapse in={openNotes[habit.id]}>
                    <Box mt={1}>
                      <TextField
                        label="Write a note..."
                        fullWidth
                        multiline
                        rows={2}
                        value={noteText[habit.id] || ""}
                        onChange={(e) =>
                          setNoteText((prev) => ({ ...prev, [habit.id]: e.target.value }))
                        }
                      />
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => checkInHabit(habit)}
                      >
                        Save Note & Check-in
                      </Button>
                    </Box>
                  </Collapse>

                  {/* Check-in History */}
                  <Collapse in={openHistory[habit.id]}>
                    <Box mt={2}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Check-in History
                      </Typography>
                      <Divider sx={{ mb: 1 }} />
                      {habit.check_ins.length === 0 ? (
                        <Typography color="text.secondary">No check-ins yet.</Typography>
                      ) : (
                        habit.check_ins.map((ci) => (
                          <Card
                            key={ci.id}
                            sx={{ p: 1, mb: 1, background: "#fafafa" }}
                          >
                            <Typography>
                              <b>Date:</b> {ci.date}
                            </Typography>
                            <Typography>
                              <b>Time:</b> {new Date(ci.timestamp).toLocaleTimeString()}
                            </Typography>
                            {ci.notes && (
                              <Typography mt={1}>
                                <b>Notes:</b> {ci.notes}
                              </Typography>
                            )}
                          </Card>
                        ))
                      )}
                    </Box>
                  </Collapse>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Add Habit Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Add New Habit
          </Typography>

          <TextField
            label="Name"
            fullWidth
            sx={{ mb: 2 }}
            value={newHabit.name}
            onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={2}
            sx={{ mb: 2 }}
            value={newHabit.description}
            onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
          />
          <TextField
            select
            label="Category"
            fullWidth
            sx={{ mb: 2 }}
            value={newHabit.category}
            onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Frequency"
            fullWidth
            sx={{ mb: 2 }}
            value={newHabit.frequency}
            onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
          >
            {frequencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
            value={newHabit.start_date}
            onChange={(e) => setNewHabit({ ...newHabit, start_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" fullWidth onClick={addHabit}>
            Add Habit
          </Button>
        </Box>
      </Modal>

      {/* Edit Habit Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Edit Habit
          </Typography>

          {editHabit && (
            <>
              <TextField
                label="Name"
                fullWidth
                sx={{ mb: 2 }}
                value={editHabit.name}
                onChange={(e) => setEditHabit({ ...editHabit, name: e.target.value })}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={2}
                sx={{ mb: 2 }}
                value={editHabit.description}
                onChange={(e) =>
                  setEditHabit({ ...editHabit, description: e.target.value })
                }
              />
              <TextField
                select
                label="Category"
                fullWidth
                sx={{ mb: 2 }}
                value={editHabit.category}
                onChange={(e) =>
                  setEditHabit({ ...editHabit, category: e.target.value })
                }
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Frequency"
                fullWidth
                sx={{ mb: 2 }}
                value={editHabit.frequency}
                onChange={(e) =>
                  setEditHabit({ ...editHabit, frequency: e.target.value })
                }
              >
                {frequencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                sx={{ mb: 2 }}
                value={editHabit.start_date}
                onChange={(e) =>
                  setEditHabit({ ...editHabit, start_date: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                disabled={editHabit.start_date < today || editHabit.check_ins.length > 0}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={async () => {
                  try {
                    await API.patch(`/habits/${editHabit.id}/`, editHabit);
                    setOpenEditModal(false);
                    getHabits();
                    setAlert({ open: true, message: "Habit updated successfully!", severity: "success" });
                  } catch (err) {
                    const message =
                      err.response?.data?.error || "Failed to update habit";
                    setAlert({ open: true, message, severity: "error" });
                  }
                }}
              >
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Unified Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={alert.severity}
          sx={{ width: "100%" }}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
