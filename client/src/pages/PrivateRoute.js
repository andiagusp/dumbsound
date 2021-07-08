import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Transaction from './Transaction'
import Logout from './Logout'

const PrivateRoute = () => {
  return (
    <div>
      <Switch>
        <Route path="/logout" component={ Logout } />
        <Route path="/transaction" component={ Transaction } />
        <Route path="/" component={ Home } />
      </Switch>
    </div>
  )
}

export default PrivateRoute
