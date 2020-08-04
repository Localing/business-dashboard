import React, { useContext } from 'react';
import UserContext from '../UserContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function Home() {
    const userData = useContext(UserContext);

    return (
        <div>
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
    )
}
