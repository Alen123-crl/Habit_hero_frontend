import { Card, Grid, Typography, Avatar, Box, Button } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Email as EmailIcon, Cake as CakeIcon } from "@mui/icons-material";

export default function ProfileCard({ user, onEdit, onDelete }) {
  return (
    <Card sx={{ maxWidth: 700, mx: "auto", p: { xs: 2, sm: 3 } }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} md={3} display="flex" justifyContent="center">
          <Avatar
            src={user.pro_pic || "/default.png"}
            sx={{ width: { xs: 100, sm: 120 }, height: { xs: 100, sm: 120 } }}
          />
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h4" fontWeight={600} textAlign={{ xs: "center", sm: "left" }}>
            {user.first_name} {user.last_name}
          </Typography>

          <Box mt={2} textAlign={{ xs: "center", sm: "left" }}>
            <Typography><EmailIcon fontSize="small" /> {user.email}</Typography>
            <Typography><CakeIcon fontSize="small" /> Age: {user.age}</Typography>
          </Box>

          <Box mt={2} display="flex" gap={1} justifyContent={{ xs: "center", sm: "flex-start" }}>
            <Button variant="outlined" startIcon={<EditIcon />} onClick={onEdit}>Edit Profile</Button>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={onDelete}>Delete Account</Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
