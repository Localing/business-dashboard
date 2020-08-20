import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { faSignOutAlt, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserData } from '../UserContext';
import * as styles from './styles/NavigationBarStyles';

const NavigationBar = () => {
    const userData = useUserData();
	const location = useLocation();
	
	const formatBreadcrumb = (str: string): string => {
		// Convert first character to uppercase
		let str_return = str.charAt(0).toUpperCase() + str.slice(1);

		// Replace dashes with spaces
		str_return = str_return.replaceAll('-',' ');
		
		return str_return;
	}

    return (
        <styles.StyledNavbar expand="lg">
			<styles.Breadcrumbs>
				<styles.BreadcrumbInactive>Localing</styles.BreadcrumbInactive>
				{ location.pathname.split('/').filter(el => el!=null).map((crumb: string, index) => 
					<>	
						{(index + 1) !== location.pathname.split('/').filter(el => el!=null).length ? 
						<>
							<styles.BreadcrumbLink to={location.pathname.split('/').slice(0,index+1).join('/')}>
								<styles.BreadcrumbInactive>{formatBreadcrumb(crumb)}</styles.BreadcrumbInactive>
							</styles.BreadcrumbLink>
							<styles.BreadcrumbDivider icon={faAngleRight}/>
						</> :
						<styles.BreadcrumbLink to={location.pathname.split('/').slice(0,index+1).join('/')}>
							<styles.BreadcrumbActive>{formatBreadcrumb(crumb)}</styles.BreadcrumbActive>
						</styles.BreadcrumbLink>
						}
					</>
				)    
			}</styles.Breadcrumbs>
            <Navbar.Collapse className="justify-content-end">
                {userData.user ?
                    <Fragment>
                        <styles.Account>
                            Account: <styles.AccountName>{userData.user.attributes.email}</styles.AccountName>
                        </styles.Account>
                        <styles.LogoutButton onClick={() => userData.logout()}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
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
