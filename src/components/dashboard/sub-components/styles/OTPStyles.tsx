import styled from 'styled-components';

// Component styles
export const SingleOTPInputBox = styled.input`
  box-sizing: content-box;
  margin: 0 10px;
  padding: 10px 20px;
  width: 1ch;
  border-radius: 5px;
  border: 2px #aaaaaa solid;
  font-size 2em;
  font-weight: bold;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

export const GroupWrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`;

export const Separator = styled.p`
  display: inline-block;
  line-height: 2em;
  margin: 0;
  color: #aaaaaa;
`;

export const OTPWrapper = styled.div`
  display: flex;
`;