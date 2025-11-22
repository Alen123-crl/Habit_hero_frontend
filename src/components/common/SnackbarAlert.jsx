import { Snackbar, Alert } from "@mui/material";

export default function SnackbarAlert({ snackbar, setSnackbar }) {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
