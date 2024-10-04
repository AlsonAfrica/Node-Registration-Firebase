// src/Component/EmployeeForm.jsx
import React, { useState } from 'react';
import { useEmployeeContext } from '../contexts/EmployeeContext';
import '../Styles/EmployeeForm.css';
import { IoMdPersonAdd } from "react-icons/io";

const FormEmployee = () => {
  const { setEmployees } = useEmployeeContext();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [picture, setPicture] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate ID and phone number
    if (!/^\d{13}$/.test(id)) {
      alert('ID must be exactly 13 digits.');
      return;
    }

    if (!/^0\d{9}$/.test(phone)) {
      alert('Phone number must be exactly 10 digits starting with 0.');
      return;
    }

    setIsLoading(true); // Start loading

    const newEmployee = {
      name,
      id,
      email,
      phone,
      position,
      picture: picture || 'https://via.placeholder.com/150'
    };

    // Simulate a network request
    setTimeout(() => {
      setEmployees(prevEmployees => {
        const updatedEmployees = [...prevEmployees, newEmployee];

        // Save to local storage
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        
        // Log employee data
        console.log('Employee added:', newEmployee);
        return updatedEmployees;
      });

      // Clear form fields
      setName('');
      setId('');
      setEmail('');
      setPhone('');
      setPosition('');
      setPicture('');

      setIsLoading(false); // Stop loading
      setIsSuccess(true);  // Show success message

      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 2000); // Simulate a delay (e.g., 2 seconds)
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>ADD NEW EMPLOYEE</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} required />
      <input className="Image-input" type="file" onChange={handleFileChange} required />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Employee'}
      </button>

      {isSuccess && <p className="success-message">Employee added successfully!</p>}
    </form>
  );
};

export default FormEmployee;
