import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import HomePage from './HomePage'
import Transaction from './Transaction'
import Payment from './Payment'
import Logout from './Logout'
import Artists from './Artists'
import Music from './Music'

const PrivateRouteAdmin = () => {
	return (
		<div>
			<Route path="/music" component={ Music } />
      <Route path="/artist" component={ Artists } />
      <Route path="/transaction" component={ Transaction } />
      <Route path="/logout" component={ Logout } />
      <Route path="/" component={ HomePage } />
		</div>
	)
}

export default PrivateRouteAdmin