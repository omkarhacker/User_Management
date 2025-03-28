import React from 'react';
import Navbar from './Navbar';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;