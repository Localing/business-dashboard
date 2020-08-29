import React, { FunctionComponent } from 'react';
import * as styles from './styles/ProductInformationStyles';
import * as dashboardStyles from './../styles/DashboardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCoins, faShoppingCart, faImages } from '@fortawesome/free-solid-svg-icons';

interface ProductSchema {
  businessId: string,
  productId: string,
  price: number,
  discount: number,
  currency: string,
  active: boolean,
  stock: number,
  name: string,
  description: string,
  images: string[]
}

interface ProductInformationProps {
  data: ProductSchema|undefined
}
const ProductInformation:FunctionComponent<ProductInformationProps> = ({ data, ...rest}) => {
  const formatPrice = (price: number):string => {
    return '£' + String((price/100).toFixed(2));
  }

  if (data === undefined) {
    return null;
  }
  
  return (
    <dashboardStyles.InformationWrapper direction={"row"}>
        
      <dashboardStyles.InformationWrapper direction={"column"}>
        <dashboardStyles.InformationSubBox>
          <dashboardStyles.InformationSubHeading><FontAwesomeIcon icon={faInfoCircle} />&nbsp;&nbsp;Primary Details</dashboardStyles.InformationSubHeading>
          <dashboardStyles.Information><strong>Name:</strong> {data.name}</dashboardStyles.Information>
          <dashboardStyles.Information><strong>Description:</strong> {data.description}</dashboardStyles.Information>
        </dashboardStyles.InformationSubBox>
        <dashboardStyles.InformationSubBox>
          <dashboardStyles.InformationSubHeading><FontAwesomeIcon icon={faCoins} />&nbsp;&nbsp;Pricing</dashboardStyles.InformationSubHeading>
          <dashboardStyles.Information><strong>Pre-Sale price:</strong> {formatPrice(data.price)}</dashboardStyles.Information>
          <dashboardStyles.Information><strong>Discount:</strong> { data.discount }%</dashboardStyles.Information>
          <dashboardStyles.Information><strong>Customer pays:</strong> {formatPrice((data.price * (1-(data.discount/100))))}</dashboardStyles.Information>
        </dashboardStyles.InformationSubBox>
        <dashboardStyles.InformationSubBox>
          <dashboardStyles.InformationSubHeading><FontAwesomeIcon icon={faShoppingCart} />&nbsp;&nbsp;Stock and Cart</dashboardStyles.InformationSubHeading>
          <dashboardStyles.Information><strong>Max order quantity:</strong> {data.stock}</dashboardStyles.Information>
        </dashboardStyles.InformationSubBox>
      </dashboardStyles.InformationWrapper>

      <dashboardStyles.InformationWrapper direction={"column"}>
        <dashboardStyles.InformationSubBox>
          <dashboardStyles.InformationSubHeading><FontAwesomeIcon icon={faImages} />&nbsp;&nbsp;Images</dashboardStyles.InformationSubHeading>
          {data.images.map(img => 
            <styles.ImageWrapper>
              <styles.Image src={img}/>
            </styles.ImageWrapper>
          )}
        </dashboardStyles.InformationSubBox>
      </dashboardStyles.InformationWrapper>
      
    </dashboardStyles.InformationWrapper>
  )
}

export default ProductInformation;
