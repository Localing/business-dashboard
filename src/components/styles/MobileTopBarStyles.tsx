import styled from 'styled-components';

// Component styles
export const TopBar = styled.div`
  background-color: #283142; 
  width: 100%;
  padding: 20px 30px;
  display: none;

  @media (max-width: 720px) {
    display: block;
  }
`;

export const TopBarText = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0;
  color: #fff;
`;

export const SidebarToggle = styled.span`
  cursor: pointer;
  display: inline-block;
  color: #48576c;
`;