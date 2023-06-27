import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { HomeScreenWrapper } from "./home_screen.styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import TextField from '@mui/material/TextField';
import "./home.css"; // Import the CSS file for styling
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import EventIcon from "@mui/icons-material/Event";
import Paper from "@mui/material/Paper";
import DialogComponnent from "../dialog/dialog";
import CalanderDialogComponnent from "../calanderDialog/calanderDialog";
import axios from "axios";
import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const HomeScreen = () => {
  useEffect(() => {
    window.localStorage.setItem("date", dayjs(new Date()));
    window.localStorage.setItem("class", 101);

    axios
      .get(`http://localhost:3000/class`, {
        params: { class: window.localStorage.getItem("class") },
      })
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
        setRows([
          createData("עילי טרטמן", "7:00"),
          createData("יובל תנעמי", "8:00"),
          createData("רון שמחי", "9:00"),
          createData("עידן אפריים", "10:00"),
          createData("אסי עזר", "11:00"),
          createData("אסי עזר", "12:00"),
          createData("אסי עזר", "13:00"),
          createData("אסי עזר", "14:00"),
          createData("אסי עזר", "15:00"),
          createData("אסי עזר", "16:00"),
          createData("אסי עזר", "17:00"),
          createData("אסי עזר", "18:00"),
          createData("אסי עזר", "19:00"),
          createData("אסי עזר", "20:00"),
          createData("אסי עזר", "21:00"),
        ]);
      });
  }, []);

  const [open, setOpen] = React.useState(false);

  const [rows, setRows] = React.useState([]);

  const [searchOptions, setSearchOptions] = React.useState([
    100, 101, 102, 103, 104,
  ]);

  const showDialog = (row) => {
    console.log(row);
    window.localStorage.setItem("hour", row.hour);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [calanderOpen, setCalanderOpen] = React.useState(false);

  const showCalanderDialog = (row) => {
    setCalanderOpen(true);
  };

  const handleCalanderClose = () => {
    setCalanderOpen(false);
  };

  function createData(name, hour) {
    return { name, hour };
  }

  const [classVal, setClassVal] = React.useState(101);

  return (
    <div className="whole-page">
      <div className="image-wrapper">
        <img src={require("../../images/user1.avif")} className="profile"></img>
        <h2 className="welcome"> ברוך שובך ענני </h2>
      </div>
      <div className="table">
        {/* <BasicDateCalendar></BasicDateCalendar> */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Paper
                component="form"
                className="search"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={searchOptions}
                  className="searchField"
                  freeSolo
                  value={classVal}
                  onChange={(event, newValue) => {
                    setClassVal(newValue);
                    window.localStorage.setItem("class", newValue);
                    axios
                      .get(`http://localhost:3000/class`, {
                        params: { class: window.localStorage.getItem("class") },
                      })
                      .then((res) => {
                        setRows(res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                  onInputChange={async (event, value, reason) => {
                    if (reason === "input") {
                      setSearchOptions(
                        await axios.get(`http://localhost:3000/clases`)
                      );
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="בחר כיתה" />
                  )}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  onClick={() => showCalanderDialog()}
                  color="primary"
                  sx={{ p: "10px" }}
                  aria-label="directions"
                >
                  <EventIcon />
                </IconButton>
              </Paper>
            </Toolbar>
          </AppBar>
        </Box>
        <TableContainer className="real-table">
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
          <Table aria-label="simple table" className="table-content">
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  <p className="table-header"> צוער חתום </p>
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <p className="table-header"> שעה </p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  onClick={() => showDialog(row)}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.hour}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <DialogComponnent
        open={open}
        handleClose={handleClose}
      ></DialogComponnent>
      <CalanderDialogComponnent
        open={calanderOpen}
        handleClose={handleCalanderClose}
      ></CalanderDialogComponnent>
    </div>
  );
};

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default HomeScreen;
