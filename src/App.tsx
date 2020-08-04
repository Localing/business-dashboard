import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from './UserContext';
import Home from './components/Home';

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
