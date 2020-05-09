import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { StyledRightContainer } from '../themes/StyledContainer'

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
      <div>$ {props.order.grossCost / 100} </div>
      <div> Shipping:  </div>
      <div>$ {props.order.shippingCost / 100}</div>
      <div> Taxes: </div>
      <div> $ {props.order.tax / 100} </div>
      <div> Total:  </div>
      <div> $ {props.order.total / 100} </div>
    </StyledTotalsContainer>
  )
}


const mapStateToProps = (state) => ({
  order: state.order,
})

export default connect(mapStateToProps)(CheckoutSubTotals)
