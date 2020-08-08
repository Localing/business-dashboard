import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

interface InformationWrapperProps {
  direction: string
}

// Component styles
export const DashboardContainer = styled(Container)`
  padding: 50px;
`;

export const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  display: block;
  padding: 15px 0px;
  border-bottom: 2px #aaaaaa solid;
`;

export const ContentBlockWrapper = styled.div`
  margin: 30px 0;
`;

export const SubmitButton = styled(Button)`
  font-weight: bold;
`;

export const Information = styled.p`
  
`;

export const InformationSubBox = styled.div`
  border: 1px #cccccc solid;
  padding: 20px;
`;

export const InformationSubHeading = styled.p`
  font-weight: bold;
  margin: 10px 0;
  font-size: 1.3rem;
  color: #007bff;
`;

export const InformationWrapper = styled.div<InformationWrapperProps>`
  display: flex;
  flex-direction: ${ ({ direction }) => (direction === "row" ? "row" : (direction === "column" ? "column" : "default")) };
  & > div {
    flex-grow: 1;
    flex-basis: 0;
    margin: ${ ({ direction }) => (direction === "row" ? "0 15px" : (direction === "column" ? "15px 0" : "default")) };
    &:first-child {
      ${ ({ direction }) => (direction === "row" ? "margin-left: 0;" : (direction === "column" ? "margin-top: 0;" : "")) }
    }
    &:last-child {
      ${ ({ direction }) => (direction === "row" ? "margin-right: 0;" : (direction === "column" ? "margin-bottom: 0;" : "")) }
    }
  }
`;