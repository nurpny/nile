import {withRouter, Route, Switch} from 'react-router-dom'
import React from 'react'
import AllBooks from './components/AllBooks'
import SingleBook from './components/SingleBook'
import GenreBooks from './components/GenreBooks'
import FrontPage from './components/FrontPage'
import Cart from './components/Cart'
import Signup from './components/Signup'

export default function routes() {
  return (
    <Switch>
      <Route path='/books/:id' component={AllBooks} />
      <Route path='/books' component={AllBooks} />
      <Route path='/book/:id' component={SingleBook} />
      <Route path='/cart' component={Cart} />
      <Route path='/signup' component={Signup} />
      <Route path='/' component={FrontPage} />
    </Switch>
  )
}



