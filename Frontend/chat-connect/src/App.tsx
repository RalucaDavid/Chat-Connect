import React from 'react';
import LoginComponent from './components/login-component';
import classes from './App.module.css';

const  App = () => {
  return (
    <div className={classes.wrapper}>
       <LoginComponent> </LoginComponent>
    </div>
  );
}

export default App;
