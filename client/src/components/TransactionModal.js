import React from 'react'

const TransactionModal = ({ visibleTransaction, setVisibleTransaction, user }) => {
  const pathImage = 'http://localhost:5000/public/image/'
  const onClickTransaction = () => setVisibleTransaction(!visibleTransaction)

  return visibleTransaction && (
    <div className="t-modal-attache">
      <div className="overlay" onClick={ onClickTransaction } />
      <div className="t-modal-transaction">
        <p className="t-close-button" onClick={ onClickTransaction }>x</p>
        <img src={ pathImage + user.attache } alt="pict-transaction" />
      </div>
    </div>
  )
}

export default TransactionModal
