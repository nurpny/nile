import React, { Component } from 'react'
import { connect } from 'react-redux'
import StyledNavBox from '../themes/StyledNavBox'
import styled from 'styled-components'
import { gettingGenres } from '../store/genres'
import {Link} from 'react-router-dom'

const StyledBookNavContainer = styled(StyledNavBox)`
  right: 250px;
  @media screen and (max-width: 600px) {
    right: 100px;
  }
`

const StyledBookNavInnerContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.light};
  border-radius: 2px;
  padding: 10px;
`

export class BooksNav extends Component {
  componentDidMount() {
    this.props.onLoadGenres()
  }

  render() {
    console.log(this.props);


    return (
      <StyledBookNavContainer>
      <StyledBookNavInnerContainer>
        <Link to="/books"><div>All Books</div></Link>
        <div>{"\n"}</div>
        <div> Books by Category </div>
        {this.props.genres && this.props.genres.map(genre => <div key={genre.id}>{genre.name}</div>)}
        </StyledBookNavInnerContainer>

      </StyledBookNavContainer>
    )
  }
}


const mapStateToProps = (state) => ({
  genres: state.genres
})

const mapDispatchToProps = (dispatch) => ({
  onLoadGenres: () => dispatch(gettingGenres())
})

export default connect(mapStateToProps, mapDispatchToProps)(BooksNav)
