import React, { useState, useEffect } from 'react';
import * as styles from './styles/ActiveOrdersStyles';
import * as dashboardStyles from './styles/DashboardStyles';

import OrderListTable from './sub-components/OrderListTable';

import API from '../../services/API';

interface OrderSchema {
  customerName: string,
  customerContact: string,
  orderCode: string,
  orderID: string,
  orderDate: string,
  redeemed: boolean,
  items: { name: string, quantity: number, price: number, imgUrl: string }[]
}

const ActiveOrders = () => {
  const [data, setData] = useState<OrderSchema[]>([])

  const getData = () => {
    // TODO: make API call for data

    API.get('/order/business/e3e5a916-c0fd-4fd7-a054-56738c87bb86')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return [
      {
        "customerName": "Vishnu Bezos",
        "customerContact": "07893 890273",
        "orderCode": "890099210",
        "orderID": "786828b0-d8e0-11ea-87d0-0242ac130003",
        "orderDate": "1596826981",
        "redeemed": true,
        "items": [
          { "name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg" },
          { "name": "Caramel vanilla shortcake with pumpkin spiced latte", "quantity": 2, price: 1.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/cake.jpg" }
        ]
      },
      {
        "customerName": "Vishnu Ravi",
        "customerContact": "07893 890273",
        "orderCode": "890099210",
        "orderID": "786828b0-d8e0-11ea-87d0-0242ac130003",
        "orderDate": "1597684609",
        "redeemed": false,
        "items": [
          { "name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg" },
          { "name": "Caramel vanilla shortcake with pumpkin spiced latte", "quantity": 2, price: 1.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/cake.jpg" }
        ]
      },
      {
        "customerName": "Cameron Robey",
        "customerContact": "07893 890273",
        "orderCode": "890099210",
        "orderID": "786828b0-d8e0-11ea-87d0-0242ac130003",
        "orderDate": "1597252609",
        "redeemed": false,
        "items": [
          { "name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg" },
          { "name": "Caramel vanilla shortcake with pumpkin spiced latte", "quantity": 2, price: 1.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/cake.jpg" }
        ]
      },
      {
        "customerName": "Katie O'Flaherty",
        "customerContact": "07893 890273",
        "orderCode": "890099210",
        "orderID": "786828b0-d8e0-11ea-87d0-0242ac130003",
        "orderDate": "1597166209",
        "redeemed": true,
        "items": [
          { "name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg" },
          { "name": "Caramel vanilla shortcake with pumpkin spiced latte", "quantity": 2, price: 1.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/cake.jpg" }
        ]
      }
    ]
  }

  useEffect(() => {
    let data = getData();
    setData(data);
  }, []);

  return (
    <dashboardStyles.DashboardContainer fluid>
      <dashboardStyles.SectionTitle>Active Orders</dashboardStyles.SectionTitle>
      <dashboardStyles.ContentBlockWrapper>
        <OrderListTable data={data}></OrderListTable>
      </dashboardStyles.ContentBlockWrapper>
    </dashboardStyles.DashboardContainer>
  )
}

export default ActiveOrders;
