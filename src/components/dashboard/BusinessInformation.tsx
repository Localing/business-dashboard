import React from 'react';
import * as styles from './styles/BusinessInformationStyles';
import * as dashboardStyles from './styles/DashboardStyles';

const BusinessInformation = () => {

    return (
      <dashboardStyles.DashboardContainer fluid>
      <dashboardStyles.SectionTitle>Business Information</dashboardStyles.SectionTitle>
      <dashboardStyles.ContentBlockWrapper>
        <dashboardStyles.InformationWrapper direction={'row'}>
          
        </dashboardStyles.InformationWrapper>
      </dashboardStyles.ContentBlockWrapper>
    </dashboardStyles.DashboardContainer>
    )
}

export default BusinessInformation;
