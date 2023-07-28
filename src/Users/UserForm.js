import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Container, Grid, TextField, TextareaAutosize, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate, Route, Link, Routes } from 'react-router-dom';
import UserList from './UserList';
import UserUpdate from './UserUpdate';
import { env } from '../constant';
// import dotenv from 'dotenv';
// dotenv.config();


const AppRouter = () => {
  const nav = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your Spring Boot backend API.
      await axios.post(`${env}/users`, data);
      console.log('Form submitted successfully!');

      reset();
      nav('/list');
      //history.pushState('list');
    } catch (error) {
      console.error('Error submitting the form. Please try again later.');
    }
  };

  

  return (
    <Routes>
      <Route path="/" element={<AppForm handleSubmit={handleSubmit} control={control} errors={errors} onSubmit={onSubmit} reset={reset} />} />
      <Route path="/list" element={<UserList />} />
      <Route path="/update/:id" element={<UserUpdate />} />
    </Routes>
  );
};

const AppForm = ({ handleSubmit, control, errors, onSubmit, reset }) => {
    
    const alphabeticRegex = /^[A-Za-z]+$/;
  const digitRegex = /^[0-9]*$/;

    return (
    
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" gutterBottom marginTop={6}>
            Application Form Example
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} marginTop={10}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'First name is required.',
                    maxLength: { value: 20, message: 'First name must be at most 20 characters.' },
                    pattern: { value: alphabeticRegex, message: 'First name should only contain alphabets.' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      fullWidth
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Last name is required.',
                    maxLength: { value: 20, message: 'Last name must be at most 20 characters.' },
                    pattern: { value: alphabeticRegex, message: 'Last name should only contain alphabets.' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Address is required.' }}
                  render={({ field }) => (
                    <TextareaAutosize
                      {...field}
                      minRows={3}
                      placeholder="Address"
                      style={{ width: '100%', resize: 'none' }}
                      error={Boolean(errors.address)}
                    />
                  )}
                />
                {errors.address && <p style={{ color: 'red' }}>{errors.address.message}</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="mobileNumber"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Mobile number is required.',
                    maxLength: { value: 10, message: 'Mobile Number should contain only 10 digits.' },
                    pattern: {
                      value: digitRegex,
                      message: 'Mobile Number should contain only digits (0-9).',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Mobile Number"
                      fullWidth
                      error={Boolean(errors.mobileNumber)}
                      helperText={errors.mobileNumber?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
    
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: 'Gender is required.' }}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                )}
              />
            </FormControl>
            {errors.gender && <p style={{ color: 'red' }}>{errors.gender.message}</p>}
    
            <Box mt={2} display="flex" justifyContent="flex-end">
            <Link to="/list"><Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                Submit
                
              </Button></Link>
              <Button type="button" variant="contained" color="secondary" onClick={() => reset()}>
                Reset
              </Button>
            </Box>
          </form>
          
    
        </Container>
      );
    };
    export default AppRouter;