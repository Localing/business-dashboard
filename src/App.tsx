import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

function App() {
  return (
    <div className="App">
      <Container className="mt-5">
      <Jumbotron className="text-center">
        <h1>Localing for Businesses</h1>
        <p>
          <Button variant="primary">Log In to Dashboard</Button>
        </p>
        <p>
          <Button variant="secondary">Verify an Order</Button>
        </p>
      </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
