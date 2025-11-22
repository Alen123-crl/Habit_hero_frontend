import { Box, Typography } from "@mui/material";

function Footer() {
    return (
        <Box sx={{ textAlign: "center", py: 3, opacity: 0.6 }}>
            <Typography variant="body2">
                © {new Date().getFullYear()} Habit Hero. All rights reserved.
            </Typography>
        </Box>
    );
}
export default Footer
