import React, {FunctionComponent, useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faCheck } from '@fortawesome/free-solid-svg-icons';
import OTPInput from './sub-components/OTP';
import OrderInformation from './sub-components/OrderInformation';
import PageTitle from './../PageTitle';

import * as styles from './styles/VerifyOrderStyles';
import * as dashboardStyles from './styles/DashboardStyles';

interface VerifyOrderProps {

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

const VerifyOrder:FunctionComponent<VerifyOrderProps> = () => {
  const [displayOTP, setDisplayOTP] = useState<boolean>(true);
  const [displayOrderDetails, setDisplayOrderDetails] = useState<boolean>(false);
  const [displayVerfied, setDisplayVerified] = useState<boolean>(false);
  const [OTP, setOTP] = useState<string|undefined>();
  const [orderData, setOrderData] = useState<OrderSchema|undefined>();


  const completeOTP = (val:string) => {
    setOTP(val);
    setDisplayOTP(false);
  }

  const getOrderData = (orderCode: string) => {
    // TODO: Replace this with API call

    return {
      "customerName": "Vishnu Ravi",
      "customerContact": "+16468670637",
      "orderCode": orderCode, 
      "orderID": "786828b0-d8e0-11ea-87d0-0242ac130003",
      "orderDate": "1596826981",
      "redeemed": false,
      "items": [{"name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg"},
      {"name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg"},
      {"name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg"},
      {"name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg"},
      {"name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg"},
      {"name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg"},
      {"name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg"},
      {"name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg"},
      {"name": "Pizza; toppings: olives, anchovies, red onions, mozzarella, chives", "quantity": 1, price: 2.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/pizza.jpg"},
      {"name": "Caramel vanilla shortcake with pumpkin spiced latte", "quantity": 2, price: 1.0, "imgUrl": "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/cake.jpg"}]
    }
  }

  const verifyOrder = () => {
    setDisplayOrderDetails(false);
    setDisplayVerified(true);
  }

  useEffect(() => {
    let customerData: OrderSchema|undefined = undefined;
    if (OTP) {
      customerData = getOrderData(OTP);
    }
    setOrderData(customerData);
    setDisplayOrderDetails(true);
  }, [OTP]);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  useEffect(() => {
    // Reset component and clear data after two seconds once verified

    let timer: any;
    if (displayVerfied === true) {
      timer = setTimeout(() => {
        setOrderData(undefined);
        setDisplayOTP(true);
        setDisplayVerified(false);
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [displayVerfied]);

  return (
    <>
      <PageTitle title="Verify Order" />
      <dashboardStyles.DashboardContainer fluid>
        <dashboardStyles.SectionTitle>Verify Order</dashboardStyles.SectionTitle>
        <dashboardStyles.ContentBlockWrapper>
          <dashboardStyles.InformationWrapper direction={"row"}>
            
            {displayOTP ? <>
                <dashboardStyles.InformationSubBox>
                  <styles.InputOrderCodeWrapper>
                    <dashboardStyles.InformationSubHeading><FontAwesomeIcon icon={faKeyboard} />&nbsp;&nbsp;Input order code</dashboardStyles.InformationSubHeading>
                    <OTPInput numGroups={3} numInGroup={3} onComplete={completeOTP} />
                    </styles.InputOrderCodeWrapper>
                </dashboardStyles.InformationSubBox>
              </> : null}

            {orderData && displayOrderDetails ? <>
              <OrderInformation data={orderData}></OrderInformation>
            </> : null}
              
          </dashboardStyles.InformationWrapper>
          {orderData && displayOrderDetails ? <>
            <styles.ButtonBlockWrapper>
              <dashboardStyles.SubmitButton onClick={verifyOrder} ><FontAwesomeIcon icon={ faCheck } />  Verify order redeemed</dashboardStyles.SubmitButton>
            </styles.ButtonBlockWrapper>
          </> : null}

          {displayVerfied ? <>
                <dashboardStyles.InformationSubBox>
                    <dashboardStyles.InformationSubHeading><FontAwesomeIcon icon={faCheck} />&nbsp;&nbsp;Order successfully verified</dashboardStyles.InformationSubHeading>
                </dashboardStyles.InformationSubBox>
              </> : null}
        </dashboardStyles.ContentBlockWrapper>
      </dashboardStyles.DashboardContainer>
    </>
  )
}

export default VerifyOrder;
