import React from 'react'

const LoginModal = ({ visibleLoginModal, setVisibleLoginModal }) => {
  const onClickLogin = () => setVisibleLoginModal(!visibleLoginModal)

  return visibleLoginModal && (
    <div className="lp-modal">
      <div className="overlay" onClick={ onClickLogin } />
      <section className="lp-modal-content-login">
        
      </section>
    </div>
  )
}

export default LoginModal
