import React, { useState, useContext } from 'react'

import { UserContext } from '../context/UserContext'
import { server, setTokenHeaders } from '../config/axios'

const LoginModal = ({ visibleLoginModal, setVisibleLoginModal, setVisibleRegisterModal }) => {
  const [state, dispatch] = useContext(UserContext)
  const [input, setInput] = useState({ email: '', password: '' })
  const [isLoading, setLoading] = useState('')
  const [error, setError] = useState('')
  console.log(state);

  const onHideLogin = () => setVisibleLoginModal(!visibleLoginModal)
  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const onSubmitLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading('Wait ...')
      const res = await server.post('/login', input)
      const token = res.data.user.token
      localStorage.setItem('token', token)
      setTokenHeaders(token)
      dispatch({
				type: 'login_success',
				payload: res?.data.user
			})
      setInput({ email: '', password: '' })
    } catch (error) {
      const e = error?.response.status
      if (e === 401 || e === 400) {
        setError(error?.response.data.message)
      }
      console.log(error?.response)
    } finally {
      setTimeout(() => setError(''), 5000)
      setLoading('')
    }
  }
  const onClickRegister = () => {
    setVisibleLoginModal(!visibleLoginModal)
    setVisibleRegisterModal(true)
  }
  return visibleLoginModal && (
    <div className="lp-modal">
      <div className="overlay" onClick={ onHideLogin } />
      <section className="lp-modal-content-login">
        <h1 className="lp-modal-title">Login</h1>
        { error && <p style={{ fontSize: 18 }}>{ error }</p> }
        <form onSubmit={ onSubmitLogin }>
          <div className="form-group-modal">
            <input type="email" placeholder="Email" name="email" value={ input.email } onChange={ onChangeInput } required="on" />
          </div>
          <div className="form-group-modal">
            <input type="password" placeholder="Password" name="password" value={ input.password } onChange={ onChangeInput } required="on" />
          </div>
          <div className="form-group-modal">
            <button type="submit">{ isLoading? isLoading : 'Login' }</button>
          </div>
        </form>
        <p className="lp-click-here">Don't have an account ? Click <span onClick={ onClickRegister }>Here</span></p>
      </section>
    </div>
  )
}

export default LoginModal
