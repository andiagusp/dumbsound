import { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserContext } from '../context/UserContext'


import Home from './Home'
import Music from './Music'
import Logout from './Logout'
import Artists from './Artists'
import Payment from './Payment'
import HomePage from './HomePage'
import Transaction from './Transaction'
import HistoryPayment from './HistoryPayment'

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
        <Route path="/logout" component={ Logout } />
        <Route path="/payment" component={ Payment } />
        <Route path="/history-payment" component={ HistoryPayment } />
        <Route path="/" component={ HomePage } />
      </Switch>
    </div>
  )
}

export default PrivateRoute
