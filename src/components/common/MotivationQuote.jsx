import { Box, Typography } from "@mui/material";

export default function MotivationQuote({ quote }) {
  if (!quote) return null;

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        my: 3,
        p: 3,
        borderRadius: 3,
        bgcolor: "#e0f7fa",
        textAlign: "center",
        boxShadow: 2,
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        💡 Motivation
      </Typography>
      <Typography variant="h6" fontStyle="italic" color="text.secondary">
        "{quote}"
      </Typography>
    </Box>
  );
}
