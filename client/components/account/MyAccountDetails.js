import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyledContainer } from '../../themes/StyledContainer'
import styled from 'styled-components';
import Logout from '../logout'

const StyledAcctContainer = styled(StyledContainer)`
  flex-direction: column;

`

function MyAccount(props) {
  return (
    <StyledAcctContainer>
      <h3>User Information</h3>
      <div>User name: {props.user.firstName} {props.user.lastName}</div>
      <div>User email: {props.user.email}</div>
      <div><Logout/></div>
    </StyledAcctContainer>
  )
}


const mapStateToProps = (state) => ({
  user: state.user

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
