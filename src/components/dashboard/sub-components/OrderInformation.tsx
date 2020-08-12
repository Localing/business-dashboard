import React, { FunctionComponent } from 'react';
import * as styles from './styles/OrderInformationStyles';
import * as dashboardStyles from './../styles/DashboardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTag, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

interface OrderInformationProps {
  data: {
    customerName: string,
    customerContact: string,
    orderCode: string, 
    orderID: string,
    orderDate: string,
    redeemed: boolean,
    items: { name: string, quantity: number, price: number, imgUrl: string }[]
  }
}

const OrderInformation:FunctionComponent<OrderInformationProps> = ({ data, ...rest}) => {
  
  const formatDate = (dateStr: string) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(0); 
    date.setUTCSeconds(Number(dateStr));
    return date.toLocaleDateString('en-GB', options);
  }

  const formatOrderCode = (code: string) => {
    return code.match(/.{1,3}/g)?.join('-');
  }

  const formatPrice = (price: number):string => {
    return '£' + String(price.toFixed(2));
  }

  const totalPrice = (data: { name: string, quantity: number, price: number, imgUrl: string }[]):number => {
    let total: number = 0;
    data.map( (item: { name: string, quantity: number, price: number, imgUrl: string }) => 
      total += (item.price*item.quantity)
    );
    return total;
  }
  
  return (
    <dashboardStyles.InformationWrapper direction={"row"}>
        
      <dashboardStyles.InformationWrapper direction={"column"}>
        <dashboardStyles.InformationSubBox>
          <dashboardStyles.InformationSubHeading><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;Customer Information</dashboardStyles.InformationSubHeading>
          <dashboardStyles.Information><strong>Name:</strong> {data.customerName}</dashboardStyles.Information>
          <dashboardStyles.Information><strong>Contact:</strong> {data.customerContact}</dashboardStyles.Information>
        </dashboardStyles.InformationSubBox>
        <dashboardStyles.InformationSubBox>
          <dashboardStyles.InformationSubHeading><FontAwesomeIcon icon={faTag} />&nbsp;&nbsp;Order Information</dashboardStyles.InformationSubHeading>
          <dashboardStyles.Information><strong>Order code:</strong> {formatOrderCode(data.orderCode)}</dashboardStyles.Information>
          <dashboardStyles.Information><strong>Order date:</strong> { formatDate(data.orderDate) }</dashboardStyles.Information>
          <dashboardStyles.Information><strong>Status:</strong>  {(data.redeemed) ? "Redeemed" : "Not redeemed"}</dashboardStyles.Information>
        </dashboardStyles.InformationSubBox>
      </dashboardStyles.InformationWrapper>

      <dashboardStyles.InformationWrapper direction={"column"}>
        <dashboardStyles.InformationSubBox>
          <dashboardStyles.InformationSubHeading><FontAwesomeIcon icon={faShoppingBag} />&nbsp;&nbsp;Order Items</dashboardStyles.InformationSubHeading>
          <styles.ItemsTable hover>
            <thead className={"thead-light"}>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Unit Price</th>
                <th>QTY</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map( ( item: { name: string, quantity: number, price: number, imgUrl: string } ) => {
                return <tr>
                  <td><img alt={item.name} src={item.imgUrl}/></td>
                  <td className="text-left align-middle">{item.name}</td>
                  <td className="align-middle">{formatPrice(item.price)}</td>
                  <td className="align-middle">{item.quantity}</td>
                  <td className="align-middle">{formatPrice(item.price * item.quantity)}</td>
                </tr>
              }) }
              <tr>
                <td></td>
                <styles.TotalPriceRow colSpan={4}>
                  Total Price: {formatPrice(totalPrice(data.items))}
                </styles.TotalPriceRow>
              </tr>
            </tbody>
          </styles.ItemsTable>
        </dashboardStyles.InformationSubBox>
      </dashboardStyles.InformationWrapper>
      
    </dashboardStyles.InformationWrapper>
  )
}

export default OrderInformation;
