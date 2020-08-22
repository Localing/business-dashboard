import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

// Component styles
export const FormBox = styled.div``;

export const SingleInput = styled.div`
  margin: 20px 0;

  &:first-child {
    margin: 0;
  }
`;

export const InputLabel = styled.p`
  margin: 0;
  font-weight: 600;
  
`;

export const InputInput = styled.input`
  font-size: 1.4rem;
  font-weight: 600;

  width: 100%;
  border-radius: 5px;
  border: 1px #aaa solid;
  padding: 10px 20px;
`;

export const InputTextarea = styled.textarea`
  font-size: 1.2rem;
  
  width: 100%;
  border-radius: 5px;
  border: 1px #aaa solid;
  padding: 10px 20px;
`;

export const ConfirmationText = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 10px;
`;

export const ConfirmationField = styled.p`
  margin: 0;
`;

export const FieldName = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

export const FieldValue = styled.span``;

export const ErrorMessage = styled.div`
  color: #dc3545;
  font-weight: 600;
  margin: 10px 0;
`;

export const NavigationButtonGroup = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

export const BackButton = styled(Button)`
  font-weight: bold;
`;

export const NextButton = styled(Button)`
  font-weight: bold;
`;

export const CompleteButton = styled(Button)`
  font-weight: bold;
`;
