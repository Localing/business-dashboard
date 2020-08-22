import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as styles from './styles/OrderListTableStyles';
import * as tableStyles from './styles/TableStyles';
import * as dashboardStyles from './../styles/DashboardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircle, faExternalLinkAlt, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle, faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';
import OrderInformation from './OrderInformation';

interface OrderSchema {
  customerName: string,
  customerContact: string,
  orderCode: string, 
  orderID: string,
  orderDate: string,
  redeemed: boolean,
  items: { name: string, quantity: number, price: number, imgUrl: string }[]
}

interface OrderListTableProps {
  data: OrderSchema[]
}

interface OrderStatusFiltersSchema {
  active: boolean,
  redeemed: boolean
}

const OrderListTable:FunctionComponent<OrderListTableProps> = ({ data, ...rest}) => {
  
  const [searchText, setSearchText] = useState<string>('');
  const [searchIcon, setSearchIcon] = useState(faSearch);
  const [displayData, setDisplayData] = useState<OrderSchema[]>([]);
  const [infoBoxDisplays, setInfoBoxDisplays] = useState<boolean[]>([]);
  
  // Filters
  const [orderStatusFilters, setOrderStatusFilters] = useState<OrderStatusFiltersSchema>({
    'active': false,
    'redeemed': false
  });

  const formatDate = (dateStr: string) => {
    const options = { day: 'numeric', month: 'numeric',  year: 'numeric' };
    let date = new Date(0); 
    date.setUTCSeconds(Number(dateStr));
    return date.toLocaleDateString('en-GB', options);
  }

  const formatOrderCode = (code: string) => {
    return code.match(/.{1,3}/g)?.join('-');
  }

  const formatPrice = (price: number):string => {
    return '£' + String(price.toFixed(2));
  }

  const totalPrice = (data: { name: string, quantity: number, price: number, imgUrl: string }[]):number => {
    let total: number = 0;
    data.map( (item: { name: string, quantity: number, price: number, imgUrl: string }) => 
      total += (item.price*item.quantity)
    );
    return total;
  }

  const handleOrderStatusFilters = (filter: keyof OrderStatusFiltersSchema) => {
    setOrderStatusFilters({...orderStatusFilters, [filter]: !orderStatusFilters[filter]});
  }

  const checkAllFilters = (obj: any) => {
    return Object.keys(obj).every((k) => !obj[k]);
  }

  const filterOrders = () => {
    // Search function - filter by customer name, customer contact
    let new_data = data.filter( order => {
      let resp = false;
      if (order.customerName.toLowerCase().replace(/[^a-zA-Z ]/g, "").includes(searchText.toLowerCase().replace(/[^a-zA-Z ]/g, ""))) {
        resp = true;
      }
      if (!checkAllFilters(orderStatusFilters)) {
        if (!(order.redeemed === true && orderStatusFilters.redeemed === true) && !(order.redeemed === false && orderStatusFilters.active === true)) {
          resp = false;
        }
      }
      return resp;
    });

    // Order by date
    new_data.sort((a,b) => (Number(b.orderDate) - Number(a.orderDate)));

    setDisplayData(new_data);
  }

  const handleOrderInfoBoxToggle = (index: number) => {
    let temp_arr = [...infoBoxDisplays];
    temp_arr[index] = !temp_arr[index];
    console.log(temp_arr);
    setInfoBoxDisplays(temp_arr);
  }

  useEffect(() => {
    filterOrders();
    // New data: close all boxes and recreate box array
    let temp_arr: boolean[] = [];
    data.map(() => {temp_arr.push(false)})
    setInfoBoxDisplays(temp_arr);
  }, [data])

  useEffect(() => {    
    filterOrders();

  }, [searchText]);

  useEffect(() => {    
    filterOrders();

  }, [orderStatusFilters]);

  return (
    <>
      <dashboardStyles.InformationWrapper direction={'row'}>
          <tableStyles.TableWrapper>
            <tableStyles.FilterOptions>
              <tableStyles.FilterHeading>Filters:</tableStyles.FilterHeading>
              <tableStyles.FilterSet>
                <tableStyles.FilterSubheading>Order status:</tableStyles.FilterSubheading>
                <tableStyles.FilterToggle active={orderStatusFilters.active} onClick={() => handleOrderStatusFilters('active')}>
                  {
                  orderStatusFilters.active 
                  ? <><tableStyles.FilterToggleIconLarge icon={faCheckSquare} /><span>Active</span></> 
                  : checkAllFilters(orderStatusFilters) ? 
                  <><tableStyles.FilterToggleIconDefault icon={faCircle} keyColor={'active'} /><span>Active</span></>
                  : <><tableStyles.FilterToggleIconLarge icon={farSquare} /><span>Active</span></> 
                  }
                </tableStyles.FilterToggle>
                <tableStyles.FilterToggle active={orderStatusFilters.redeemed} onClick={() => handleOrderStatusFilters('redeemed')}>
                  {
                    orderStatusFilters.redeemed 
                    ? <><tableStyles.FilterToggleIconLarge icon={faCheckSquare} /> Redeemed</> 
                    : checkAllFilters(orderStatusFilters) ? 
                    <><tableStyles.FilterToggleIconDefault icon={faCircle} keyColor={'redeemed'} /> Redeemed</> 
                    : <><tableStyles.FilterToggleIconLarge icon={farSquare} /> Redeemed</> 
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
                Orders ({displayData.length})
              </dashboardStyles.InformationSubHeading>
              <tableStyles.Table>
                {displayData.map((order, index) => 
                <tableStyles.TableItemWrapper separateBox={infoBoxDisplays[index]}>
                  <tableStyles.TableItem finalBox={(index + 1 === displayData.length) && infoBoxDisplays[index]} onClick={() => handleOrderInfoBoxToggle(index)} >
                    <styles.OrderStatus status={order.redeemed ? "redeemed" : "active"} ><FontAwesomeIcon icon={faCircle} /></styles.OrderStatus>
                    <styles.OrderDate>{formatDate(order.orderDate)}</styles.OrderDate>
                    <styles.OrderInfoWrapper>
                      <styles.OrderName>{order.customerName}</styles.OrderName>
                      <styles.OrderTotalPrice>{formatPrice(totalPrice(order.items))}</styles.OrderTotalPrice>
                    </styles.OrderInfoWrapper>
                    <Link to={`/dashboard/order/${order.orderID}`} >
                      <styles.OrderExpand><FontAwesomeIcon icon={faExternalLinkAlt} /></styles.OrderExpand>
                    </Link>
                  </tableStyles.TableItem>
                  {
                    (infoBoxDisplays[index]) ?
                    <tableStyles.ItemInfoBox firstBox={(index === 0)}>
                      <OrderInformation data={order} />
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

export default OrderListTable;
