import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface OrderStatusProps {
  status: string
}

const status_colors: any = {
  'active': '#28a745',
  'redeemed': '#6c757d',
  'cancelled': '#dc3545'
}

export const OrderInfoWrapper = styled.div`
  flex-grow: 1;
  padding: 0 30px;

  @media (max-width: 1200px) {
    padding: 0 10px;
  }
`;

interface OrderStatusProps {
  status: string
}

export const OrderStatus = styled(({ status, ...rest })  => <div {...rest} />)`
  color: ${(props: OrderStatusProps) => status_colors[props.status] || status_colors['active']};
  font-size: 0.6em;
  padding: 0 10px;
`;

export const OrderDate = styled.div`
  color: #007bff;
  font-weight: bold;
  padding: 0 10px;
  width: 30%;

  @media (max-width: 1200px) {
    width: auto;
  }
`;

export const OrderName = styled.div`
  font-weight: bold;
  padding: 0 10px;
  display: inline-block;
  width: 50%;

  @media (max-width: 1200px) {
    width: auto;
  }
`;

export const OrderTotalPrice = styled.div`
  display: inline-block;
  padding: 0 10px;
`;

export const OrderExpand = styled.div`
  padding: 0 20px;
  color: #6c757d;

  &:hover {
    color: #343a40;
  }
  
  @media (max-width: 1200px) {
    padding: 0 10px;
  }
`;