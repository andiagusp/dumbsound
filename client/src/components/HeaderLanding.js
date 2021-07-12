import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import DropdownHeader from './DropdownHeader'
import { UserContext } from '../context/UserContext'
import Dumbsound from '../image/dumbsound.png'
import LogoShapes from '../image/logo-shapes.png'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import ProfileImage from '../image/profile-img.png'

const HeaderLanding = () => {
  const history = useHistory()
  const [show, setShow] = useState(false)
  const [state] = useContext(UserContext)
  const [visibleLoginModal, setVisibleLoginModal] = useState(false)
  const [visibleRegisterModal, setVisibleRegisterModal] = useState(false)

  const onClickLogin = () => setVisibleLoginModal(!visibleLoginModal)
  const onClickRegister = () => setVisibleRegisterModal(!visibleRegisterModal)
  const onClickShow = () => setShow(!show)

  return (
    <header className="lp-header">
      <nav className="lp-nav">
        <section className="lp-icon">
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
        {
          (state.isLogin) ?
          <section className="lp-btn-group">
            <img src={ ProfileImage } alt="profile-pic" onClick={ onClickShow }/>
            <DropdownHeader show={ show } setShow={ setShow } context={ state } />
          </section>
          :
          <section className="lp-btn-group">
            <button type="button" className="lp-btn-login" onClick={ onClickLogin }>Login</button>
            <button type="button" className="lp-btn-register" onClick={ onClickRegister }>Register</button>
          </section>
        }
      </nav>

      <section className="lp-text-jumbotron">
        <p className="lp-text-title">Connect To DumbSound</p>
        <p className="lp-text-second">Discovery, Stream, and share a constantly expanding mix of music</p>
        <p className="lp-text-second">from emerging and major artists around the world</p>
      </section>
    </header>
  )
}

export default HeaderLanding
