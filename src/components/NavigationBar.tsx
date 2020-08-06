import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import UserContext from '../UserContext';

const NavigationBar = () => {
    const userData = useContext(UserContext);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">Localing Business</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                {userData.user ?
                    <Fragment>
                        <Navbar.Text>
                            Logged in as: {userData.user.attributes.email}
                        </Navbar.Text>
                        <Button variant="dark" onClick={() => userData.logout()}>
                            Log Out
                        </Button>
                    </Fragment>
                    :
                    <Link to="/login">
                        <Button variant="dark">
                            Log In
                        </Button>
                    </Link>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar
