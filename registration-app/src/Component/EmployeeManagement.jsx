import React, { useState, useEffect } from 'react';
import { useEmployeeContext } from '../contexts/EmployeeContext';
import '../Styles/EmployeeManagement.css';
import EditEmployeeForm from './EditEmployeeForm';

const EmployeeManagement = () => {
  const { employees, setEmployees, previousEmployees, setPreviousEmployees } = useEmployeeContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Load initial data from localStorage once on mount
  useEffect(() => {
    const storedEmployees = localStorage.getItem('currentEmployees');
    const storedPreviousEmployees = localStorage.getItem('previousEmployees');

    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      setEmployees([]); // In case nothing is stored
    }

    if (storedPreviousEmployees) {
      setPreviousEmployees(JSON.parse(storedPreviousEmployees));
    } else {
      setPreviousEmployees([]); // In case nothing is stored
    }
  }, [setEmployees, setPreviousEmployees]);

  // Save current employees to localStorage whenever `employees` changes
  useEffect(() => {
    if (employees.length > 0) {
      try {
        localStorage.setItem('currentEmployees', JSON.stringify(employees));
      } catch (error) {
        console.error('Error saving current employees to localStorage:', error);
      }
    }
  }, [employees]);

  // Save previous employees to localStorage whenever `previousEmployees` changes
  useEffect(() => {
    if (previousEmployees.length > 0) {
      try {
        localStorage.setItem('previousEmployees', JSON.stringify(previousEmployees));
      } catch (error) {
        console.error('Error saving previous employees to localStorage:', error);
      }
    }
  }, [previousEmployees]);

  const handleDelete = (id) => {
    const employeeToDelete = employees.find((employee) => employee.id === id);
    if (employeeToDelete) {
      const updatedEmployees = employees.filter((employee) => employee.id !== id);
      const updatedPreviousEmployees = [...previousEmployees, employeeToDelete];

      setEmployees(updatedEmployees);
      setPreviousEmployees(updatedPreviousEmployees);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleSave = (updatedEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    setEditingEmployee(null);
  };

  const handleCancel = () => {
    setEditingEmployee(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="employee-management">
      <h1>Employee Management</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {editingEmployee ? (
        <EditEmployeeForm
          employeeToEdit={editingEmployee}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="tables-container">
          <div className="table-container">
            <h2>Current Employees</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Position</th>
                  <th>Picture</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.id}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.position}</td>
                    <td>
                      <img src={employee.picture} alt={employee.name} />
                    </td>
                    <td className="actions">
                      <button className="edit-btn" onClick={() => handleEdit(employee)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(employee.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-container">
            <h2>Previous Employees</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Position</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {previousEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.id}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.position}</td>
                    <td>
                      <img src={employee.picture} alt={employee.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
