import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from './UserContext';

// Pages
import Home from './components/Home';
import OTPInput from './components/OTP';
import Login from './components/Login';

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
          <Route exact path="/login" component={Login} />
          <Route path="/otp">
            <OTPInput numGroups={3} numInGroup={3} onComplete={(val: string) => { console.log(val) }} />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
