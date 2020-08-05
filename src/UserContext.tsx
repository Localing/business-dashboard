import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const UserContext = React.createContext({
    loading: true,
    authenticated: false,
    user: null
});

export const UserConsumer = UserContext.Consumer;

export const UserProvider: React.FC = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setUser(user);
                setAuthenticated(true);
                setLoading(false);
            } catch (error) {
                // no user is logged in
                setAuthenticated(false);
                setLoading(false);
            }
        }
        getCurrentUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                loading,
                authenticated,
                user
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;