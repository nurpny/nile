import React, { useState } from 'react'
import Login from './login'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import BooksNav from './BooksNav'
import MyAccountNav from './MyAccountNav'

const url = process.env.NODE_ENV === `production` ? "https://nilebynp.herokuapp.com/" : "http://localhost:8000"

// Styles
const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0px 5px 0px 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`
const StyledTitle = styled.section`
  font-family: ${props => props.theme.fonts.titleFt};
  font-size: 1.5rem;
`

const StyledSubNav = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  width: 400px;
  @media only screen and (max-width: 600px) {
  width: 250px;
}
`

const StyledCart = styled(Link)`
  background-image: url(${url}/images/shoppingCart.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  padding: 25px 0px 0px 35px;
  color: black;
  text-decoration: none;
  &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: black;
  }

`




export function nav(props) {
  const [showLogin, toggleLogin] = useState(false);
  const [showBooks, toggleBooks] = useState(false);
  const cartTotal = props.cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
  return (
    <div>
      <StyledNav>
        <StyledTitle>
          nile
      </StyledTitle>
        <StyledSubNav>
          {<div onClick={() => toggleBooks(!showBooks)}>Books</div>}
          {<div onClick={() => toggleLogin(!showLogin)}>My Account</div>}
          <StyledCart to="/cart">{props.cart? cartTotal: 0}</StyledCart>
        </StyledSubNav>
      </StyledNav>
      {!props.user.id && showLogin && <Login />}
      {props.user.id && showLogin && <MyAccountNav />}
      {showBooks && <BooksNav />}

    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
})



export default connect(mapStateToProps)(nav)
