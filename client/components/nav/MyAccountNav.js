import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledNavContainer, StyledNavInnerContainer } from '../../themes/StyledNavBox'
import Logout from '../logout'

const StyledLoginContainer = styled(StyledNavContainer)`

`

export const MyAccountNav = (props) => {
  return (
    <StyledLoginContainer>
      <StyledNavInnerContainer>
      <Link to="/MyAccount"><div>Go to My Account</div></Link>
      <Logout/>
      </StyledNavInnerContainer>
    </StyledLoginContainer>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountNav)
