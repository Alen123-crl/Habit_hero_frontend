import React, { useState } from "react";
import { Card, Box, Typography, Chip, Button, Collapse, TextField, Divider } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function HabitCard({
  habit,
  today,
  onCheckIn,
  onDelete,
  onEditOpen,
  noteText,
  setNoteText,
  openHistory,
  setOpenHistory,
}) {
  const [openNotes, setOpenNotes] = useState(false);

  const todayCount = habit.check_ins.filter((ci) => ci.date === today).length;
  const lastCheckIn = habit.check_ins.length ? habit.check_ins[0].date : "None";

  return (
    <Card sx={{ p: 2, borderRadius: 3, background: "#fff" }}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="h6">{habit.name}</Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          <Chip label={habit.category} color="primary" size="small" />
          <Chip label={habit.frequency} color="secondary" size="small" />
        </Box>
        <Typography color="text.secondary">Current Streak: <b>{habit.current_streak}</b></Typography>
        <Typography color="text.secondary">Longest Streak: <b>{habit.longest_streak}</b></Typography>
        <Typography color="text.secondary">Success Rate: <b>{habit.success_rate}%</b></Typography>
        <Typography color="text.secondary">Last Check-in: {lastCheckIn}</Typography>

        <Box display="flex" justifyContent="space-between" mt={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => onCheckIn(habit)}
            disabled={habit.start_date > today}
          >
            + Check-in
          </Button>
          <Typography fontWeight={600}>Today: {todayCount}</Typography>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
          <Button size="small" startIcon={<NotesIcon />} onClick={() => setOpenNotes(prev => !prev)}>
            Add Note
          </Button>
          <Button size="small" onClick={() => onEditOpen(habit)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(habit.id)}>Delete</Button>
          <Button
            size="small"
            startIcon={openHistory[habit.id] ? <RemoveIcon /> : <AddIcon />}
            onClick={() => setOpenHistory(prev => ({ ...prev, [habit.id]: !prev[habit.id] }))}
          >
            Check-ins
          </Button>
        </Box>

        {/* Notes Input */}
        <Collapse in={openNotes}>
          <Box mt={1}>
            <TextField
              label="Write a note..."
              fullWidth
              multiline
              rows={2}
              value={noteText[habit.id] || ""}
              onChange={(e) => setNoteText(prev => ({ ...prev, [habit.id]: e.target.value }))}
            />
            <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={() => onCheckIn(habit)}>
              Save Note & Check-in
            </Button>
          </Box>
        </Collapse>

        {/* Check-in History */}
        <Collapse in={openHistory[habit.id]}>
          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight={600}>Check-in History</Typography>
            <Divider sx={{ mb: 1 }} />
            {habit.check_ins.length === 0 ? (
              <Typography color="text.secondary">No check-ins yet.</Typography>
            ) : (
              habit.check_ins.map(ci => (
                <Card key={ci.id} sx={{ p: 1, mb: 1, background: "#fafafa" }}>
                  <Typography><b>Date:</b> {ci.date}</Typography>
                  <Typography><b>Time:</b> {new Date(ci.timestamp).toLocaleTimeString()}</Typography>
                  {ci.notes && <Typography mt={1}><b>Notes:</b> {ci.notes}</Typography>}
                </Card>
              ))
            )}
          </Box>
        </Collapse>
      </Box>
    </Card>
  );
}
