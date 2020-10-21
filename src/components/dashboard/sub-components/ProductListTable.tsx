import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as styles from './styles/ProductListTableStyles';
import * as tableStyles from './styles/TableStyles';
import * as dashboardStyles from './../styles/DashboardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircle, faExternalLinkAlt, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle, faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';
import ProductInformation from './ProductInformation';

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

interface ProductListTableProps {
  data: ProductSchema[]
}

interface ProductStatusFiltersSchema {
  active: boolean,
  inactive: boolean
}

const ProductListTable:FunctionComponent<ProductListTableProps> = ({ data, ...rest}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchIcon, setSearchIcon] = useState(faSearch);
  const [displayData, setDisplayData] = useState<ProductSchema[]>([]);
  const [infoBoxDisplays, setInfoBoxDisplays] = useState<boolean[]>([]);

   // Filters
   const [productStatusFilters, setProductStatusFilters] = useState<ProductStatusFiltersSchema>({
    'active': false,
    'inactive': false
  });

  const handleProductStatusFilters = (filter: keyof ProductStatusFiltersSchema) => {
    setProductStatusFilters({...productStatusFilters, [filter]: !productStatusFilters[filter]});
  }

  const formatPrice = (price: number):string => {
    return '£' + String(price.toFixed(2));
  }

  const checkAllFilters = (obj: any) => {
    return Object.keys(obj).every((k) => !obj[k]);
  }

  const filterProducts = () => {
    // Search function - filter by product name
    let new_data = data.filter( product => {
      let resp = false;
      if (product.name.toLowerCase().replace(/[^a-zA-Z ]/g, "").includes(searchText.toLowerCase().replace(/[^a-zA-Z ]/g, ""))) {
        resp = true;
      }
      if (!checkAllFilters(productStatusFilters)) {
        if (!(product.active === true && productStatusFilters.active === true) && !(product.active === false && productStatusFilters.inactive === true)) {
          resp = false;
        }
      }
      return resp;
    });
    new_data.sort((a,b) => a.name.localeCompare(b.name));

    setDisplayData(new_data);
  }

  const handleOrderInfoBoxToggle = (index: number) => {
    let temp_arr = [...infoBoxDisplays];
    temp_arr[index] = !temp_arr[index];
    console.log(temp_arr);
    setInfoBoxDisplays(temp_arr);
  }

  useEffect(() => {
    filterProducts();
    // New data: close all boxes and recreate box array
    let temp_arr: boolean[] = [];
    data.map(() => {temp_arr.push(false)})
    setInfoBoxDisplays(temp_arr);
  }, [data])

  useEffect(() => {    
    filterProducts();

  }, [searchText]);

  useEffect(() => {    
    filterProducts();

  }, [productStatusFilters]);

  return (
    <>
      <dashboardStyles.InformationWrapper direction={'row'}>
        <tableStyles.TableWrapper>
          <tableStyles.FilterOptions>
            <tableStyles.FilterHeading>Filters:</tableStyles.FilterHeading>
              <tableStyles.FilterSet>
                <tableStyles.FilterSubheading>Order status:</tableStyles.FilterSubheading>
                <tableStyles.FilterToggle active={productStatusFilters.active} onClick={() => handleProductStatusFilters('active')}>
                  {
                  productStatusFilters.active 
                  ? <><tableStyles.FilterToggleIconLarge icon={faCheckSquare} /><span>Active</span></> 
                  : checkAllFilters(productStatusFilters) ? 
                  <><tableStyles.FilterToggleIconDefault icon={faCircle} keyColor={'active'} /><span>Active</span></>
                  : <><tableStyles.FilterToggleIconLarge icon={farSquare} /><span>Active</span></> 
                  }
                </tableStyles.FilterToggle>
                <tableStyles.FilterToggle active={productStatusFilters.inactive} onClick={() => handleProductStatusFilters('inactive')}>
                  {
                    productStatusFilters.inactive 
                    ? <><tableStyles.FilterToggleIconLarge icon={faCheckSquare} /> Inactive</> 
                    : checkAllFilters(productStatusFilters) ? 
                    <><tableStyles.FilterToggleIconDefault icon={faCircle} keyColor={'redeemed'} /> Inactive</> 
                    : <><tableStyles.FilterToggleIconLarge icon={farSquare} /> Inactive</> 
                  }
                </tableStyles.FilterToggle>
              </tableStyles.FilterSet>
          </tableStyles.FilterOptions>
          <tableStyles.DataDisplay>
            <tableStyles.TableSearch>
              <tableStyles.TableSearchInput placeholder={"Search..."} value={searchText} onChange={e => setSearchText(e.target.value)} />
              <tableStyles.TableSearchIcon icon={searchIcon} />
            </tableStyles.TableSearch>
            <dashboardStyles.InformationSubHeading>
              Products ({displayData.length})
            </dashboardStyles.InformationSubHeading>
            <tableStyles.Table>
                {displayData.map((product, index) => 
                <tableStyles.TableItemWrapper separateBox={infoBoxDisplays[index]}>
                  <tableStyles.TableItem finalBox={(index + 1 === displayData.length) && infoBoxDisplays[index]} onClick={() => handleOrderInfoBoxToggle(index)} >
                    <styles.ProductStatus status={product.active ? "active" : "inactive"} ><FontAwesomeIcon icon={faCircle} /></styles.ProductStatus>
                    <styles.ProductInfoWrapper>
                      <styles.ProductName>{product.name}</styles.ProductName>
                      <styles.ProductPrettyID>{product.name.toLowerCase().split(' ').join('-')}</styles.ProductPrettyID>
                      <styles.ProductPrice>{formatPrice((product.price * (1-(product.discount/100)))/100)}</styles.ProductPrice>
                    </styles.ProductInfoWrapper>
                    <Link to={`/dashboard/product/${product.productId}`} >
                      <styles.ProductExpand><FontAwesomeIcon icon={faExternalLinkAlt} /></styles.ProductExpand>
                    </Link>
                  </tableStyles.TableItem>
                  {
                    (infoBoxDisplays[index]) ?
                    <tableStyles.ItemInfoBox firstBox={(index === 0)}>
                      <ProductInformation data={product} />
                    </tableStyles.ItemInfoBox> : null
                  }
                  </tableStyles.TableItemWrapper>
                )}
              </tableStyles.Table>
          </tableStyles.DataDisplay>
        </tableStyles.TableWrapper>
      </dashboardStyles.InformationWrapper>
    </>
  )
}

export default ProductListTable;
