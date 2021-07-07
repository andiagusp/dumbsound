import React, { useState } from 'react'

import Dumbsound from '../image/dumbsound.png'
import LogoShapes from '../image/logo-shapes.png'
import LoginModal from './LoginModal'

const Header = () => {
  const [visibleLoginModal, setVisibleLoginModal] = useState(false)

  const onClickLogin = () => setVisibleLoginModal(!visibleLoginModal)

  return (
    <header className="lp-header">
      <nav className="lp-nav">
        <section className="lp-icon">
          <img src={ LogoShapes } alt="icon-side" />
          <img src={ Dumbsound } alt="icon-side" />
        </section>

        <LoginModal visibleLoginModal={ visibleLoginModal } setVisibleLoginModal={ setVisibleLoginModal } />
        <section className="lp-btn-group">
          <button type="button" className="lp-btn-login" onClick={ onClickLogin }>Login</button>
          <button type="button" className="lp-btn-register">Register</button>
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
