import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Dumbsound from '../image/dumbsound.png'
import LogoShapes from '../image/logo-shapes.png'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const Header = () => {
  const history = useHistory()
  const [visibleLoginModal, setVisibleLoginModal] = useState(false)
  const [visibleRegisterModal, setVisibleRegisterModal] = useState(false)

  const onClickLogin = () => setVisibleLoginModal(!visibleLoginModal)
  const onClickRegister = () => setVisibleRegisterModal(!visibleRegisterModal)

  return (
    <header className="lp-header">
      <nav className="lp-nav">
        <section className="lp-icon" onClick={ () => history.push('/')}>
          <img src={ LogoShapes } alt="icon-side" />
          <img src={ Dumbsound } alt="icon-side" />
        </section>

        <LoginModal
          visibleLoginModal={ visibleLoginModal }
          setVisibleLoginModal={ setVisibleLoginModal }
          setVisibleRegisterModal={ setVisibleRegisterModal }
        />
        <RegisterModal
          visibleRegisterModal={ visibleRegisterModal }
          setVisibleRegisterModal={ setVisibleRegisterModal }
          setVisibleLoginModal={ setVisibleLoginModal }
        />
        <section className="lp-btn-group">
          <button type="button" className="lp-btn-login" onClick={ onClickLogin }>Login</button>
          <button type="button" className="lp-btn-register" onClick={ onClickRegister }>Register</button>
        </section>
      </nav>

      <section className="lp-text-jumbotron">
        <p className="lp-text-title">Connect To DumbSound</p>
        <p className="lp-text-second">Discovery, Stream, and share a constantly expanding mix of music</p>
        <p className="lp-text-second">from emerging and major artists around the world</p>
      </section>
    </header>
  )
}

export default Header
