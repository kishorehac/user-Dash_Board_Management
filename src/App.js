import React, { useState } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { Container, Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [reload, setReload] = useState(false); // To trigger re-fetching users
  const [selectedUser, setSelectedUser] = useState(null); // User selected for editing
  const [showForm, setShowForm] = useState(false); // Control form display

  // Handle editing a user
  const handleEdit = user => {
    setSelectedUser(user);
    setShowForm(true);
  };

  // Handle adding a new user
  const handleAdd = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  // Handle deleting a user
  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        alert('User deleted successfully');
        setReload(!reload); // Refresh the user list
      } catch (error) {
        alert('Error deleting user');
      }
    }
  };

  // Handle saving (adding/updating) a user
  const handleSave = () => {
    setShowForm(false);
    setReload(!reload); // Refresh the user list
  };

  // Handle cancel action
  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <Container className="mt-5">
      <h1>User Management Dashboard</h1>
      {!showForm && (
        <Button variant="success" onClick={handleAdd}>
          Add User
        </Button>
      )}
      {!showForm ? (
        <UserList onEdit={handleEdit} onDelete={handleDelete} reload={reload} />
      ) : (
        <UserForm
          selectedUser={selectedUser}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </Container>
  );
}

export default App;
