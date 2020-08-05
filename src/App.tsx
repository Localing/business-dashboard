import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from './UserContext';

// Pages
import Home from './components/Home';

// Initialize AWS Amplify
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
