import React, { useState } from 'react';
import classes from './App.module.css';
import AuthenticationComponent from './components/authentication-component';
import DashboardComponent from './components/dashboard-component';

const App = () => {
    const [logged, setLogged] = useState(false);

    return (
        <div className={classes.wrapper}>
            {!logged
                ? <AuthenticationComponent onLogin={() => setLogged(true)}/>
                : <DashboardComponent />
            }
        </div>
    );
}

export default App;
