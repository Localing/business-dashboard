import React from 'react';
import styled from 'styled-components';

export const ImageWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

export const Image = styled.img`
  width: 100%;
`;