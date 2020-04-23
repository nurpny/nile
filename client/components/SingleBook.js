import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gettingSingleBook } from '../store/singleBook'
import styled from 'styled-components'
import StyledContainer from '../themes/StyledContainer'
import { addingToCart } from '../store/cart'

const StyledImg = styled.img`
  max-width: 40vw;
  max-height: 80vh;
  border-radius: 5px;
`
const StyledBookContainer = styled(StyledContainer)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  align-items: stretch;
  margin: 10px 50px;
`

const StyledBookSubContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 50px;
  justify-content: flex-start;
`

const StyledBookTitleContainer = styled.section`
  display: flex;
  flex-direction: row;
  font-size: 1.1rem;
  font-weight: bold;
  justify-content: space-between;
  padding: 50px;
  font-family: ${props => props.theme.fonts.bookTitleFt};
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
    const { id, title, description, bookImageURL, authors, price } = this.props.selectedBook
    return (
      <StyledBookContainer>
        <StyledImg src={bookImageURL}/>
        <StyledBookSubContainer>
          <StyledBookTitleContainer>
            <div>
              <div>{title}</div>
              <div>By {authors && authors.reduce((acc, author, idx) => idx == 0 ? `${author.firstName} ${author.lastName}` : `${acc} & ${author.firstName} ${author.lastName}`, "")}</div>
            </div>
            <div>
              <div>${price / 100}</div>
              <AddToCartButton onClick = {() => this.props.handleClickAdd(id, price)}>Add to Cart</AddToCartButton>
            </div>
          </StyledBookTitleContainer>
          <div>{description}</div>

        </StyledBookSubContainer>

      </StyledBookContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedBook: state.selectedBook
})

const mapDispatchToProps = (dispatch) => ({
  onLoadSingleBook: (bookId) => dispatch(gettingSingleBook(bookId)),
  handleClickAdd: (bookId, price) => dispatch(addingToCart(bookId, price))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
