import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { PaperClipOutlined } from '@ant-design/icons'
import { UserContext } from '../context/UserContext'
import { server } from '../config/axios'

const PaymentContent = () => {
  const history = useHistory()
  const [state] = useContext(UserContext)
  const [input, setInput] = useState({ rec: '', attache: '' })
  const [preview, setPreview] = useState()
  const [error, setError] = useState('')
  const [send, setSend] = useState('')

  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: (e.target.type === 'file') ? e.target.files[0] : e.target.value
    })
    if (e.target.type === 'file') {
      const url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }

  const generateData = () => {
    const status = 'pending'
    const date = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const startDate = `${date}/${(month + 1)}/${year}`
    const dueDate = `${date}/${(month + 2)}/${year}`
    if(!input.attache) throw new Error('attache image empty')
    const form = new FormData()
    form.append('imageFile', input.attache, input.attache.name)
    form.append('startDate', startDate)
    form.append('dueDate', dueDate)
    form.append('userId', state.user.id)
    form.append('status', status)
    return form
  }

  const onSubmitPayment = async (e) => {
    e.preventDefault()
    try {
      setSend('sending data...')
      const form = generateData()
      const res = await server.post('/transaction', form)
      if (res?.data.status === 'success') setError('Data send complete')
      history.go(0)
    } catch (error) {
      setError(error.message)
    } finally {
      setInput({ rec: '', attache: '' })
      setTimeout(() => setError(''), 5000)
      setSend('')
      setPreview(null)
    }
  }

  return (
    <main className="pay-wrapper">
      <h1 className="pay-title">Premium</h1>
      <p className="pay-description">
        Bayar sekarang dan nikmati streaming music yang kekinian dari <span className="DUMB">DUMB</span><span className="SOUND">SOUND</span> <span className="DUMB">DUMB</span><span className="SOUND">SOUND : 0981312323</span>
      </p>
      <form onSubmit={ onSubmitPayment } className="form-payment">
        { error && <p className="error-message" style={{ width: '50%' }}>{ error }</p> }
        <div className="form-group-payment">
          <input type="number" name="rec" value={ input.rec } onChange={ onChangeInput } required="on" />
        </div>
        <div className="form-group-payment form-attached-image">
          <label>
            Attache proof of transfer
            <input type="file" name="attache" onChange={ onChangeInput } />
            <PaperClipOutlined className="form-clip-icon" />
          </label>
        </div>
        { preview && <img src={ preview } className="form-image-preview" alt="preview-pict" /> }
        <div className="form-group-payment">
          <button type="submit">{ send? send : 'Send' }</button>
        </div>
      </form>
    </main>
  )
}

export default PaymentContent
