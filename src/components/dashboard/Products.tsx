import React from 'react';
import * as styles from './styles/ProductsStyles';
import * as dashboardStyles from './styles/DashboardStyles';

const Products = () => {

    return (
      <dashboardStyles.DashboardContainer fluid>
      <dashboardStyles.SectionTitle>Products</dashboardStyles.SectionTitle>
      <dashboardStyles.ContentBlockWrapper>
        <dashboardStyles.InformationWrapper direction={'row'}>
          
        </dashboardStyles.InformationWrapper>
      </dashboardStyles.ContentBlockWrapper>
    </dashboardStyles.DashboardContainer>
    )
}

export default Products;
