import React from 'react'
import { useHistory } from 'react-router-dom'

import { IoIosLogOut } from 'react-icons/io'
import { BsListCheck } from 'react-icons/bs'

import PayIcon from '../image/pay.png'
import ArtistIcon from '../image/art-icon.png'
import MusicIcon from '../image/music-icon.png'

const DropdownHeader = ({ show, setShow, context: { user } }) => {
  const history = useHistory()
	return show && (
		<div  className="dropdownheader">
		{ (user.status === "0") &&
			<section className="dd-route">
				<div className="dd-route-group">
					<img src={ PayIcon } alt="route-pict" className="dd-icon" onClick={ () => history.push('/payment') } />
					<span onClick={ () => history.push('/payment') }>Pay</span>
				</div>
				<div className="dd-route-group">
					<BsListCheck className="dd-icon" onClick={ () => history.push('/history-payment') } />
					<span onClick={ () => history.push('/history-payment') }>List Transaction</span>
				</div>
			</section>
		}
		{ (user.status === "1") &&
			<section className="dd-route">
				<div className="dd-route-group">
					<img src={ MusicIcon } alt="route-pict" className="dd-icon" onClick={ () => history.push('/music') } />
					<span onClick={ () => history.push('/music') }>Add Music</span>
				</div>
				<div className="dd-route-group">
					<img src={ ArtistIcon } alt="route-pict" className="dd-icon" onClick={ () => history.push('/artist') } />
					<span onClick={ () => history.push('/artist') }>Add Artist</span>
				</div>
				<div className="dd-route-group">
					<img src={ PayIcon } alt="route-pict" className="dd-icon" onClick={ () => history.push('/transaction') } />
					<span onClick={ () => history.push('/transaction') }>Transaction</span>
				</div>
			</section>
		}
			<hr className="dd-divider" />
			<section className="dd-logout" >
				<IoIosLogOut className="dd-icon" onClick={ () => history.push('/logout') } />
				<span onClick={ () => history.push('/logout') } >Logout</span>
			</section>
		</div>
	)
}

export default DropdownHeader
