import React, { useState, useContext } from 'react'

import { server, setTokenHeaders } from '../config/axios'
import { UserContext } from '../context/UserContext'

const RegisterModal = ({ visibleRegisterModal, setVisibleRegisterModal, setVisibleLoginModal }) => {
	const [state, dispatch] = useContext(UserContext)
	const [send, setSend] = useState('')
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
			setSend('sending data...')
			const headers = { headers: { 'Content-Type': 'application/json' } }
			const body = JSON.stringify(register)
			const res = await server.post('/register', body, headers)
			saveContext(res)
		} catch (error) {
			const e = error?.response.status
      if (e === 401 || e === 400) {
        setError(error?.response.data.message)
      }
      console.log(error?.response)
		} finally {
			setTimeout(() => setError(''), 5000)
			setSend('')
		}
	}

	const saveContext = ({ status, data }) => {
		if (status === 201) {
			dispatch({
				type: 'login_success',
				payload: data.user
			})
			localStorage.setItem('token', data.token)
      setTokenHeaders(data.token)
		}
		setRegister({ fullName: '', email: '', password: '', gender: 'male', phone: '', address: '' })
	}

	return visibleRegisterModal && (
		<div className="lp-modal">
			<div className="overlay" onClick={ onHideRegister } />
			<div className="lp-modal-content-register">
				<h1 className="lp-modal-title">Register</h1>
				{ error && <p style={{ fontSize: 20, color: '#fff' }}></p> }
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
            <button type="submit">{ send ? send : 'Register' }</button>
          </div>
				</form>
				<p className="lp-click-here">Already have an account ? Click <span onClick={ onClickLogin }>Here</span></p>
			</div>
		</div>
	)
}

export default RegisterModal
