import styled from 'styled-components';

// Component styles
export const SingleOTPInputBox = styled.input`
  box-sizing: content-box;
  margin: 0 10px;
  padding: 10px 20px;
  width: 1ch;
  border-radius: 5px;
<<<<<<< HEAD
  border: 1px #aaaaaa solid;
=======
  border: 2px #aaaaaa solid;
>>>>>>> origin/master
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
<<<<<<< HEAD
  padding: 20px 0px;
=======
  padding: 20px;
>>>>>>> origin/master
  display: flex;
  align-items: center;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
<<<<<<< HEAD

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
    padding: 0px;
    flex-flow: wrap;
  }
=======
>>>>>>> origin/master
`;

export const Separator = styled.p`
  display: inline-block;
  line-height: 2em;
  margin: 0;
  color: #aaaaaa;
`;

<<<<<<< HEAD
export const GroupSeparator = styled.p`
  display: inline-block;
  line-height: 2em;
  margin: 0;
  color: #aaaaaa;
  text-align: center;
  padding: 20px;

  @media (max-width: 900px) {
    display: block;
    width: 100%;
    text-align: center;
  }
`;

export const OTPWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    flex-wrap: wrap;
    padding: 20px 0;
  }
`;

export const SectionWrapper = styled.div`
  @media (min-width: 900px) {
    display: flex;
    align-items: center;
  }
=======
export const OTPWrapper = styled.div`
  display: flex;
>>>>>>> origin/master
`;