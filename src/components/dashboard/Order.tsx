import React, {FunctionComponent, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import * as styles from './styles/OrderStyles';
import * as dashboardStyles from './styles/DashboardStyles';
import OrderInformation from './sub-components/OrderInformation';

interface OrderProps {
  
}

interface OrderSchema {
  customerName: string,
  customerContact: string,
  orderCode: string, 
  orderID: string,
  orderDate: string,
  redeemed: boolean,
  items: { name: string, quantity: number, price: number, imgUrl: string }[]
}

const Order:FunctionComponent<OrderProps> = () => {
  const location = useLocation();

  const [orderData, setOrderData] = useState<OrderSchema|undefined>(undefined);

  const getOrderData = (orderCode: string) => {
    // TODO: Replace this with API call

    return {
      "customerName": "Vishnu Ravi",
      "customerContact": "+16468670637",
      "orderCode": "890293281", 
      "orderID": orderCode,
      "orderDate": "1596826981",
      "redeemed": false,
      "items": [{"name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg"},
      {"name": "Caramel vanilla shortcake with pumpkin spiced latte", "quantity": 2, price: 1.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/cake.jpg"}]
    }
  }

  const formatDate = (dateStr: string|undefined) => {
    if ( dateStr === undefined) return '';
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    let date = new Date(0); 
    date.setUTCSeconds(Number(dateStr));
    return date.toLocaleDateString('en-GB', options);
  }

  useEffect(() => {
    // Fetch data on page load

    let order = location.pathname.split('/')[3]

    let data = getOrderData(order);
    setOrderData(data);
  }, []);

  return (
    <dashboardStyles.DashboardContainer fluid>
      <dashboardStyles.SectionTitle>Order <dashboardStyles.SectionTitleSmall>({orderData?.customerName} - {formatDate(orderData?.orderDate)})</dashboardStyles.SectionTitleSmall></dashboardStyles.SectionTitle>
      <dashboardStyles.ContentBlockWrapper>
        <dashboardStyles.InformationWrapper direction={'row'}>
          <OrderInformation data={orderData}></OrderInformation> 
        </dashboardStyles.InformationWrapper>
      </dashboardStyles.ContentBlockWrapper>
    </dashboardStyles.DashboardContainer>
  )
}

export default Order;
