import React, {FunctionComponent, useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OTPInput from '../OTP';

import * as styles from './styles/VerifyOrderStyles';
import * as dashboardStyles from './styles/DashboardStyles';

interface VerifyOrderProps {

}

const VerifyOrder:FunctionComponent<VerifyOrderProps> = () => {
  const [displayOTP, setDisplayOTP] = useState<boolean>(true);
  const [OTP, setOTP] = useState<string|undefined>();

  const completeOTP = (val:string) => {
    setOTP(val);
    setDisplayOTP(false);
  }

  useEffect(() => {
    console.log(OTP);
  }, [OTP]);

  return (
      <dashboardStyles.DashboardContainer fluid>
        <Row>
          <Col md={12}>
            <dashboardStyles.SectionTitle>Verify Order</dashboardStyles.SectionTitle>
            {displayOTP ? <OTPInput numGroups={3} numInGroup={3} onComplete={completeOTP} /> : null}
            <p>{OTP}</p>
          </Col>
        </Row>
      </dashboardStyles.DashboardContainer>
  )
}

export default VerifyOrder;
