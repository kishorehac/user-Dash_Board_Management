import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ selectedUser, onSave, onCancel }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    company: { name: '' },
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      setUser({
        name: '',
        email: '',
        company: { name: '' },
      });
    }
  }, [selectedUser]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'firstName' || name === 'lastName') {
      const nameParts = user.name.split(' ');
      if (name === 'firstName') {
        const updatedName = `${value} ${nameParts.slice(1).join(' ')}`;
        setUser({ ...user, name: updatedName });
      } else {
        const updatedName = `${nameParts[0] || ''} ${value}`;
        setUser({ ...user, name: updatedName.trim() });
      }
    } else if (name === 'company') {
      setUser({ ...user, company: { name: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = user.name.trim() ? '' : 'Name is required.';
    tempErrors.email = user.email.trim() ? '' : 'Email is required.';
    tempErrors.company = user.company.name.trim() ? '' : 'Department is required.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (selectedUser) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
        alert('User updated successfully');
      } else {
        await axios.post('https://jsonplaceholder.typicode.com/users', user);
        alert('User added successfully');
      }
      onSave();
    } catch (error) {
      alert('Error saving user');
    }
  };

  return (
    <div className="mt-4">
      <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text"
            name="firstName"
            value={user.name.split(' ')[0] || ''}
            onChange={handleChange}
            isInvalid={!!errors.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text"
            name="lastName"
            value={user.name.split(' ').slice(1).join(' ') || ''}
            onChange={handleChange}
            isInvalid={!!errors.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleChange}
            isInvalid={!!errors.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control 
            type="text"
            name="company"
            value={user.company.name || ''}
            onChange={handleChange}
            isInvalid={!!errors.company}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.company}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          {selectedUser ? 'Update User' : 'Add User'}
        </Button>{' '}
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </Form>
    </div>
  );
};

export default UserForm;
