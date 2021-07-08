import { createContext, useReducer } from 'react'

const UserContext = createContext()

const initial = {
  isLogin: false,
  user: {}
}

const reducer = (state, action) => {
  const {type, payload} = action
  switch (type) {
    case 'login':
    case 'login_success':
      return {
        isLogin: true,
        user: payload
      }
    case 'logout':
      return {
        isLogin: false,
        user: {}
      }
    default:
      throw new Error('Failed Create Context')
  }
}

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial)

  return (
    <UserContext.Provider value={ [state, dispatch]  } >
     { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
