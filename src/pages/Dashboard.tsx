import React, { useState, useEffect, FunctionComponent } from 'react';
import { Switch, Route, useLocation } from "react-router-dom";
import { useUserData } from '../contexts/UserContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// Fixed components
import NavigationBar from '../components/NavigationBar';
import Sidebar from '../components/sidebar/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import LoadingSpinner from '../components/LoadingSpinner';

// Route components
import Orders from '../components/dashboard/Orders';
import Home from '../components/dashboard/Home';
import VerifyOrder from '../components/dashboard/VerifyOrder';
import Order from '../components/dashboard/Order';
import Product from '../components/dashboard/Product';
import Products from '../components/dashboard/Products';
import AddProduct from '../components/dashboard/AddProduct';
import BusinessInformation from '../components/dashboard/BusinessInformation';



import * as styles from './styles/DashboardStyles';

const Dashboard:FunctionComponent<any> = () => {
  const userData = useUserData();
  const location = useLocation();
  
  const [sidebarDisplay, setSidebarDisplay] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarDisplay(!sidebarDisplay);
  }

  useEffect(() => {
    // Hide sidebar on page change
    setSidebarDisplay(false);

  }, [location.pathname]);

  return (
    <>
      { (userData.businessData) ? 
        <Container fluid>
          <Row>
            <Sidebar toggleSidebar={toggleSidebar} sidebarShow={sidebarDisplay} activePage={location.pathname.split('/')[2]}></Sidebar>
            <MobileTopBar toggleSidebar={toggleSidebar} />
            <styles.Main>
              <NavigationBar />
              <styles.ContentContainer>
                <Switch>
                  <Route exact path={'/dashboard'} component={Home} />
                  <Route exact path={'/dashboard/business-information'} component={BusinessInformation} />
                  <Route exact path={'/dashboard/verify'} component={VerifyOrder} />
                  <Route exact path={'/dashboard/orders'} component={Orders} />
                  <Route exact path={'/dashboard/order/:order'} component={Order} />
                  <Route exact path={'/dashboard/products'} component={Products} />
                  <Route exact path={'/dashboard/add-product'} component={AddProduct} />
                  <Route exact path={'/dashboard/product/:product'} component={Product} />
                </Switch>
              </styles.ContentContainer>
            </styles.Main>
          </Row>
        </Container> :
        <styles.WholePageWrapper><LoadingSpinner text={'Localing Business Dashboard'} /></styles.WholePageWrapper>
      }
    </>
  )
}

export default Dashboard;
