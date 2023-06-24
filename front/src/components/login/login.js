
import PropTypes from 'prop-types';
import { LoginWrapper } from './login.styled';
import React, { useState } from 'react';
import './login.css'; // Import the CSS file for styling
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   const handleSubmit = (e) => {
     e.preventDefault();
     // Perform login logic here with email and password
     console.log('Email:', email);
     console.log('Password:', password);
     // Reset form fields
     setEmail('');
     setPassword('');
     navigate(`/home`);
   };
 
   return (
     <div className="login-container">
       <div className="logo-container">
         <img src={require('../../images/Bahad_1_Symbol.SVG')}  alt="Logo" className="logo-image" />
       </div>
       <form onSubmit={handleSubmit} className="login-form">
         <div className='row'>
           <input
           className='input'
           placeholder='שם משתמש'
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
             
           />
         </div>
         <div className='row'>
           <input
            className='input'
            placeholder='סיסמה'
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             
           />
         </div>
         <button type="submit">התחבר</button>
       </form>
     </div>
   );
   };

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
