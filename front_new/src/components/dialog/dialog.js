import React from "react";
import { DialogWrapper } from "./dialog.styled";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import "./calander.css";
import axios from "axios";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, solidier } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handlePhoneNumberClick = () => {
    window.location.href = `tel:${localStorage.getItem("phoneNumber")}`;
  };

  const addSchedule = async () => {
    const date = new Date(localStorage.getItem("date")); //.toLocaleString(); //check what time comes back
    date.setHours(localStorage.getItem("hour").split(":")[0]);
    date.setMinutes(localStorage.getItem("hour").split(":")[1]);
    date.setSeconds(0);
    console.log(date);
    await axios.post(
      `${process.env.REACT_APP_API}/schedules/${localStorage.getItem(
        "class"
      )}/${date}`,
      { username: localStorage.getItem("username") }
    );
    handleClose();
    window.location.reload();
  };

  if (solidier === "פנוי") {
    return (
      <Dialog onClose={handleClose} open={props.open}>
        <DialogTitle className="dialogTitle"> אשר קביעת כיתה</DialogTitle>
        <div className="content">
          <p className="description">
            {" "}
            כיתה מספר {localStorage.getItem("class")}
          </p>
          <p className="description"> תאריך {localStorage.getItem("date")} </p>
          <p className="description"> שעה {localStorage.getItem("hour")}</p>
          <Button
            variant="contained"
            color="success"
            onClick={() => addSchedule()}
          >
            אשר
          </Button>
        </div>
      </Dialog>
    );
  } else {
    return (
      <Dialog onClose={handleClose} open={props.open}>
        <DialogTitle className="dialogTitle"> תקלה, הכיתה תפוסה</DialogTitle>
        <div className="content">
          <p className="description"> כיתה {localStorage.getItem("class")}</p>
          <p className="description"> תאריך {localStorage.getItem("date")} </p>
          <p className="description"> שעה {localStorage.getItem("hour")}</p>
          <p className="description">אל תתבייש תן לו צלצול</p>
          <a
            href={`tel:${localStorage.getItem("phoneNumber")}`}
            onClick={handlePhoneNumberClick}
          >
            {localStorage.getItem("phoneNumber")}
          </a>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  solidier: PropTypes.string.isRequired,
};

export default function DialogComponnent(props, { handleClose }) {
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={props.open}
        onClose={props.handleClose}
        solidier={props.solidier}
      />
    </div>
  );
}
