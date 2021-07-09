import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import HomePage from './HomePage'
import Transaction from './Transaction'
import Logout from './Logout'
import Payment from './Payment'

const PrivateRoute = () => {
  return (
    <div>
      <Switch>
        <Route path="/payment" component={ Payment } />
        <Route path="/logout" component={ Logout } />
        <Route path="/transaction" component={ Transaction } />
        <Route path="/" component={ HomePage } />
      </Switch>
    </div>
  )
}

export default PrivateRoute
