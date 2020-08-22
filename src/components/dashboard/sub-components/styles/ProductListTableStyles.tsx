import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const status_colors: any = {
  'active': '#28a745',
  'inactive': '#6c757d'
}

export const ProductInfoWrapper = styled.div`
  flex-grow: 1;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1200px) {
    padding: 0 10px;
    display: block;
  }
`;

interface ProductStatusProps {
  status: string
}

export const ProductStatus = styled(({ status, ...rest })  => <div {...rest} />)`
  color: ${(props: ProductStatusProps) => status_colors[props.status] || status_colors['active']};
  font-size: 0.6em;
  padding: 0 10px;
`;

export const ProductName = styled.div`
  color: #007bff;
  font-weight: bold;
  padding: 0 10px;
  display: inline-block;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const ProductPrettyID = styled.div`
  color: #6c757d;
  font-weight: bold;
  padding: 0 10px;
  display: inline-block;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const ProductPrice = styled.div`
  color: #000;
  font-weight: bold;
  padding: 0 10px;
  display: inline-block;
  width: 20%;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const ProductExpand = styled.div`
  padding: 0 20px;
  color: #6c757d;

  &:hover {
    color: #343a40;
  }
  
  @media (max-width: 1200px) {
    padding: 0 10px;
  }
`;