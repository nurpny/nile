import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loggingOut } from '../store/user'

export const logout = (props) => {
  return (
    <div>
      <button onClick={props.loggingOut}>Logout</button>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  loggingOut: () => (dispatch(loggingOut()))
})

export default connect(mapStateToProps, mapDispatchToProps)(logout)
