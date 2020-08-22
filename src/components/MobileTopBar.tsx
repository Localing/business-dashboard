import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from './styles/MobileTopBarStyles';
import { useUserData } from '../contexts/UserContext';

interface MobileTopBarProps {
  toggleSidebar: Function
}

const MobileTopBar = (props: MobileTopBarProps) => {
  const userData = useUserData();
  return (
    <styles.TopBar>
      <styles.TopBarText>
        <styles.SidebarToggle>
          <FontAwesomeIcon onClick={() => {props.toggleSidebar()} } icon={ faBars } />
        </styles.SidebarToggle>&nbsp;&nbsp;{userData.businessData?.name}
      </styles.TopBarText>
    </styles.TopBar>
    )
  }
  
  export default MobileTopBar;
  