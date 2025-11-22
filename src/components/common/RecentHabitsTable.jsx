import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";

export default function RecentHabitsTable({ habits }) {
  if (!habits || habits.length === 0) return null;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">Recent Habits</Typography>
      <Card sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Frequency</b></TableCell>
              <TableCell><b>Start Date</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habits.map(h => (
              <TableRow key={h.id}>
                <TableCell>{h.name}</TableCell>
                <TableCell>{h.category}</TableCell>
                <TableCell>{h.frequency}</TableCell>
                <TableCell>{h.start_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}
