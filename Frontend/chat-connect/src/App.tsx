import React from 'react';
import LoginComponent from './components/login-component';
import classes from './App.module.css';
import RegisterComponent from './components/register-component';

const  App = () => {
  return (
    <div className={classes.wrapper}>
       <RegisterComponent></RegisterComponent>
       {/* <LoginComponent></LoginComponent> */}
    </div>
  );
}

export default App;
