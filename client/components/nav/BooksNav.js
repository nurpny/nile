import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyledNavContainer, StyledNavInnerContainer } from '../../themes/StyledNavBox'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getSingleGenre } from '../../store/singleGenre'
import { gettingBooks } from '../../store/books'

const StyledBookNavContainer = styled(StyledNavContainer)`
  right: 250px;
  @media screen and (max-width: 600px) {
    right: 100px;
  }
`

export const BooksNav = (props) => {

  return (
    <StyledBookNavContainer>
      <StyledNavInnerContainer>
        <Link to="/books">
          <div onClick={() => {
            props.onClick()
            props.onClickSelectGenre()
          }}>
            All Books
          </div>
        </Link>
        <div>{"\n"}</div>
        <div> Books by Category </div>
        {props.genres &&
          props.genres.map(genre =>
            <div key={genre.id} onClick={() => {
              props.onClickSelectGenre(genre.id, genre.name)
              props.onClick(genre.id)
            }}>
              <Link to={"/books/" + genre.id}>{genre.name}</Link>
            </div>)}
      </StyledNavInnerContainer>

    </StyledBookNavContainer >
  )
}


const mapStateToProps = (state) => ({
  genres: state.genres
})

const mapDispatchToProps = (dispatch) => ({
  onClick: (genreId) => {
    dispatch(gettingBooks(genreId))
  },
  onClickSelectGenre: (genreId, genre) => dispatch(getSingleGenre(genreId, genre))
})


export default connect(mapStateToProps, mapDispatchToProps)(BooksNav)
