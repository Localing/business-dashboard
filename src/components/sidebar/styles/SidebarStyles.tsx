import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component styles
export const Sidebar = styled(Col)`
  background-color: #f8f9fa;
  height: 100vh;
  border-right: 2px #dddddd solid;
`;

export const BusinessName = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0;
  padding: 20px 20px;
`;

export const NavigationSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

