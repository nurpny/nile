import React, {useState} from 'react'
import Login from './login'

import Logout from './logout'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import BooksNav from './BooksNav'

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
  min-width: 30%;
  img {
    width: 40px;
    height: 40px;
  }
`

const url = process.env.URL || "http://localhost:8000/"

export function nav(props) {
  const [showLogin, toggleLogin] = useState(false);
  const [showBooks, toggleBooks] = useState(false);
  return (
    <div>
    <StyledNav>
      <StyledTitle>
      nile
      </StyledTitle>
      <StyledSubNav>
      {<div onClick={()=> toggleBooks(!showBooks)}>Books</div>}
      {<div onClick={()=> toggleLogin(!showLogin)}>My Account</div>}
      {props.user.id && <Logout/>}
      <Link to = "/cart"><img src = {url+"/images/shoppingCart.png"}/></Link>
      </StyledSubNav>
    </StyledNav>
    {!props.user.id && showLogin && <Login/>}
    {!props.user.id && showBooks && <BooksNav/>}

    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})



export default connect(mapStateToProps)(nav)
