import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function ConfirmDialog({ open, onClose, onConfirm, title = "Confirm", message = "Are you sure?" }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={() => { onConfirm(); onClose(); }} color="error" variant="contained">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
