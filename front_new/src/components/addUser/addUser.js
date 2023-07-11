import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import './addUser.css';
const { sha256 } = require('crypto-hash');

const theme = createTheme({
   palette: {
      primary: {
         main: '#4CAF50', // Green color
      },
   },
});

const CreateUserForm = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleUsernameChange = (event) => {
      setUsername(event.target.value);
   };

   const handlePasswordChange = (event) => {
      setPassword(event.target.value);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const passwordHash = await sha256(password);
      const newUser = {
         username,
         password: passwordHash,
      };

      axios
         .post(`${process.env.REACT_APP_API}/persons/create`, newUser)
         .then((response) => {
            if (response.data.created) {
               alert('משתמש נוצר')
               console.log('User created:', response.data);
               
            } else {
               alert('תקלה ביצור משתמש')
            }
            // Do something with the response if needed
         })
         .catch((error) => {
            alert('תקלה ביצור משתמש')
            console.error('Error creating user:', error);
            // Handle error cases if needed
         });
   };

   return (
      <ThemeProvider theme={theme}>
         <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
         >
            <Box maxWidth={400} width="100%" p={2}>
               <form onSubmit={handleSubmit}>
                  <TextField
                     type="text"

                     label="שם משתתמש"
                     value={username}
                     onChange={handleUsernameChange}
                     fullWidth
                     margin="normal"
                     className='text'
                  />
                  <TextField
                     type="password"
                     label="סיסמה"
                     value={password}
                     onChange={handlePasswordChange}
                     fullWidth
                     margin="normal"
                     className='text'
                  />
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     fullWidth
                  >
                     הוסף משתמש
                  </Button>
               </form>
            </Box>
         </Box>
      </ThemeProvider>
   );
};

export default CreateUserForm;