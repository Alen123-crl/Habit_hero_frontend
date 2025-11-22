import { Modal, Box, Typography, TextField, Button, Avatar, IconButton } from "@mui/material";
import { Close as CloseIcon, Person as PersonIcon, Cake as CakeIcon, Email as EmailIcon, CloudUpload as CloudUploadIcon, Save as SaveIcon } from "@mui/icons-material";

const modalStyle = {
  position: "absolute",
  top: "50%", left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: 450 },
  bgcolor: "background.paper",
  borderRadius: 3,
  p: 3,
};

export default function EditProfileModal({ open, onClose, form, setForm, errors, onSave }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="h6">Edit Profile</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        <TextField fullWidth label="First Name" margin="dense" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1 }} /> }} error={!!errors.first_name} helperText={errors.first_name?.[0]} />
        <TextField fullWidth label="Last Name" margin="dense" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1 }} /> }} error={!!errors.last_name} helperText={errors.last_name?.[0]} />
        <TextField fullWidth type="number" label="Age" margin="dense" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} InputProps={{ startAdornment: <CakeIcon sx={{ mr: 1 }} /> }} error={!!errors.age} helperText={errors.age?.[0]} />
        <TextField fullWidth label="Email" margin="dense" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1 }} /> }} error={!!errors.email} helperText={errors.email?.[0]} />

        <Button component="label" variant="outlined" fullWidth sx={{ mt: 2 }} startIcon={<CloudUploadIcon />}>
          Upload Image
          <input type="file" hidden accept="image/*" onChange={e => setForm({ ...form, pro_pic: e.target.files[0] })} />
        </Button>
        {form.pro_pic && <Box textAlign="center" mt={2}><Avatar src={URL.createObjectURL(form.pro_pic)} sx={{ width: 90, height: 90 }} /></Box>}

        <Button fullWidth sx={{ mt: 3 }} variant="contained" startIcon={<SaveIcon />} onClick={onSave}>Save</Button>
      </Box>
    </Modal>
  );
}
