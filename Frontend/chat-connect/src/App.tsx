import React, { useState } from 'react';
import LoginComponent from './components/login-component';
import classes from './App.module.css';
import RegisterComponent from './components/register-component';

const  App = () => {
  const [openedLogin, setOpenedLogin] = useState(true);
  const [openedRegister, setOpenedRegister] = useState(false);

  const openLogin = () =>{
     setOpenedLogin(true);
     setOpenedRegister(false);
  }

  const openRegister = () =>{
    setOpenedLogin(false);
    setOpenedRegister(true);
  }
  
  return (
    <div className={classes.wrapper}>
       {
         openedLogin && <LoginComponent openRegister={openRegister}></LoginComponent>
       }
       {
        openedRegister && <RegisterComponent openLogin={openLogin}></RegisterComponent>
       }
    </div>
  );
}

export default App;
