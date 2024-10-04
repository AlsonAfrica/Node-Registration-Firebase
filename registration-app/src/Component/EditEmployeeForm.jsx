// src/Component/EditEmployeeForm.jsx
import React, { useState, useEffect } from 'react';
import { useEmployeeContext } from '../contexts/EmployeeContext';
import '../Styles/EmployeeForm.css'

const EditEmployeeForm = ({ employeeToEdit, onSave, onCancel }) => {
  const { employees, setEmployees } = useEmployeeContext();
  const [name, setName] = useState(employeeToEdit.name);
  const [id, setId] = useState(employeeToEdit.id);
  const [email, setEmail] = useState(employeeToEdit.email);
  const [phone, setPhone] = useState(employeeToEdit.phone);
  const [position, setPosition] = useState(employeeToEdit.position);
  const [picture, setPicture] = useState(employeeToEdit.picture);

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

    const updatedEmployee = { name, id, email, phone, position, picture };

    onSave(updatedEmployee);
  };

  useEffect(() => {
    setName(employeeToEdit.name);
    setId(employeeToEdit.id);
    setEmail(employeeToEdit.email);
    setPhone(employeeToEdit.phone);
    setPosition(employeeToEdit.position);
    setPicture(employeeToEdit.picture);
  }, [employeeToEdit]);

  return (
 
      <form className="employee-form" onSubmit={handleSubmit}>
        <h2 className="Edit-Employee">EDIT EMPLOYEE</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="ID" value={id} readOnly />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} required />
        <input type="file" className='Upload-img' onChange={handleFileChange} />
        <button type="submit" className="Save-btn">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
     </form>
   
   
  );
};

export default EditEmployeeForm;



