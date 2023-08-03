// UserList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { env } from '../constant';
//import XLSX from 'xlsx';
import {TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
// import { write as exportToExcel } from 'xlsx';
// import XLSX from 'xlsx-style';
import * as ExcelJS from 'exceljs';

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

const handleDownloadExcel = async () => {
  try {
    // Function to convert the users data to Excel format
    const data = users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      mobileNumber: user.mobileNumber,
      gender: user.gender,
    }));

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a worksheet to the workbook
    const worksheet = workbook.addWorksheet('Users');

    // Define the columns and their headers
    worksheet.columns = [
      { header: 'First Name', key: 'firstName', width: 15 },
      { header: 'Last Name', key: 'lastName', width: 15 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'Mobile Number', key: 'mobileNumber', width: 15 },
      { header: 'Gender', key: 'gender', width: 10 },
    ];

    // Populate the data rows
    data.forEach((user) => {
      worksheet.addRow(user);
    });

    // Generate the buffer containing the Excel data
    const excelBuffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the Excel buffer
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'users_data.xlsx';
    link.click();
  } catch (error) {
    console.error('Error exporting to Excel:', error);
  }
};
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  

  try {
    const response = await axios.post(`${env}/users/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Refresh the user list after successful file upload
    setUsers(response.data);
  } catch (error) {
    console.error('Error uploading the file:', error);
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
    <input type="file" onChange={handleFileUpload} />
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
      <Button variant="contained" color="primary" onClick={handleDownloadExcel}>
        Download Excel
      </Button>

  </div>
  );
};
export default UserList;
