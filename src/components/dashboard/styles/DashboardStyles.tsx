import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

interface InformationWrapperProps {
  direction: string
}

// Component styles
export const DashboardContainer = styled(Container)`
<<<<<<< HEAD
  padding: 20px 50px;

  @media (max-width: 720px) {
    padding: 20px;
  }
=======
  padding: 50px;
>>>>>>> origin/master
`;

export const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  display: block;
  padding: 15px 0px;
  border-bottom: 2px #aaaaaa solid;
`;

<<<<<<< HEAD
export const SectionTitleSmall = styled.span`
  color: #343a40;
  font-size: 1.1rem;
  padding-left: 10px;
`;

=======
>>>>>>> origin/master
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
<<<<<<< HEAD
  background-color: #fff;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  @media (max-width: 720px) {
    margin-bottom: 20px !important;
  }
=======
  padding: 20px;
>>>>>>> origin/master
`;

export const InformationSubHeading = styled.p`
  font-weight: bold;
  margin: 10px 0;
  font-size: 1.3rem;
  color: #007bff;
`;

export const InformationWrapper = styled.div<InformationWrapperProps>`
  display: flex;
<<<<<<< HEAD
  flex-grow: 1;
  flex-basis: 0;
  
  flex-direction: ${ ({ direction }) => (direction === "row" ? "row" : (direction === "column" ? "column" : "default")) };
  & > div {
=======
  flex-direction: ${ ({ direction }) => (direction === "row" ? "row" : (direction === "column" ? "column" : "default")) };
  & > div {
    flex-grow: 1;
    flex-basis: 0;
>>>>>>> origin/master
    margin: ${ ({ direction }) => (direction === "row" ? "0 15px" : (direction === "column" ? "15px 0" : "default")) };
    &:first-child {
      ${ ({ direction }) => (direction === "row" ? "margin-left: 0;" : (direction === "column" ? "margin-top: 0;" : "")) }
    }
    &:last-child {
      ${ ({ direction }) => (direction === "row" ? "margin-right: 0;" : (direction === "column" ? "margin-bottom: 0;" : "")) }
    }
  }
<<<<<<< HEAD

  @media (max-width: 720px) {
    display: block;
    & > div {
      margin: 0;
    }
  }
=======
>>>>>>> origin/master
`;