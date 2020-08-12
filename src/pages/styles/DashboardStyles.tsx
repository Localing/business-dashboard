import styled from 'styled-components';
import Col from 'react-bootstrap/Col';

// Component styles
export const Sidebar = styled(Col)`
  background-color: #f8f9fa;
  height: 100vh;
  border-right: 2px #aaaaaa solid;
`;

export const Main = styled(Col)`
  padding: 0;
  margin-left: calc( 100% * (1 / 6) );
  width: calc( 100vw * (5/6));

  @media (max-width: 1200px) {
    width: 75vw;
    margin-left: 25vw;
  }

  @media (max-width: 720px) {
    margin-left: 0;
    width: 100vw;
  }
`;

export const ContentContainer = styled.div`

`;