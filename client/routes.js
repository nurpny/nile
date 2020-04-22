import {withRouter, Route, Switch} from 'react-router-dom'
import React from 'react'
import AllBooks from './components/AllBooks'
import SingleBook from './components/SingleBook'
import GenreBooks from './components/GenreBooks'
import FrontPage from './components/FrontPage'



export default function routes() {
  return (
    <Switch>
      <Route path='/books' component={AllBooks} />
      <Route path='/genres/:id' component={GenreBooks} />
      <Route path='/book/:id' component={SingleBook} />
      <Route path='/' component={FrontPage} />
    </Switch>
  )
}


