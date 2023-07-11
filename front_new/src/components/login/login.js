import PropTypes from "prop-types";
import { LoginWrapper } from "./login.styled";
import React, { useState } from "react";
import "./login.css"; // Import the CSS file for styling
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
const { sha256 } = require("crypto-hash");

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here with email and password
    console.log("Email:", email);
    console.log("Password:", password);
    // Reset form fields
    const passwordHash = await sha256(password);
    axios
      .post(`${process.env.REACT_APP_API}/auth`, {
        username: email,
        password: passwordHash,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.approved === true) {
          localStorage.setItem("username", email);
          localStorage.setItem("phoneNumber", res.data.phoneNumber);
          navigate(`/home`);
        } else {
          throw new Error("auth failed");
        }
      })
      .catch((err) => {
        setEmail("");
        setPassword("");
        setShowAlert(true);
      });
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img
          src={require("../../images/Bahad_1_Symbol.SVG")}
          alt="Logo"
          className="logo-image"
        />
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="row">
          <input
            className="input"
            placeholder="שם משתמש"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="row">
          <input
            className="input"
            placeholder="סיסמה"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">התחבר</button>
      </form>

      <Alert
        className="alert"
        style={{ display: showAlert ? "block" : "none" }}
        variant="filled"
        severity="error"
      >
        הזדהות נכשלה
      </Alert>
    </div>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
