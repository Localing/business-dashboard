import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { useProductData } from '../../contexts/ProductDataContext';

import * as styles from './styles/ProductStyles';
import * as dashboardStyles from './styles/DashboardStyles';

import ProductInformation from './sub-components/ProductInformation';
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
  const productData = useProductData();

  const [data, setData] = useState<ProductSchema|undefined>(undefined);

  useEffect(() => {
    let productId = location.pathname.split('/')[3];

    productData.setProduct(productId);
  }, []);

  useEffect(() => {
    setData(productData.individualProductData);
  }, [productData.individualProductData]);

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
