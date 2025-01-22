import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom


const MissionMap = () => {
  const [mission, setMission] = useState(null);
  const navigate = useNavigate();


  return (
    <Container sx={{ py: 4 }}>
      <h1>Hello mission command center</h1>
    </Container>
  );
};

export default MissionMap;
