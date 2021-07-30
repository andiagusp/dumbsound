import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { UserContext } from '../context/UserContext'
import Dumbsound from '../image/dumbsound.png'
import LogoShapes from '../image/logo-shapes.png'
import ProfileImage from '../image/unknow.jpeg'
import DropdownHeader from './DropdownHeader'

const Header = () => {
  const history = useHistory()
  const [show, setShow] = useState(false)
  const [state] = useContext(UserContext)
  console.log(state)
  const onClickShow = () => setShow(!show)

  return (
    <header className="header">
      <section className="header-left" onClick={ () => history.push('/') }>
        <img src={ LogoShapes } alt="header-pict" />
        <img src={ Dumbsound } alt="header-pict" />
      </section>
      <section className="header-right">
        <span className="lp-username">{ state.user.fullName }</span>
        <img src={ ProfileImage } className="profile-picture" onClick={ onClickShow } alt="profile-pic" />
        <DropdownHeader show={ show } setShow={ setShow } context={ state } />
      </section>
    </header>
  )
}

export default Header
