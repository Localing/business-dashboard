import React from 'react';
import * as styles from './styles/ActiveOrdersStyles';
import * as dashboardStyles from './styles/DashboardStyles';

const ActiveOrders = () => {

    return (
      <dashboardStyles.DashboardContainer fluid>
        <styles.Title>Active Orders</styles.Title>
      </dashboardStyles.DashboardContainer>
    )
}

export default ActiveOrders;
