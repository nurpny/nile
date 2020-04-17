import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gettingSessionUser } from './store/user'
import Nav from './components/nav'

export class app extends Component {

  // componentDidMount() {
  //   this.props.gettingSessionUser()
  // }

  render() {
    return (
      <div>
        <Nav />
        <h2>BOILERPLATE</h2>
      </div>

    )
  }
}


const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  gettingSessionUser: ()=> dispatch(gettingSessionUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(app)
