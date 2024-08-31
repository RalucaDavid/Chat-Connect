import React, { useState } from 'react';
import classes from './App.module.css';
import AuthenticationComponent from './components/authentication-component';

const  App = () => {
    const [logged, setLogged] = useState(false);

    return(
       <div className={classes.wrapper}>
           { !logged &&
            <AuthenticationComponent/>
           }
       </div>
    );
}

export default App;
