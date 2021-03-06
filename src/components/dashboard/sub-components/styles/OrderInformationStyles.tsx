import styled from 'styled-components';
import Table from 'react-bootstrap/Table';

// Component styles
export const ItemsTable = styled(Table)`
  text-align: center;

  & > tbody > tr > td > img {
    height: 80px;
  }
  
  @media (max-width: 1200px) {
    font-size: 0.85rem;

    & > tbody > tr > td:first-child {
      display: none;
    }

    & > thead > tr > th:first-child {
      display: none;
    }
  }

  @media (max-width: 720px) {
    font-size: 0.75rem;

    & > tbody > tr > td:first-child {
      display: none;
    }

    & > thead > tr > th:first-child {
      display: none;
    }
  }
`;

export const TotalPriceRow = styled.td`
  font-size: 1rem;
  text-align: right;
  font-weight: bold;
  padding-right: 30px !important;
`;