import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from './UserContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import OTPInput from './components/OTP';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';

// Initialize AWS Amplify
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {

  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route path="/otp">
            <OTPInput numGroups={3} numInGroup={3} onComplete={(val: string) => { console.log(val) }} />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
