import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as styles from './styles/OrderListTableStyles';
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
  const [orderSearchIcon, setOrderSearchIcon] = useState(faSearch);
  const [displayData, setDisplayData] = useState<OrderSchema[]>([]);
  const [infoBoxDisplays, setInfoBoxDisplays] = useState<boolean[]>([]);
  
  // Filters
  const [orderStatusFilters, setOrderStatusFilters] = useState<OrderStatusFiltersSchema>({
    'active': false,
    'redeemed': false
  });

  const formatDate = (dateStr: string) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
          <styles.OrderListTableWrapper>
            <styles.FilterOptions>
              <styles.FilterHeading>Filters:</styles.FilterHeading>
              <styles.FilterSet>
                <styles.FilterSubheading>Order status:</styles.FilterSubheading>
                <styles.FilterToggle active={orderStatusFilters.active} onClick={() => handleOrderStatusFilters('active')}>
                  {
                  orderStatusFilters.active 
                  ? <><styles.FilterToggleIconLarge icon={faCheckSquare} /><span>Active</span></> 
                  : checkAllFilters(orderStatusFilters) ? 
                  <><styles.FilterToggleIconDefault icon={faCircle} keyColor={'active'} /><span>Active</span></>
                  : <><styles.FilterToggleIconLarge icon={farSquare} /><span>Active</span></> 
                  }
                </styles.FilterToggle>
                <styles.FilterToggle active={orderStatusFilters.redeemed} onClick={() => handleOrderStatusFilters('redeemed')}>
                  {
                    orderStatusFilters.redeemed 
                    ? <><styles.FilterToggleIconLarge icon={faCheckSquare} /> Redeemed</> 
                    : checkAllFilters(orderStatusFilters) ? 
                    <><styles.FilterToggleIconDefault icon={faCircle} keyColor={'redeemed'} /> Redeemed</> 
                    : <><styles.FilterToggleIconLarge icon={farSquare} /> Redeemed</> 
                  }
                </styles.FilterToggle>
              </styles.FilterSet>
            </styles.FilterOptions>
            <styles.Orders>
              <styles.OrderSearch>
                <styles.OrderInput placeholder={"Search..."} value={searchText} onChange={e => setSearchText(e.target.value)} />
                <styles.OrderSearchIcon icon={orderSearchIcon} />
              </styles.OrderSearch>
              <dashboardStyles.InformationSubHeading>
                Orders ({displayData.length})
              </dashboardStyles.InformationSubHeading>
              <styles.OrderTable>
                {displayData.map((order, index) => 
                <styles.OrderItemWrapper separateBox={infoBoxDisplays[index]}>
                  <styles.OrderTableOrder finalBox={(index + 1 === displayData.length) && infoBoxDisplays[index]} onClick={() => handleOrderInfoBoxToggle(index)} >
                    <styles.OrderStatus status={order.redeemed ? "redeemed" : "active"} ><FontAwesomeIcon icon={faCircle} /></styles.OrderStatus>
                    <styles.OrderDate>{formatDate(order.orderDate)}</styles.OrderDate>
                    <styles.OrderInfoWrapper>
                      <styles.OrderName>{order.customerName}</styles.OrderName>
                      <styles.OrderTotalPrice>{formatPrice(totalPrice(order.items))}</styles.OrderTotalPrice>
                    </styles.OrderInfoWrapper>
                    <Link to={`/dashboard/order/${order.orderID}`} >
                      <styles.OrderExpand><FontAwesomeIcon icon={faExternalLinkAlt} /></styles.OrderExpand>
                    </Link>
                  </styles.OrderTableOrder>
                  {
                    (infoBoxDisplays[index]) ?
                    <styles.OrderInfoBox firstBox={(index === 0)}>
                      <OrderInformation data={order} />
                    </styles.OrderInfoBox> : null
                  }
                  </styles.OrderItemWrapper>
                )}
              </styles.OrderTable>
            </styles.Orders>
          </styles.OrderListTableWrapper>
      </dashboardStyles.InformationWrapper>
    </>
  )
}

export default OrderListTable;
