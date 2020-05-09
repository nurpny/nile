import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gettingCart } from '../store/cart'
import styled from 'styled-components'
import { StyledContainer, StyledLeftContainer, StyledRightContainer, StyledFlexContainer} from '../themes/StyledContainer'
import { updatingGrossTot } from '../store/order'


const StyledCartTitle = styled.section`
  font-family: ${props => props.theme.fonts.bookTitleFt};
  font-size: 1.0rem;
`


const StyledItemContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  margin-top: 10px;
`
const StyledBookImg = styled.img`
  height: 150px;
  width: 120px;
`

export class Cart extends Component {
  constructor(props) {
    super();
    this.state = {subtotal:0};
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.onLoadCart()
    this.setState( {subtotal: this.props.cart.reduce((acc, item) => acc += item.quantity * item.price, 0)})
  }

  async onSubmit(evt) {
    evt.preventDefault();
    await this.props.onSubmit(this.props.cart[0].orderId, this.state.subtotal);
    this.props.history.push('/checkout')
  }

  render() {
    return (
      <StyledFlexContainer>
        <StyledLeftContainer>
          <StyledCartTitle>Shopping Cart</StyledCartTitle>
          {this.props.cart.map(cartItem =>
            < StyledItemContainer key={cartItem.bookId} >
              <StyledBookImg src={cartItem.book.imageUrl} />
              <div>{cartItem.book.title}</div>
              <div>x {cartItem.quantity}</div>
              <div>$ {cartItem.price/100}</div>
            </ StyledItemContainer>
          )}

        </StyledLeftContainer>
        <StyledRightContainer>
          <StyledCartTitle>Subtotal:
            $ {this.state.subtotal/100}
            <button type="submit" onClick={this.onSubmit}>Click To Pay</button>
          </StyledCartTitle>
        </StyledRightContainer>

      </StyledFlexContainer >
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  onLoadCart: () => dispatch(gettingCart()),
  onSubmit: (orderId, subtotal) => dispatch(updatingGrossTot(orderId, subtotal))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
