import React from 'react';
import { faHome, faCalculator } from '@fortawesome/free-solid-svg-icons';
import * as styles from './styles/SidebarLinkStyles';

interface SidebarProps {
  active: boolean,
  text: string,
  icon: any,
  to: string
}

const SidebarLink = ( { active, text, icon, to} : SidebarProps) => {
    return (
      <styles.NavigationLink to={to} active={active}>
        <styles.NavigationIcon icon={icon} />
        <styles.NavigationText>{text}</styles.NavigationText>
      </styles.NavigationLink>
    )
}

export default SidebarLink;
