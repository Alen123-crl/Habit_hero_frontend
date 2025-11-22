import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Button, CircularProgress, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import HabitCard from "../components/common/HabitCard";
import HabitModal from "../components/common/HabitModal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SnackbarAlert from "../components/common/SnackbarAlert";

export default function HabitChecklist() {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editHabit, setEditHabit] = useState(null);
  const [noteText, setNoteText] = useState({});
  const [openHistory, setOpenHistory] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "error" });

  const categories = [
    { value: "health", label: "Health" }, { value: "work", label: "Work" },
    { value: "learning", label: "Learning" }, { value: "fitness", label: "Fitness" },
    { value: "mental_health", label: "Mental Health" }, { value: "productivity", label: "Productivity" },
    { value: "other", label: "Other" }
  ];
  const frequencies = [{ value: "daily", label: "Daily" }, { value: "weekly", label: "Weekly" }];

  const today = new Date().toISOString().split("T")[0];


  const getHabits = async () => { try { const { data } = await API.get("/habits/"); setHabits(data); } finally { setLoading(false); } };

  const checkInHabit = async (habit) => {
    try {
      await API.post(`/habits/${habit.id}/checkin/`, { notes: noteText[habit.id] || "" });
      setNoteText(prev => ({ ...prev, [habit.id]: "" }));
      getHabits();
      setAlert({ open: true, message: "Checked in successfully!", severity: "success" });
    } catch (err) {
      const message = err.response?.data?.error || "Check-in failed";
      setAlert({ open: true, message, severity: "error" });
    }
  };

  const addOrEditHabit = async () => {
    try {
      if (editHabit?.id) {
        await API.patch(`/habits/${editHabit.id}/`, editHabit);
        setAlert({ open: true, message: "Habit updated successfully!", severity: "success" });
      } else {
        await API.post("/habits/", editHabit);
        setAlert({ open: true, message: "Habit added successfully!", severity: "success" });
      }
      setOpenModal(false); setEditHabit(null); getHabits();
    } catch (err) {
      const message = err.response?.data?.error || "Failed";
      setAlert({ open: true, message, severity: "error" });
    }
  };

const handleDeleteConfirm = (habitId) => {
    setHabitToDelete(habitId);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/habits/${habitToDelete}/`);
      setAlert({ open: true, message: "Habit deleted successfully!", severity: "success" });
      getHabits();
    } catch {
      setAlert({ open: true, message: "Failed to delete habit", severity: "error" });
    }
    setHabitToDelete(null);
    setConfirmOpen(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14); doc.text(`Name: ${user.first_name || "N/A"}`, 14, 20); doc.text(`Email: ${user.email || "N/A"}`, 14, 28);
    doc.setFontSize(18); doc.text("User Habits Report", 14, 38);

    let startY = 48;
    habits.forEach((habit, index) => {
      const yOffset = startY + index * 10;
      doc.setFontSize(14); doc.text(`${habit.name} (${habit.category} - ${habit.frequency})`, 14, yOffset);
      if (habit.check_ins.length > 0) {
        const checkInData = habit.check_ins.map(ci => [ci.date, new Date(ci.timestamp).toLocaleTimeString(), ci.notes || "-"]);
        autoTable(doc, { head: [["Date", "Time", "Notes"]], body: checkInData, startY: yOffset + 4, theme: "grid", styles: { fontSize: 10 } });
        startY = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : yOffset + 20;
      } else { doc.setFontSize(12); doc.text("No check-ins yet.", 14, yOffset + 6); startY += 16; }
    });
    doc.save("habit_report.pdf");
  };

  useEffect(() => { getHabits(); }, []);

  if (loading) return <Box sx={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box>;

   return (
    <Box sx={{ minHeight: "90vh", p: 3, background: "#f7f0e5" }}>
      <Typography variant="h4" fontWeight={600} textAlign="center" mb={3}>
        Daily Habit Checklist
      </Typography>

      <Box textAlign="center" mb={3}>
        <Button
          variant="contained"
          onClick={() => {
            setEditHabit({ name: "", description: "", category: "other", frequency: "daily", start_date: today });
            setOpenModal(true);
          }}
          sx={{ mr: 2 }}
        >
          Add Habit
        </Button>
        <Button variant="outlined" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Box>

      <Grid container spacing={3}>
        {habits.map((habit) => (
          <Grid item xs={12} sm={6} md={4} key={habit.id}>
            <HabitCard
              habit={habit}
              today={today}
              onCheckIn={checkInHabit}
              onDelete={() => handleDeleteConfirm(habit.id)}
              onEditOpen={(h) => {
                setEditHabit(h);
                setOpenModal(true);
              }}
              noteText={noteText}
              setNoteText={setNoteText}
              openHistory={openHistory}
              setOpenHistory={setOpenHistory}
            />
          </Grid>
        ))}
      </Grid>

      {editHabit && (
        <HabitModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          habitData={editHabit}
          setHabitData={setEditHabit}
          onSave={addOrEditHabit}
          categories={categories}
          frequencies={frequencies}
          disableStartDate={editHabit.check_ins?.length > 0}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Habit"
        message="Are you sure you want to delete this habit? This action cannot be undone."
      />

      <SnackbarAlert snackbar={alert} setSnackbar={setAlert} />
    </Box>
  );
}
