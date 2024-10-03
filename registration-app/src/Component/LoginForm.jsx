
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Loginform.css';
import { GiJumpAcross } from "react-icons/gi";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaFileSignature } from "react-icons/fa";
import img1 from '../Images/SportsLogo.png'
const LoginForm = () => {
  const [credentials, setCredentials] = useState({ userName: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.userName === credentials.userName && u.password === credentials.password);
    if (user) {
      alert("Login successful");
      navigate('/home'); 
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="logo-container">
              <img src={img1}  alt="Logo" className="logo" />
            </div>
            <h1>Hi Admin</h1>
            <div>
              <input type="text" name="userName" placeholder="UserName" value={credentials.userName} onChange={handleChange} required /><MdAdminPanelSettings />
            </div>
            <div className="input-box">
              <input type="password" name="password" placeholder="Key" value={credentials.password} onChange={handleChange}  required /><SiGnuprivacyguard />
            </div>
            <div className="button-container">
              <button type="submit" className="log-btn">Jump-In <GiJumpAcross /></button>
              <Link to="/RegisterPage">
                <button type="button" className="sign-btn">Sign-up <FaFileSignature /></button>
              </Link>
              <p className="forgot-password">"CHAMPION YOUR TEAM"</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;