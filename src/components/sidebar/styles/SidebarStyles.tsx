import React from 'react';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SidebarProps {
  sidebarShow: boolean
}

// Component styles
export const Sidebar = styled(({sidebarShow, ...rest}) => <Col {...rest}/>)`
  background-color: #f8f9fa;
  height: 100vh;
  border-right: 2px #dddddd solid;
  position: fixed;

  width: calc( 100vw * (1/6));

  @media (max-width: 1200px) {
    width: 25vw;
  }

  @media (max-width: 720px) {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    left: ${ (props: SidebarProps) => (props.sidebarShow ? "0" : "-100vw")};
    transition: 0.4s ease;
  }
`;

export const SidebarToggleMobile = styled.span`
  display: none;
  cursor: pointer;

  @media (max-width: 720px) {
    display: inline-block;
  }
`;

export const BusinessName = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0;
  padding: 20px 20px;

  @media (max-width: 720px) {
    padding-top: 40px;
  }
`;

export const NavigationSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

export const SidebarScroll = styled.div`
  height: 90vh;
  @media (max-width: 720px) {
    overflow-y: scroll;
  }
`;

export const LogoutIcon = styled(FontAwesomeIcon)`
`;

export const LogoutText = styled.p`
  cursor: pointer;
  color: #666666;
  margin: 0;
  @media (max-width: 720px) {
    font-size: 1.2rem;
  }
`;

export const MobileLogout = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
`;

