import React from 'react';
import { Switch, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NavigationBar from '../components/NavigationBar';
import Sidebar from '../components/sidebar/Sidebar';
import ActiveOrders from '../components/dashboard/ActiveOrders';
import Home from '../components/dashboard/Home';
import VerifyOrder from '../components/dashboard/VerifyOrder';

import * as styles from './styles/DashboardStyles';

const Dashboard = (props: any) => {
    return (
        <Container fluid>
            <Row>
                <Sidebar activePage={props.location.pathname.split('/')[2]}></Sidebar>
                <styles.Main md={10}>
                    <NavigationBar />
                    <styles.ContentContainer>
                        <Switch>
                            <Route exact path={'/dashboard'} component={Home} />
                            <Route exact path={'/dashboard/verify'} component={VerifyOrder} />
                            <Route exact path={'/dashboard/orders'} component={ActiveOrders} />
                        </Switch>
                    </styles.ContentContainer>
                </styles.Main>
            </Row>
        </Container>
    )
}

export default Dashboard;
