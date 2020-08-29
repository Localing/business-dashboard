import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as styles from './styles/ProductStyles';
import * as dashboardStyles from './styles/DashboardStyles';
import ProductInformation from './sub-components/ProductInformation';
import API from './../../services/API';
import { useUserData } from '../../contexts/UserContext';
import LoadingSpinner from '../LoadingSpinner';

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

interface ProductProps {
  data: ProductSchema
}

const Product = () => {
  const location = useLocation();
  const userData = useUserData();

  const [data, setData] = useState<ProductSchema|undefined>(undefined);

  const getData = async () => {
    let businessId = userData.businessData?.businessId;
    let productId = location.pathname.split('/')[3];

    try {
      let response = await API.get(`/product/${businessId}/${productId}`);
      setData(response.data);
    } catch (err) {
      
    }    
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <dashboardStyles.DashboardContainer fluid>
    <dashboardStyles.SectionTitle>Product <dashboardStyles.SectionTitleSmall>Product Name</dashboardStyles.SectionTitleSmall></dashboardStyles.SectionTitle>
    <dashboardStyles.ContentBlockWrapper>
      <dashboardStyles.InformationWrapper direction={'row'}>
        {data ? <ProductInformation data={data} /> : <LoadingSpinner />}
      </dashboardStyles.InformationWrapper>
    </dashboardStyles.ContentBlockWrapper>
  </dashboardStyles.DashboardContainer>
  )
}

export default Product;
