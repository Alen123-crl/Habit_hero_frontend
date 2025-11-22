import React from "react";
import { Modal, Box, Typography, TextField, MenuItem, Button } from "@mui/material";

export default function HabitModal({ open, onClose, habitData, setHabitData, onSave, categories, frequencies, disableStartDate }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                 width: { xs: "90%", sm: 400 }, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Typography variant="h6" mb={2}>{habitData?.id ? "Edit Habit" : "Add New Habit"}</Typography>

        <TextField label="Name" fullWidth sx={{ mb: 2 }} value={habitData.name} onChange={e => setHabitData({...habitData, name: e.target.value})} />
        <TextField label="Description" fullWidth multiline rows={2} sx={{ mb: 2 }} value={habitData.description} onChange={e => setHabitData({...habitData, description: e.target.value})} />

        <TextField select label="Category" fullWidth sx={{ mb: 2 }} value={habitData.category} onChange={e => setHabitData({...habitData, category: e.target.value})}>
          {categories.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
        </TextField>

        <TextField select label="Frequency" fullWidth sx={{ mb: 2 }} value={habitData.frequency} onChange={e => setHabitData({...habitData, frequency: e.target.value})}>
          {frequencies.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
        </TextField>

        <TextField
          label="Start Date"
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          value={habitData.start_date}
          onChange={e => setHabitData({...habitData, start_date: e.target.value})}
          InputLabelProps={{ shrink: true }}
          disabled={disableStartDate}
        />

        <Button variant="contained" fullWidth onClick={onSave}>
          {habitData?.id ? "Save Changes" : "Add Habit"}
        </Button>
      </Box>
    </Modal>
  );
}
