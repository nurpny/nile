import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyAccountDetails from './MyAccountDetails'
import OrderHistory from './OrderHistory'

function MyAccount(props) {
  return (
    <div>
      <MyAccountDetails/>
      <OrderHistory/>
    </div>
  )
}


const mapStateToProps = (state) => ({
  user: state.user

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
