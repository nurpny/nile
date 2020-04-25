import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gettingCart } from '../store/cart'
import styled from 'styled-components'
import StyledContainer from '../themes/StyledContainer'


const StyledFlexContainer = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 80vh;
    min-width: 80vh;
`

const StyledCartContainer = styled(StyledContainer)`
    min-width: 60%;
    max-width: 100%;
    margin: 10px 25px 10px 20px;
    display: flex;
    flex-direction: column;
`
const StyledAmountContainer = styled(StyledContainer)`
    min-width: 30%;
    max-width: 100%;
    margin: 10px 20px 10px 25px;
`

const StyledItemContainer = styled.section`
  display: flex;
  flex-direction: row;
`
const StyledBookImg = styled.img`
  height: 150px;
  width: 120px;
`

export class Cart extends Component {
  componentDidMount() {
    this.props.onLoadCart()
  }
  render() {
    return (
      <StyledFlexContainer>
        <StyledCartContainer>
          <div>Shopping Cart</div>
          {this.props.cart.map(cartItem =>
            < StyledItemContainer key={cartItem.bookId} >
              <StyledBookImg src={cartItem.book.bookImageURL} />
              <div>{cartItem.book.title}</div>
              <div>{cartItem.quantity}</div>
              <div>{cartItem.price/100}</div>
            </ StyledItemContainer>
          )}

        </StyledCartContainer>
        <StyledAmountContainer>

        </StyledAmountContainer>

      </StyledFlexContainer >
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  onLoadCart: () => dispatch(gettingCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
