import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const status_colors: any = {
  'active': '#28a745',
  'redeemed': '#6c757d',
  'cancelled': '#dc3545'
}

// Component styles
export const OrderListTableWrapper = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 1200px) {
    display: block;
  }
`;

export const FilterOptions = styled.div`
  width: 20%;
  padding: 10px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const FilterHeading = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  padding-bottom: 10px;
  @media (max-width: 1200px) {
    display: none;
  }
  `;
  
export const FilterSubheading = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #000000;
  margin: 5px 0;
`;

export const FilterSet = styled.div`
  padding: 20px;
  border-radius: 5px;
  border: 1px #aaaaaa solid;
`;

interface FilterToggleProps {
  active: boolean
}

export const FilterToggle = styled(({ active, ...rest })  => <div {...rest} />)`
  font-weight: bold;
  padding: 5px;
  margin: 5px 0;
  width: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background-color: ${(props: FilterToggleProps) => props.active ? '#f6f6f6' : '#fff'};
  color: ${(props: FilterToggleProps) => props.active ? '#007bff' : '#343a40'};


  &:hover {
    background-color: #f6f6f6;
  }
`;

interface FilterToggleIconDefaultProps {
  keyColor: string
}

export const FilterToggleIconDefault = styled(({ keyColor, ...rest })  => <FontAwesomeIcon {...rest} />)`
  font-size: 0.5em;
  color: ${(props: FilterToggleIconDefaultProps) => status_colors[props.keyColor] || status_colors['redeemed']};
  margin: 0 10px;
`;

export const FilterToggleIconLarge = styled(FontAwesomeIcon)`
  margin: 0 10px;
`;

export const Orders = styled.div`
  width: 80%;
  padding: 10px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const OrderSearch = styled.div`
  position: relative;
`;

export const OrderInput = styled.input`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
  padding-right: 3rem;
  border-radius: 5px;
  border: 1px #aaaaaa solid;
  font-size: 1.1rem;
  font-weight: bold;
  transition: 0.1s all ease;
  box-shadow: none;

  &:focus {
    box-shadow: 0px 0px 5px 0px #007bff;
    border: 1px #007bff solid;
  }
`;

export const OrderSearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 1rem;
  font-size: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #aaaaaa;
`;

interface OrderItemWrapperProps {
  separateBox: boolean
}

export const OrderItemWrapper = styled.div`
  margin: ${(props: OrderItemWrapperProps) => props.separateBox ? '30px' : '-1px'} 0;
  transition: 0.3s margin ease;

  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 0px;
  }
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-bottom: 0px;
  }
`;

export const OrderTable = styled.div``;

interface OrderTableOrderProps {
  finalBox: boolean
}

export const OrderTableOrder = styled(({ finalBox, ...rest })  => <div {...rest} />)`
  display: flex;
  width: 100%;
  border: 1px #aaaaaa solid;
  // border-bottom: none;
  padding: 1rem;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0,0,0,0.04);
  transition: 0.3s box-shadow ease;
  background-color: #fff;
  border-radius: ${(props: OrderTableOrderProps) => props.finalBox ? '0' : 'inherit'};

  &:hover {
    box-shadow: 0px 0px 3px rgba(0,0,0,0.2);
  }
`;

interface OrderInfoBoxProps {
  firstBox: boolean
}

export const OrderInfoBox = styled(({ firstBox, ...rest })  => <div {...rest} />)`
  display: flex;
  width: 100%;
  border: 1px #aaaaaa solid;
  padding: 20px;
  border-top: none;
  transition: 0.3s margin-bottom ease;
  border-radius: ${(props: OrderInfoBoxProps) => props.firstBox ? '0' : 'inherit'};
`;

export const OrderInfoWrapper = styled.div`
  flex-grow: 1;
  padding: 0 30px;
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
`;

export const OrderName = styled.div`
  font-weight: bold;
  padding: 0 10px;
  display: inline-block;
  width: 50%;
`;

export const OrderTotalPrice = styled.div`
  display: inline-block;
  padding: 0 10px;
`;

export const OrderExpand = styled.div`
  padding: 0 20px;
  color: #6c757d;
`;