import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faTags, faBars, faSignOutAlt, faBoxOpen, faPlusCircle, faStore } from '@fortawesome/free-solid-svg-icons';
import { useUserData } from '../../UserContext';
import SidebarLink from './SidebarLink';
import * as styles from './styles/SidebarStyles';

interface SidebarProps {
  activePage: string | undefined,
  toggleSidebar: Function,
  sidebarShow: boolean
}


const Sidebar = (props: SidebarProps) => {
    const userData = useUserData();

    return (
        <styles.Sidebar sidebarShow={props.sidebarShow}>
          <styles.SidebarScroll>
              <div id={'business-title'}>
                <styles.BusinessName><styles.SidebarToggleMobile><FontAwesomeIcon icon={faBars} onClick={() => props.toggleSidebar()} />&nbsp;&nbsp;</styles.SidebarToggleMobile>Business Name</styles.BusinessName>
              </div>
              <div id={'navigation'}>
                <styles.NavigationSection>
                  <SidebarLink
                    icon={faHome}
                    text={'Home'}
                    to={'/dashboard'}
                    active={(props.activePage === undefined)}
                  />
                </styles.NavigationSection>
                <styles.NavigationSection>
                  <SidebarLink
                    icon={faStore}
                    text={'Business Information'}
                    to={'/dashboard/business'}
                    active={(props.activePage === 'business')}
                  />
                </styles.NavigationSection>
                <styles.NavigationSection>
                  <SidebarLink
                    icon={faCalculator}
                    text={'Verify Order'}
                    to={'/dashboard/verify'}
                    active={(props.activePage === 'verify')}
                  />
                  <SidebarLink
                    icon={faTags}
                    text={'Active Orders'}
                    to={'/dashboard/orders'}
                    active={(props.activePage === 'orders')}
                  />
                </styles.NavigationSection>
                <styles.NavigationSection>
                  <SidebarLink
                    icon={faPlusCircle}
                    text={'Add Product'}
                    to={'/dashboard/add-product'}
                    active={(props.activePage === 'add-product')}
                  />
                  <SidebarLink
                    icon={faBoxOpen}
                    text={'View Products'}
                    to={'/dashboard/products'}
                    active={(props.activePage === 'products')}
                  />
                </styles.NavigationSection>
              </div>
            </styles.SidebarScroll>
            <styles.MobileLogout>
              <styles.NavigationSection onClick={ () => {userData.logout()}}>
                <styles.LogoutText><styles.LogoutIcon icon={faSignOutAlt} />&nbsp;&nbsp;Sign Out</styles.LogoutText>
              </styles.NavigationSection>
            </styles.MobileLogout>
        </styles.Sidebar>
    )
}

export default Sidebar;
