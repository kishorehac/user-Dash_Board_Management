import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Pagination } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const UserList = ({ onEdit, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      alert('Error fetching users');
    }
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="mt-4">
      <h2>User List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => {
            const nameParts = user.name.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');

            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => onEdit(user)}>Edit</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => onDelete(user.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default UserList;
