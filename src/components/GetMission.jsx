import React, { useState, useEffect } from "react";
import { getMissions } from "../services/appConfig";
// import ControlMap from "./map/ControlMap";
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
// import { useNavigate } from 'react-router-dom'; 


const GetMission = () => {
  const [missions, setMissions] = useState([]);
  // const navigate = useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await getMissions();
        if (response && response.data.length > 0) {
          setMissions(response.data);
          console.log(response.data);
        } else {
          console.error("No missions found or unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching mission:", error);
      }
    }

    fetchMissions();

  }, []);


  return (
    <Container sx={{ py: 4 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Simulation</StyledTableCell>
              <StyledTableCell align="right">Rule</StyledTableCell>
              <StyledTableCell align="right">Start At</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {missions.length > 0 ? missions.map((element, index) =>
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {element.name}
                </TableCell>
                <TableCell align="right">{element.rules}</TableCell>
                <TableCell align="right">{element.start_at}</TableCell>
                <TableCell align="right">{element.status.name}</TableCell>
                <TableCell align="right">{element.created_at}</TableCell>
                <TableCell align="left">
                  <Link href={`mission-map?mission_id=${element.id}`}>Start Mission</Link> <br />
                  <Link href={`mission-command?mission_id=${element.id}`}>Command Center</Link>
                </TableCell>
              </TableRow>
            ) : <>Loading</>}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default GetMission;
