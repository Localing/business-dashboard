import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUserData } from '../UserContext';

function Home() {
    const userData = useUserData();

    return (
        userData.authenticated ?
            <Redirect to="/dashboard" />
            :
            <Redirect to="/login" />
    )
}

export default Home
