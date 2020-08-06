import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../UserContext';

function Home() {
    const userData = useContext(UserContext);

    return (
        userData.authenticated ?
            <Redirect to="/dashboard" />
            :
            <Redirect to="/login" />
    )
}

export default Home
