import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gettingSingleBook } from '../store/singleBook'
import styled from 'styled-components'
import { StyledContainer } from '../themes/StyledContainer'
import { addingToCart } from '../store/cart'
import convertToUSD from '../utils/convertToUSD'

const StyledImg = styled.img`
  max-width: 40vw;
  max-height: 80vh;
  border-radius: 5px;
  @media only screen and (max-width: 800px) {
    width: 100px;
    height: 150px;
  }
`
const StyledBookContainer = styled(StyledContainer)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  align-items: stretch;
  margin: 10px 50px;
  @media only screen and (max-width: 800px) {
    flex-wrap: wrap;
    margin: 10px 10px;
  }
`

const StyledBookSubContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 50px;
  justify-content: flex-start;
  @media only screen and (max-width: 800px) {
    padding: 10px;
  }
`

const StyledBookTitleContainer = styled.section`
  display: flex;
  flex-direction: row;
  font-size: 1.1rem;
  font-weight: bold;
  justify-content: space-between;
  padding: 50px;
  font-family: ${props => props.theme.fonts.bookTitleFt};
  @media only screen and (max-width: 800px) {
    padding: 2px;
  }
`

const StyledPriceContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AddToCartButton = styled.button`
  border-radius: 5px;
  background: ${props => props.theme.cartButton};
`

class SingleBook extends Component {

  componentDidMount() {
    this.props.onLoadSingleBook(this.props.match.params.id)
  }

  render() {
    const { id, title, description, imageUrl, authors, price } = this.props.selectedBook
    const orderId = this.props.cart.length > 0 ? this.props.cart[0].orderId : (this.props.order.id ? this.props.order.id : null);
    return (
      <StyledBookContainer>
        <StyledImg src={imageUrl} />
        <StyledBookSubContainer>
          <StyledBookTitleContainer>
            <div>
              <div>{title}</div>
              <div>By {authors && authors.reduce((acc, author, idx) => idx == 0 ? `${author.firstName} ${author.lastName}` : `${acc} & ${author.firstName} ${author.lastName}`, "")}</div>
            </div>
            <StyledPriceContainer>
              <div> {convertToUSD(price)}</div>
              <AddToCartButton onClick={() => this.props.handleClickAdd(id, price, imageUrl, title, orderId)}>Add to Cart</AddToCartButton>
            </StyledPriceContainer>
          </StyledBookTitleContainer>
          <div>{description}</div>

        </StyledBookSubContainer>

      </StyledBookContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedBook: state.selectedBook,
  cart: state.cart,
  order: state.order,
})

const mapDispatchToProps = (dispatch) => ({
  onLoadSingleBook: (bookId) => dispatch(gettingSingleBook(bookId)),
  handleClickAdd: (bookId, price, imageUrl, title, orderId) => dispatch(addingToCart(bookId, price, imageUrl, title, orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
