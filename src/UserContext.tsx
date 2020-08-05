import React, { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

type UserContextType = {
    loading: boolean,
    authenticated: boolean,
    user: object | null,
    login: (user: string, password: string) => void,
    logout: () => void,
    loginError: object | null
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserConsumer = UserContext.Consumer;

export const UserProvider: React.FC = ({ children }) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<object | null>(null);
    const [loginError, setLoginError] = useState<object | null>(null);

    const login = async (email: string, password: string) => {
        requestLogin();
        try {
            const user = await Auth.signIn(email, password);
            receiveLogin(user);
        } catch (err) {
            receiveLoginError(err);
        }
    }

    const logout = async () => {
        try {
            await Auth.signOut();
            receiveLogout();
        } catch (err) {
            console.log(err);
        }
    }

    const requestLogin = () => {
        setUser(null);
        setAuthenticated(false);
        setLoading(true);
        setLoginError(null);
    }

    const receiveLogin = (user: object) => {
        setUser(user);
        setAuthenticated(true);
        setLoading(false);
        setLoginError(null);
    }

    const receiveLoginError = (error: object) => {
        setLoginError(error);
        setUser(null);
        setAuthenticated(false);
        setLoading(false);
    }

    const receiveLogout = () => {
        setUser(null);
        setAuthenticated(false);
        setLoading(false);
    }

    const getCurrentUser = async () => {
        requestLogin();
        try {
            const user = await Auth.currentAuthenticatedUser();
            receiveLogin(user);
        } catch (error) {
            receiveLogout();
        }
    }

    useEffect(() => {
        // check for a logged in user
        getCurrentUser();

        // listen for amplify auth events
        Hub.listen('auth', async (data) => {
            switch (data.payload.event) {
                case 'signIn':
                    Auth.currentAuthenticatedUser({
                        bypassCache: true
                    }).then(user => receiveLogin(user))
                        .catch(err => console.log(err));
                    break;
                case 'signIn_failure':
                    receiveLoginError(data.payload.data);
                    break;
                case 'signOut':
                    receiveLogout();
                    break;
                default:
                    break;
            }
        })

    }, []);

    return (
        <UserContext.Provider
            value={{
                loading,
                authenticated,
                user,
                loginError,
                login,
                logout
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;