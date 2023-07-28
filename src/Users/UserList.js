// UserList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { env } from '../constant';
import {TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const UserList = () => {
 
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Fetch data from the backend API to populate the table
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUsers();
  }, []);

  // Function to handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${env}/users/${id}`);
      // Refresh the user list after deletion
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  const [searchValue, setSearchValue] = useState('');
const [searchResults, setSearchResults] = useState([]);

const handleSearch = async () => {
  try {
    const response = await axios.get(`${env}/users/search?query=${searchValue}`);
    setSearchResults(response.data);
  } catch (error) {
    console.error('Error searching users:', error);
  }
};

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom marginTop={6}>
      Search Users
    </Typography>
    <TextField
      label="Search by First Name or Mobile Number"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
    
    <Button variant="contained" color="primary" onClick={handleSearch}>
      Search
    </Button>
    <div>
      {searchResults.length > 0 ? (
         <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Gender</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
          {searchResults.map((user) => (
             <TableRow key={user.id}>
             <TableCell>{user.firstName}</TableCell>
             <TableCell>{user.lastName}</TableCell>
             <TableCell>{user.address}</TableCell>
             <TableCell>{user.mobileNumber}</TableCell>
             <TableCell>{user.gender}</TableCell>
             </TableRow>
               
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      
      ) : (
        <p>No results found.</p>
      )}
    </div>
  
      <Typography variant="h4" align="center" gutterBottom marginTop={6}>
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                <Link to={`/update/${user.id}`}>Update</Link> |{' '}
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

  </div>
  );
};
export default UserList;
