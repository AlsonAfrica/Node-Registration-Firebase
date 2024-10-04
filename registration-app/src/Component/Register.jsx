import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Register.css';
import img1 from '../Images/SportsLogo.png'

const Register = () => {
  const [user, setUser] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful");

    setUser({
      userName: '',
      password: '',
      confirmPassword: '',
      email: ''
    });

    navigate('/'); // Redirect to login page
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="logo-container">
              <img src={img1} alt="Logo" className="logo" />
            </div>
            <h1>Create<br />Account</h1>
            <div>
              <input type="text" name="userName" placeholder="UserName" value={user.userName} onChange={handleChange} required />
            </div>
            <div className="input-box">
              <input type="password" name="password" placeholder="New Key" value={user.password} onChange={handleChange} required />
            </div>
            <div className="input-box">
              <input type="password" name="confirmPassword" placeholder="Confirm Key" value={user.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="input-box">
              <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
            </div>
            <div className="button-container">
              <button type="submit" className="sub-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;