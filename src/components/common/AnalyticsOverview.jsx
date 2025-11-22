import { Box, Grid, Card, Typography } from "@mui/material";

export default function AnalyticsOverview({ analytics }) {
  if (!analytics) return null;

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 5 }}>
      <Box sx={{ maxWidth: 1000, width: "100%" }}>
        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
          Analytics Overview
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Total Habits</Typography>
              <Typography variant="h3" fontWeight="bold" color="primary">{analytics.total_habits}</Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Longest Streak</Typography>
              <Typography variant="h3" fontWeight="bold" color="success.main">{analytics.longest_streak || 0} Days</Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Success Rate</Typography>
              <Typography variant="h3" fontWeight="bold" color="warning.main">{analytics.avg_success_rate || 0}%</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
