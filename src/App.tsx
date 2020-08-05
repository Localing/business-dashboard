import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import OTPInput from './components/OTP';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/otp">
          <OTPInput numGroups={3} numInGroup={3} onComplete={(val:string) => {console.log(val)}} />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
