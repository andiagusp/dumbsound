import React from 'react'
import { useHistory } from 'react-router-dom'

import Dumbsound from '../image/dumbsound.png'
import LogoShapes from '../image/logo-shapes.png'
import ProfileImage from '../image/profile-img.png'

const Header = () => {
  const history = useHistory()

  return (
    <header className="pay-header">
      <section className="pay-header-left" onClick={ () => history.push('/') }>
        <img src={ LogoShapes } alt="header-pict" />
        <img src={ Dumbsound } alt="header-pict" />
      </section>
      <section className="pay-header-right">
        <img src={ ProfileImage } alt="profile-pic" onClick={ () => history.push('/logout') }/>
      </section>
    </header>
  )
}

export default Header
