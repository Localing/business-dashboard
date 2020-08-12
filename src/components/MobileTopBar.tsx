import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from './styles/MobileTopBarStyles';

interface MobileTopBarProps {
  toggleSidebar: Function
}

const MobileTopBar = (props: MobileTopBarProps) => {
    return (
        <styles.TopBar>
          <styles.TopBarText>
            <styles.SidebarToggle><FontAwesomeIcon onClick={() => {props.toggleSidebar()} } icon={ faBars } /></styles.SidebarToggle>&nbsp;&nbsp;Business Name
          </styles.TopBarText>
        </styles.TopBar>
    )
}

export default MobileTopBar;
