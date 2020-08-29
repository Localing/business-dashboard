import React, { useState, useEffect } from 'react';
import * as styles from './styles/ProductsStyles';
import * as dashboardStyles from './styles/DashboardStyles';
import API from './../../services/API';

import ProductListTable from './sub-components/ProductListTable';
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

const Products = () => {
  const userData = useUserData();
  const [data, setData] = useState<ProductSchema[]>([])

  const getData = async () => {
    try {
      let response = await API.get(`/product/${userData.user?.attributes.sub}`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
