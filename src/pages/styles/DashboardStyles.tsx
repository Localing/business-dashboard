import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

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
  
  min-height: 100vh;

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

export const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.p`
  margin: 0;
  padding: 20px;
  font-size: 2rem;
  text-align: center;
`;

export const SpinnerWrapper = styled.div`
  transform: scale(150%);
`;

export const LoadingSpinner = styled(Spinner)`
  
`;