import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gettingSessionUser } from './store/user'
import Nav from './components/nav'
import AllBooks from './components/AllBooks'
import Routes from './routes'


export class app extends Component {

  componentDidMount() {
    this.props.gettingSessionUser()
  }

  render() {
    return (
      <div>

        <Nav />
        <Routes />

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
