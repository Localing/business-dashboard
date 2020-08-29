import React, { useState, useEffect } from 'react';
import * as styles from './styles/ProductsStyles';
import * as dashboardStyles from './styles/DashboardStyles';

import ProductListTable from './sub-components/ProductListTable';
import LoadingSpinner from '../LoadingSpinner';
import { useProductData } from '../../contexts/ProductDataContext';

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

const Products = () => {
  const productData = useProductData();
  const [data, setData] = useState<ProductSchema[]>([])

  useEffect(() => {
    productData.getProductsData();
  }, []);

  useEffect(() => {
    console.log(productData.productsData);
    setData(productData.productsData);
  }, [productData.productsData]);

  return (
    <dashboardStyles.DashboardContainer fluid>
    <dashboardStyles.SectionTitle>Products</dashboardStyles.SectionTitle>
    <dashboardStyles.ContentBlockWrapper>
      {(data.length > 0) ? <ProductListTable data={data} /> : <LoadingSpinner />}
    </dashboardStyles.ContentBlockWrapper>
  </dashboardStyles.DashboardContainer>
  )
}

export default Products;
