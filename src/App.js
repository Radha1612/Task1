// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserForm from './Users/UserForm';
// require('dotenv').config();

const App = () => {
  return (
    <Router>
      <UserForm />
    </Router>
  );
};

export default App;
