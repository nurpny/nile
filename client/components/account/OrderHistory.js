import React, { useState, useEffect } from 'react'
import { StyledContainer } from '../../themes/StyledContainer'
import styled from 'styled-components';
import axios from 'axios';
import convertToUSD from '../../utils/convertToUSD'

const OrderRow = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr) 2fr repeat(7, 1fr);
`
const StyledOrderContainer = styled(StyledContainer)`
  flex-direction: column;
`;


const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios('/api/orderhistory');
      setOrderHistory(result.data)
    }
    fetchData();
  }, []);

  return (
    <StyledOrderContainer>
      <h3>Order History</h3>
      <OrderRow>
        <div>Order Number</div>
        <div>Date Completed</div>
        <div>Address</div>
        <div>City</div>
        <div>State</div>
        <div>ZipCode</div>
        <div>Gross Cost</div>
        <div>Shipping Cost</div>
        <div>Tax</div>
        <div>Total</div>
      </OrderRow>
      <div>
      {orderHistory.length &&
        orderHistory.map(order =>
          <OrderRow key={order.id}>
            <div>{order.id}</div>
            <div>{(order.dateCompleted.slice(0, 10))}</div>
            <div>{order.shippingAddress}</div>
            <div>{order.shippingCity}</div>
            <div>{order.shippingState}</div>
            <div>{order.zipCode}</div>
            <div>{convertToUSD(order.grossCost)}</div>
            <div>{convertToUSD(order.shippingCost)}</div>
            <div>{convertToUSD(order.tax)}</div>
            <div>{convertToUSD(order.total)}</div>
          </OrderRow>)}
        </div>
    </StyledOrderContainer>
  )
}

export default OrderHistory;
