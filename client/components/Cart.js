import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gettingCart } from '../store/cart'
import styled from 'styled-components'
import { StyledLeftContainer, StyledRightContainer, StyledFlexContainer} from '../themes/StyledContainer'
import { updatingGrossTot } from '../store/order'
import { updatingCart } from '../store/cart'

const StyledCartTitle = styled.section`
  font-family: ${props => props.theme.fonts.bookTitleFt};
  font-size: 1.0rem;
`

const StyledQuantSpan = styled.span`
  color: ${props => props.theme.colors.red};
  font-size: 1.1rem;
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
const StyledButton = styled.button`
  border-radius: 5px;
  background: ${props => props.theme.cartButton};
  width: 100px;
`

export class Cart extends Component {
  constructor(props) {
    super();
    this.state = {subtotal:0};
    this.onSubmit = this.onSubmit.bind(this)
    this.onClick = this.onClick.bind(this)
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

  async onClick(orderId, bookId, quantity, direction, imageUrl, title) {
    await this.props.onClick(orderId, bookId, quantity, direction, imageUrl, title)
    this.setState( {subtotal: this.props.cart.reduce((acc, item) => acc += item.quantity * item.price, 0)})
  }


  render() {
    return (
      <StyledFlexContainer>
        <StyledLeftContainer>
          <StyledCartTitle>Shopping Cart</StyledCartTitle>
            <StyledItemContainer>
              <div></div>
              <div>Title</div>
              <div>Quantity</div>
              <div>Price</div>
            </StyledItemContainer>
          {this.props.cart.map(cartItem =>
            < StyledItemContainer key={cartItem.bookId} >
              <StyledBookImg src={cartItem.book.imageUrl} />
              <div>{cartItem.book.title}</div>
              <div>
                <StyledQuantSpan onClick={() => this.onClick(cartItem.orderId, cartItem.bookId, cartItem.quantity, "minus", cartItem.book.imageUrl, cartItem.book.title)}> {String.fromCharCode(8595)} </StyledQuantSpan>
                x {cartItem.quantity}
                <StyledQuantSpan onClick={() => this.onClick(cartItem.orderId, cartItem.bookId, cartItem.quantity, "plus", cartItem.book.imageUrl, cartItem.book.title)}> {String.fromCharCode(8593)}  </StyledQuantSpan>
              </div>
              <div>$ {cartItem.price/100}</div>
            </ StyledItemContainer>
          )}

        </StyledLeftContainer>
        <StyledRightContainer>
          <StyledCartTitle>
            <div>Subtotal: $ {this.state.subtotal/100} </div>
            <StyledButton type="submit" onClick={this.onSubmit}>Click To Pay</StyledButton>
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
  onSubmit: (orderId, subtotal) => dispatch(updatingGrossTot(orderId, subtotal)),
  onClick: (orderId, bookId, currQuant, direction, imageUrl, title) => dispatch(updatingCart(orderId, bookId, currQuant, direction, imageUrl, title))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
