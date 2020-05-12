import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gettingSessionUser } from './store/user'
import { gettingGenres } from './store/genres'
import Nav from './components/nav/Nav'
import AllBooks from './components/AllBooks'
import Routes from './routes'


export class app extends Component {

  componentDidMount() {
    this.props.gettingSessionUser();
    this.props.onLoadGenres();
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
  gettingSessionUser: ()=> dispatch(gettingSessionUser()),
  onLoadGenres: () => dispatch(gettingGenres())
})

export default connect(mapStateToProps, mapDispatchToProps)(app)
