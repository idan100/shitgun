import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import BasicDateCalendar from '../calander/calander';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { heIL } from '@mui/material/locale';
import './calanderDialog.css';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
   const { onClose, selectedValue, open } = props;

   const handleClose = () => {
      onClose(selectedValue);
   };

   const theme = createTheme(
      {
         palette: {
            primary: { main: '#1976d2' },
         },
      },
      heIL,
   );

   return (
      <Dialog onClose={handleClose} open={props.open}>
         <DialogTitle className='dialogTitle'>בחר תאריך</DialogTitle>
         <ThemeProvider theme={theme}>
            <BasicDateCalendar></BasicDateCalendar>
         </ThemeProvider>
      </Dialog>
   );
}

SimpleDialog.propTypes = {
   onClose: PropTypes.func.isRequired,
   open: PropTypes.bool.isRequired,
   selectedValue: PropTypes.string.isRequired,
};

export default function CalanderDialogComponnent(props, { handleClose }) {


   const [selectedValue, setSelectedValue] = React.useState(emails[1])

   return (
      <div>
         <SimpleDialog
            selectedValue={selectedValue}
            open={props.open}
            onClose={props.handleClose}
         />
      </div>
   );
}