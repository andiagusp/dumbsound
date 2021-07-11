import { useState } from 'react'

import { server } from '../config/axios'

const ArtistContent = () => {
  const [send, setSend] = useState('')
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
  const [input, setInput] = useState({
    name: '', old: '', type: 'Solo', startCareer: ''
  })

  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const onSubmitArtist = async (e) => {
    try {
      e.preventDefault()
      setSend('saving data...')
      const body = JSON.stringify(input)
      const config = { headers: { 'Content-Type': 'application/json' } }
      console.log(body);
      const res = await server.post('/artist', body, config)
      setSuccess('Success Add Artist')
    } catch (error) {
      const e = error?.response.status
      if (e === 500) {
        setError('internal server error')
      }
      if (e === 401 || e === 400) {
        setError(error?.response.data.message)
      }
      console.log(error?.response)
    } finally {
      setTimeout(() => setError(''), 5000)
      setTimeout(() => setSuccess(''), 5000)
			setSend('')
    }
  }

  return (
    <div className="artists">
      <h2 className="a-title">Add Artist</h2>
      { error && <h3 className="error-message">{ error }</h3> }
      { success && <h3 className="error-message">{ success }</h3> }
      <form onSubmit={ onSubmitArtist }>
        <div className="form-group-artist">
          <input type="text" placeholder="Name" onChange={ onChangeInput } value={ input.name } name="name"required="on" />
        </div>
        <div className="form-group-artist">
          <input type="number" placeholder="Old" onChange={ onChangeInput } value={ input.old } name="old" required="on" />
        </div>
        <div className="form-group-artist">
          <select name="type" onChange={ onChangeInput } value={ input.type } required="on">
            <option value="Solo">Solo</option>
            <option value="Band">Band</option>
          </select>
        </div>
        <div className="form-group-artist">
          <input type="text" name="startCareer" onChange={ onChangeInput } value={ input.startCareer } placeholder="Start a carerr" required="on" />
        </div>
        <div className="form-group-artist form-submit-artist">
          <button type="submit">{ send ? send : 'Add Artist' }</button>
        </div>
      </form>
    </div>
  )
}

export default ArtistContent
