import React from 'react';
import * as styles from './styles/SidebarLinkStyles';

interface SidebarProps {
  active: boolean,
  text: string,
  icon: any,
  to: string
}

const SidebarLink = ( { active, text, icon, to} : SidebarProps) => {
    return (
      <styles.NavigationLink to={to} linkActive={active}>
        <styles.NavigationIcon icon={icon} />
        <styles.NavigationText>{text}</styles.NavigationText>
      </styles.NavigationLink>
    )
}

export default SidebarLink;
