import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import useParams hook to get the id parameter
import { env } from '../constant';
const UserUpdate = () => {
 
  const { id } = useParams(); // Get the id parameter from the URL
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    address: '',
    mobileNumber: '',
    gender: '',
  });

  useEffect(() => {
    // Fetch the existing user data from the backend API when the component mounts
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${env}/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      
    };
  
    fetchUser();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/users/${id}`, user);
      alert('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error updating user data. Please try again later.');
    }
  };

 
  return (

    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom marginTop={6}>
        Update User with ID: {id}
      </Typography>
     
      <form>
      
      <TextField
                name="firstName"
                label="First Name"
                fullWidth
                value={user.firstName}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                value={user.lastName}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="address"
                label="Address"
                fullWidth
                multiline
                rows={3}
                value={user.address}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="mobileNumber"
                label="Mobile Number"
                fullWidth
                value={user.mobileNumber}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="gender"
                label="Gender"
                fullWidth
                value={user.gender}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
        <Link to="/list"><Button variant="contained" color="primary" onClick={handleUpdate}>
          Update User
        </Button></Link>
        
      </form>
   </Container>
  
  );
};

export default UserUpdate;
