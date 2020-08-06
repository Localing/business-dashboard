import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import NavigationBar from './NavigationBar';

export default function Home() {
    return (
        <div>
            <Container>
                <NavigationBar />
            </Container>
        </div>
    )
}
