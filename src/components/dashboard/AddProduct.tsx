import React from 'react';
import * as styles from './styles/AddProductStyles';
import * as dashboardStyles from './styles/DashboardStyles';

const AddProduct = () => {

    return (
      <dashboardStyles.DashboardContainer fluid>
      <dashboardStyles.SectionTitle>Add Product</dashboardStyles.SectionTitle>
      <dashboardStyles.ContentBlockWrapper>
        <dashboardStyles.InformationWrapper direction={'row'}>
          
        </dashboardStyles.InformationWrapper>
      </dashboardStyles.ContentBlockWrapper>
    </dashboardStyles.DashboardContainer>
    )
}

export default AddProduct;
