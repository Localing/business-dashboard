import React from 'react';
import * as styles from './styles/HomeStyles';
import * as dashboardStyles from './styles/DashboardStyles';
import PageTitle from './../PageTitle';

const Home = () => {

    return (
      <>
        <PageTitle title="Dashboard" />
        <dashboardStyles.DashboardContainer fluid>
          <styles.Title>Home</styles.Title>
        </dashboardStyles.DashboardContainer>
      </>
    )
}

export default Home;
