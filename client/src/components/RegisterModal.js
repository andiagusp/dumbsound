import React, { useState, useContext } from 'react'

import { UserContext } from '../context/UserContext'
import { server, setTokenHeaders } from '../config/axios'

import Loading from './Loading'

const RegisterModal = ({ visibleRegisterModal, setVisibleRegisterModal, setVisibleLoginModal }) => {
	const [state, dispatch] = useContext(UserContext)
	const [send, setSend] = useState(false)
	const [error, setError] = useState('')
	
	const onHideRegister = () => setVisibleRegisterModal(!visibleRegisterModal)
	
	const [register, setRegister] = useState({
		fullName: '',
		email: '',
		password: '',
		gender: 'male',
		phone: '',
		address: ''
	})

	const onChangeRegister = (e) => {
		setRegister({
			...register,
			[e.target.name]: e.target.value
		})
	}
	const onClickLogin = () => {
		setVisibleRegisterModal(!visibleRegisterModal)
		setVisibleLoginModal(true)
	}
	const onSubmitRegister = async (e) => {
		e.preventDefault()
		try {
			setSend(true)
			const headers = { headers: { 'Content-Type': 'application/json' } }
			const body = JSON.stringify(register)
			const res = await server.post('/register', body, headers)
			console.log(res)
			saveContext(res)
		} catch (error) {
			if (error.hasOwnProperty('response')) {
				console.log(error.response.data.message)
        setError(error.response.data.message)
      } else {
        console.log(error.message)
      }
		} finally {
			setTimeout(() => setError(''), 5000)
			setSend(false)
		}
	}

	const saveContext = ({ status, data }) => {
		console.log(status, data)
		if (status === 201) {
			dispatch({
				type: 'login_success',
				payload: data.user
			})
			localStorage.setItem('token', data.user.token)
      setTokenHeaders(data.user.token)
		}
		setRegister({ fullName: '', email: '', password: '', gender: 'male', phone: '', address: '' })
	}

	return visibleRegisterModal && (
		<div className="lp-modal">
			<div className="overlay" onClick={ onHideRegister } />
			<div className="lp-modal-content-register">
				<h1 className="lp-modal-title">Register</h1>
				{ error && <p className="error-message">{ error }</p> }
				<form onSubmit={ onSubmitRegister }>
					<div className="form-group-modal">
            <input type="email" placeholder="Email" name="email" value={ register.email } autoComplete="off" required="on" onChange={ onChangeRegister } />
          </div>
          <div className="form-group-modal">
            <input type="password" placeholder="Password" name="password" value={ register.password } autoComplete="off" required="on" onChange={ onChangeRegister } />
          </div>
					<div className="form-group-modal">
            <input type="text" placeholder="Fullname" name="fullName" value={ register.fullName } autoComplete="off" required="on" onChange={ onChangeRegister } />
          </div>
          <div className="form-group-modal">
            <select value={ register.gender } name="gender" onChange={ onChangeRegister } required="on">
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
          </div>
					<div className="form-group-modal">
            <input type="number" placeholder="Phone" name="phone" value={ register.phone } autoComplete="off" required="on" onChange={ onChangeRegister } />
          </div>
					<div className="form-group-modal">
            <textarea cols="10" placeholder="Address" name="address" value={ register.address } autoComplete="off" required="on" onChange={ onChangeRegister }></textarea>
          </div>
					<div className="form-group-modal">
            <button type="submit">
            	{ send ? <span style={{ position: 'relative', left: '48%' }}><Loading  type="spin" color="#eaeaea" width={ 25 } height={ 25 } /></span> : 'Register' }
            </button>
          </div>
				</form>
				<p className="lp-click-here">Already have an account ? Click <span onClick={ onClickLogin }>Here</span></p>
			</div>
		</div>
	)
}

export default RegisterModal
