import { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserContext } from '../context/UserContext'


import Home from './Home'
import HomePage from './HomePage'
import Transaction from './Transaction'
import Payment from './Payment'
import Logout from './Logout'
import Artists from './Artists'
import Music from './Music'

import PrivateRouteAdmin from './PrivateRouteAdmin'

const PrivateRoute = () => {
  const [state, dispatch] = useContext(UserContext)

  return (
    <div>
      <Switch>
        { (state.user.status === '1') && <>
          <Route path="/music" component={ Music } />
          <Route path="/artist" component={ Artists } />
          <Route path="/transaction" component={ Transaction } />
          <Route path="/logout" component={ Logout } />
          <Route path="/" exact component={ HomePage } />
          </>
        }
        <Route path="/payment" component={ Payment } />
        <Route path="/logout" component={ Logout } />
        <Route path="/" component={ HomePage } />
      </Switch>
    </div>
  )
}

export default PrivateRoute
