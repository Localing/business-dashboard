import styled from 'styled-components';

export const ImageCropperWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 500px;
  display: flex;
  position: relative;

  @media (max-width: 720px) {
    height: 80vw;
  }
`;
