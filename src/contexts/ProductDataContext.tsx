import React, { useState, useEffect, useContext } from 'react';
import API from './../services/API';
import { useUserData } from './UserContext';


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

interface ProductDataContext {
  productsData: ProductSchema[],
  getProductsData: () => void,
  setProduct: (productId: string) => void,
  individualProductData: ProductSchema|undefined
}

const ProductDataContext = React.createContext<ProductDataContext>({} as ProductDataContext);

export const useProductData = () => useContext(ProductDataContext);

export const UserProductDataContext = ProductDataContext.Consumer;

export const ProductDataProvider: React.FC = ({ children }) => {
  const userData = useUserData();

  // All products
  const [ productsData, setProductsData ] = useState([]);

  const getProductsData = async (force: boolean = false) => {
    // Get list of all products, to force re-getting of data, use force = true
    if (force || productsData.length === 0) {
      try {
        let response = await API.get(`/product/${userData.businessData?.businessId}`);
        setProductsData(response.data);
      } catch (err) {
        
      }
    }
  }

  // Individual product
  const [ individualProductData, setIndividualProductData] = useState<ProductSchema|undefined>(undefined);
  
  const setProduct = async (productId: string) => {
    // Get details of a product, only update if new product
    if (individualProductData?.productId !== productId) {
      setIndividualProductData(undefined);
      let businessId = userData.businessData?.businessId;

      try {
        let response = await API.get(`/product/${businessId}/${productId}`);
        setIndividualProductData(response.data);
      } catch (err) {
        
      }
    }
  }

  return(
    <ProductDataContext.Provider
      value={{
        productsData,
        getProductsData,
        setProduct,
        individualProductData
      }}
    >
      {children}
    </ProductDataContext.Provider>
  )
}

export default ProductDataContext;