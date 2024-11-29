import * as React from 'react';
import { Box } from '@mui/material';
import ToDoTable from './Table/Table';

export default function App() {
  return (
    <Box
      sx={{
        mx: { xs: 2.5, md: 8 },
      }}
    >
      <ToDoTable />
    </Box>
  );
}
