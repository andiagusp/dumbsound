import React from 'react'

const LoginModal = ({ visibleLoginModal, setVisibleLoginModal }) => {
  const onClickLogin = () => setVisibleLoginModal(!visibleLoginModal)
  const onSubmitLogin = (e) => e.preventDefault()
  const onClickRegister = () => console.log(1)

  return visibleLoginModal && (
    <div className="lp-modal">
      <div className="overlay" onClick={ onClickLogin } />
      <section className="lp-modal-content-login">
        <p className="lp-modal-title">Login</p>
        <form onSubmit={ onSubmitLogin }>
          <div className="form-group-modal">
            <input type="text" placeholder="Email"  />
          </div>
          <div className="form-group-modal">
            <input type="password" placeholder="Password"  />
          </div>
          <div className="form-group-modal">
            <button type="submit">Login</button>
          </div>
        </form>
        <p className="lp-click-here">Don't have an account ? Click <span onClick={ onClickRegister }>Here</span></p>
      </section>
    </div>
  )
}

export default LoginModal
