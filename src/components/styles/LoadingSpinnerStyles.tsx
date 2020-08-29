import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  padding: 100px;
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