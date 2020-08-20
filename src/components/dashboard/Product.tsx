import React from 'react';
import * as styles from './styles/ProductStyles';
import * as dashboardStyles from './styles/DashboardStyles';

const Product = () => {

    return (
      <dashboardStyles.DashboardContainer fluid>
      <dashboardStyles.SectionTitle>Product <dashboardStyles.SectionTitleSmall>Product Name</dashboardStyles.SectionTitleSmall></dashboardStyles.SectionTitle>
      <dashboardStyles.ContentBlockWrapper>
        <dashboardStyles.InformationWrapper direction={'row'}>
          
        </dashboardStyles.InformationWrapper>
      </dashboardStyles.ContentBlockWrapper>
    </dashboardStyles.DashboardContainer>
    )
}

export default Product;
