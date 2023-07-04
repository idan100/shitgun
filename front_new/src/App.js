import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling
import styled from 'styled-components';
import Login from './components/login/login';
import HomeScreen from './components/home_screen/home_screen';
import CreateUserForm from './components/addUser/addUser'
import { Routes, Route } from 'react-router-dom';

const app = () => {

  return (<div className='whole-app'>
    
        <Routes>
          <Route path="/" element={ <Login></Login>} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/add" element={<CreateUserForm />} />
       </Routes>
    
    </div>)
};

export default app;