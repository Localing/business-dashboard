import React from 'react';
import { Link } from 'react-router-dom';
import { faHome, faCalculator, faTags } from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../../UserContext';
import SidebarLink from './SidebarLink';
import * as styles from './styles/SidebarStyles';

interface SidebarProps {
  activePage: string | undefined
}

const Sidebar = (props: SidebarProps) => {
    const userData = useUserData();

    return (
        <styles.Sidebar md={2}>
            <div id={'business-title'}>
              <styles.BusinessName>Business Name</styles.BusinessName>
            </div>
            <div id={'navigation'}>
              <styles.NavigationSection>
                <SidebarLink
                  icon={faHome}
                  text={'Home'}
                  to={'/dashboard'}
                  active={(props.activePage === undefined) ? true : false }
                />
              </styles.NavigationSection>
              <styles.NavigationSection>
                <SidebarLink
                  icon={faCalculator}
                  text={'Verify Order'}
                  to={'/dashboard/verify'}
                  active={(props.activePage === 'verify') ? true : false }
                />
                <SidebarLink
                  icon={faTags}
                  text={'Active Orders'}
                  to={'/dashboard/orders'}
                  active={(props.activePage === 'orders') ? true : false }
                />
              </styles.NavigationSection>
            </div>
        </styles.Sidebar>
    )
}

export default Sidebar;
