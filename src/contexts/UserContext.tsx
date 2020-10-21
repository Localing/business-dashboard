import React, { useState, useEffect, useContext } from 'react';
import { Auth, Hub } from 'aws-amplify';

import API from './../services/API';

interface UserContext {
  loading: boolean,
  authenticated: boolean,
  user: User | null,
  login: (user: string, password: string) => void,
  logout: () => void,
  loginError: CognitoError | null,
  businessData: BusinessData | null,
  getBusinessData: () => void
}

interface CognitoError {
  code: number,
  name: string,
  message: string
}

interface User {
  attributes: {
    email: string,
    sub: string
  }
}

interface BusinessData {
  businessId: string,
  email: string,
  active: boolean,
  name: string,
  description: string,
  categories: string[],
  area: string,
  address: string,
  website: string,
  phone: string
}

const UserContext = React.createContext<UserContext>({} as UserContext);

export const useUserData = () => useContext(UserContext);

export const UserConsumer = UserContext.Consumer;

export const UserProvider: React.FC = ({ children }) => {
  
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [loginError, setLoginError] = useState<CognitoError | null>(null);
  
  const login = async (email: string, password: string) => {
    requestLogin();
    try {
      const user = await Auth.signIn(email.toLowerCase(), password);
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
  
  const receiveLogin = (user: User) => {
    setUser(user);
    setAuthenticated(true);
    setLoading(false);
    setLoginError(null);
    getBusinessData(user);
  }
  
  const receiveLoginError = (error: CognitoError) => {
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
  
  const getBusinessData = async (u?: User) => {
    try {
      if (u?.attributes.sub) {
        let resp = await API.get(`/business/${u?.attributes.sub}`);
        let data: BusinessData|null = resp.data;
        setBusinessData(data);
      } else {
        let resp = await API.get(`/business/${user?.attributes.sub}`);
        let data: BusinessData|null = resp.data;
        setBusinessData(data);
      }
    } catch (err) {
      console.log(err);
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
      logout,
      businessData,
      getBusinessData
    }}>
    {children}
    </UserContext.Provider>
    )
  }
  
  export default UserContext;