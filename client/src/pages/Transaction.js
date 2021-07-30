import { useState, useEffect } from 'react'

import { server } from '../config/axios'
import Header from '../components/Header'
import TransactionContent from '../components/TransactionContent'

const Transaction = () => {

  return (
    <div>
      <Header />
      <TransactionContent />
    </div>
  )
}

export default Transaction
