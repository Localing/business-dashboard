import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useUserData } from '../UserContext';
import * as styles from './styles/NavigationBarStyles';

const NavigationBar = () => {
    const userData = useUserData();

    return (
        <styles.StyledNavbar expand="lg">
            <styles.StyledNavbarBrand href="#">Localing Business Dashboard  </styles.StyledNavbarBrand>
            <Navbar.Collapse className="justify-content-end">
                {userData.user ?
                    <Fragment>
                        <Navbar.Text>
                            Logged in as: {userData.user.attributes.email}
                        </Navbar.Text>
                        <styles.LogoutButton variant="outline-secondary" onClick={() => userData.logout()}>
                            Log Out
                        </styles.LogoutButton>
                    </Fragment>
                    :
                    <Link to="/login">
                        <Button variant="outline-secondary">
                            Log In
                        </Button>
                    </Link>
                }
            </Navbar.Collapse>
        </styles.StyledNavbar>
    )
}

export default NavigationBar
