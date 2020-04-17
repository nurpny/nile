import React from 'react'
import Login from './login'
import Logout from './logout'
import { connect } from 'react-redux'

export function nav(props) {
  return (
    <div>
      {!props.user.id && <Login/>}
      {props.user.id && <Logout/>}
    </div>
  )
}


const mapStateToProps = (state) => ({
  user: state.user
})



export default connect(mapStateToProps)(nav)
