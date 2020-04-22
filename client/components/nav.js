import React from 'react'
import Login from './login'
import Logout from './logout'
import { connect } from 'react-redux'
import styled from 'styled-components'

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
export function nav(props) {
  return (
    <StyledNav>
      <StyledTitle>
      nile
      </StyledTitle>
      <div>
      {!props.user.id && <Login/>}
      {props.user.id && <Logout/>}
      </div>
    </StyledNav>
  )
}


const mapStateToProps = (state) => ({
  user: state.user
})



export default connect(mapStateToProps)(nav)
