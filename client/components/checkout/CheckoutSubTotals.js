import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { StyledRightContainer } from '../../themes/StyledContainer'
import convertToUSD from '../../utils/convertToUSD'

const StyledTotalsContainer = styled(StyledRightContainer)`
  font-family: ${props => props.theme.fonts.bookTitleFt};
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  row-gap: 15px;
  align-items: center;

`

export const CheckoutSubTotals = (props) => {
  return (
    <StyledTotalsContainer>
      <div> Subtotal: </div>
      <div> {convertToUSD(props.order.grossCost)} </div>
      <div> Shipping:  </div>
      <div> {convertToUSD(props.order.shippingCost)}</div>
      <div> Taxes: </div>
      <div> {convertToUSD(props.order.tax)} </div>
      <div> Total:  </div>
      <div> {convertToUSD(props.order.total)} </div>
    </StyledTotalsContainer>
  )
}


const mapStateToProps = (state) => ({
  order: state.order,
})

export default connect(mapStateToProps)(CheckoutSubTotals)
