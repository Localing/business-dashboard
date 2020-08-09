import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserData } from '../UserContext';
import * as styles from './styles/NavigationBarStyles';

const NavigationBar = () => {
    const userData = useUserData();

    return (
        <styles.StyledNavbar expand="lg">
            <Link to={"/dashboard"}>
            <styles.StyledNavbarBrand>Localing Business Dashboard</styles.StyledNavbarBrand>
            </Link>
            <Navbar.Collapse className="justify-content-end">
                {userData.user ?
                    <Fragment>
                        <Navbar.Text>
                            Logged in as: {userData.user.attributes.email}
                        </Navbar.Text>
                        <styles.LogoutButton variant="outline-secondary" onClick={() => userData.logout()}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
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
