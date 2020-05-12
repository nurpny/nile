import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { gettingBooks } from '../store/books'
import { Link } from 'react-router-dom'
import { StyledContainer } from '../themes/StyledContainer'


const StyledBooksContainer = styled(StyledContainer)`
  padding: 10px 30px;
  flex-direction: column;
`

const StyledBooksSubContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const StyledBookContainer = styled.section`
  max-height: 100%;
  max-width: 100%;
  width: 200px;
  height: 250px;
  padding: 10px 20px;
`

const StyledImg = styled.img`
  border-radius: 4px;
  height: 100%;
  width: 100%;
`


class AllBooks extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.onLoadBooks(this.props.match.params.id)
  }

  render() {
    return (
      <StyledBooksContainer>
        <div>{this.props.selectedGenre.name}</div>
        <StyledBooksSubContainer>
          {this.props.books &&
            this.props.books.map(book =>
              <StyledBookContainer key={book.id}>
                <Link to={"/book/" + book.id}><StyledImg src={book.imageUrl} /></Link>
              </StyledBookContainer>)
          }
        </StyledBooksSubContainer>
      </StyledBooksContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  books: state.books,
  selectedGenre: state.selectedGenre
})

const mapDispatchToProps = (dispatch) => ({
  onLoadBooks: (genreId) => dispatch(gettingBooks(genreId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)
