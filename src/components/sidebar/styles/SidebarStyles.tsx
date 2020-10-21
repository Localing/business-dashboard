<<<<<<< HEAD
import React from 'react';
=======
>>>>>>> origin/master
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

<<<<<<< HEAD
interface SidebarProps {
  sidebarShow: boolean
}

// Component styles
export const Sidebar = styled(({sidebarShow, ...rest}) => <Col {...rest}/>)`
  background-color: #283142;
  height: 100vh;
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
  color: #48576c;

  @media (max-width: 720px) {
    display: inline-block;
  }
=======
// Component styles
export const Sidebar = styled(Col)`
  background-color: #f8f9fa;
  height: 100vh;
  border-right: 2px #dddddd solid;
>>>>>>> origin/master
`;

export const BusinessName = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0;
<<<<<<< HEAD
  padding: 40px 20px 20px 20px;
  color: #fff;

  @media (max-width: 720px) {
    padding-top: 40px;
  }
=======
  padding: 20px 20px;
>>>>>>> origin/master
`;

export const NavigationSection = styled.div`
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
  padding: 10px 0;
  width: 100%;
`;

export const SidebarScroll = styled.div`
  height: 90vh;
  @media (max-width: 720px) {
    overflow-y: scroll;
  }
`;

export const LogoutIcon = styled(FontAwesomeIcon)`
  transition: color 0.5s ease;
`;

export const LogoutText = styled.p`
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  
  background-image: linear-gradient(to left, #007bff 50%, rgba(0,0,0,0) 50%);
  background-size: 200% 100%;
  transition: background-position 0.5s ease;

  border-radius: 3px;
  padding: 10px 20px;
  margin: 2px 0;

  & > ${LogoutIcon} {
    color: #48576c; 
  }
  
  &:hover {
    background-position: -100% 0%;

    & > ${LogoutIcon} {
      color: #fff !important;
    }
  }

  @media (max-width: 720px) {
    font-size: 1.2rem;
  }
`;

export const MobileLogout = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  width: 100%;
=======
  padding: 10px 20px;
>>>>>>> origin/master
`;

