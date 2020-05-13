import { withRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import AllBooks from './components/AllBooks'
import SingleBook from './components/SingleBook'
import Cart from './components/Cart'
import Signup from './components/Signup'
import Checkout from './components/checkout/Checkout'
import OrderComplete from './components/OrderComplete'
import MyAccount from './components/account/MyAccount'

export default function routes() {
  return (
    <Switch>
      <Route path='/books/:id' component={AllBooks} />
      <Route path='/books' component={AllBooks} />
      <Route path='/book/:id' component={SingleBook} />
      <Route path='/cart' component={Cart} />
      <Route path='/checkout' component={Checkout} />
      <Route path='/signup' component={Signup} />
      <Route path='/MyAccount' component={MyAccount} />
      <Route path='/ordercomplete' component={OrderComplete} />
      <Route path='/' component={AllBooks} />
    </Switch>
  )
}



