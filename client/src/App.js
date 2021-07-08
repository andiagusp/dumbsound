import { useContext, useEffect } from 'react'
import { BrowserRouter as BR, Switch, Route } from 'react-router-dom'

import { UserContext, UserContextProvider } from './context/UserContext'
import Home from './pages/Home'
import PrivateRoute from './pages/PrivateRoute'
import { server, setTokenHeaders } from './config/axios'

if (localStorage.getItem('token')) setTokenHeaders(localStorage.getItem('token'))

const Apps = () => {
  const [state, dispatch] = useContext(UserContext)

  const cekAuthorization = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await server.get('/authorization')
      dispatch({
        type: 'login',
        payload: { ...res?.data.user, token }
      })
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch({
          type: 'logout',
          payload: {}
        })
      }
    }
  }
  useEffect(() => {
    cekAuthorization()
  }, [])

  return (
    <Switch>
    { state.isLogin ?
      <Route path="/" component={ PrivateRoute } />
      :
      <Route path="/*" component={ Home } />
    }
    </Switch>
  )
}

export default function App() {
  return (
    <UserContextProvider>
      <BR>
        <Apps />
      </BR>
    </UserContextProvider>
  )
}
