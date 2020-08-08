import styled from 'styled-components';
import Table from 'react-bootstrap/Table';

interface ItemInformationProps {
  grow: boolean
}

// Component styles
export const ItemsTable = styled(Table)`
  text-align: center;

  & > tbody > tr > td > img {
    height: 80px;
  }
`;

export const TotalPriceRow = styled.td`
  text-align: right;
  font-weight: bold;
  padding-right: 30px !important;
`;