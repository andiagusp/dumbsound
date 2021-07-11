import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { PaperClipOutlined } from '@ant-design/icons'


import { server } from '../config/axios'

const MusicContent = props => {
	const history = useHistory()
	const [loading, setLoading] = useState('')
	const [audio, setAudio] = useState()
	const [send, setSend] = useState('')
	const [artists, setArtists] = useState()
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const [preview, setPreview] = useState()
	const [input, setInput] = useState({
		title: '', year: '', artistId: '', imageFile: '', audioFile: ''
	})

	useEffect(() => {
		getArtists()
	}, [])

	const onChangeInput = (e) => {
		setInput({
			...input,
			[e.target.name]: (e.target.type === 'file') ? e.target.files[0] : e.target.value
		})

		if (e.target.type === 'file' && e.target.name === 'imageFile') {
			const url = URL.createObjectURL(e.target.files[0])
			setPreview(url)
		}
		if (e.target.type === 'file' && e.target.name === 'audioFile') {
			setAudio(e.target.files[0].name)
			console.log('oke')
			console.log(e.target.files[0].name)
		}
	}

	const getArtists = async () => {
		try {
      setLoading('loading data...')
      const res = await server.get('/artists')
      console.log(res?.data.artists)
      setArtists(res?.data.artists)
    } catch (error) {
      console.log(error?.response)
    } finally {
      setLoading('')
    }
	}

	const getDataInput = () => {
		if (!input.imageFile || !input.audioFile) throw new Error('Data attache null')
		const form = new FormData()
		form.append('title', input.title)
		form.append('year', input.year)
		form.append('artistId', input.artistId)
		form.append('imageFile', input.imageFile, input.imageFile.name)
		form.append('audioFile', input.audioFile, input.audioFile.name)
		return form
	}

	const onSubmitMusic = async (e) => {
		try {
			setLoading('sending data ...')
			e.preventDefault()
			const body = getDataInput()
			const res = await server.post('/music', body)
			console.log(res)
			setSuccess('data success save')
			history.go(0)
		} catch (error) {
			if (error.hasOwnProperty('response')) {
					setError(error?.response.data.message)
			} else {
				console.log(error.message)
				setError(error.message)
			}
		} finally {
			setInput({ title: '', year: '', artistId: '', imageFile: '', audioFile: '' })
			setLoading('')
			setPreview('')
			setAudio('')
			setTimeout(() => {
				setError('')
				setSuccess('')
			}, 3000)
		}
	}	
	
	return (
		<main className="music">
			<h2 className="m-title">Add Music</h2>
			{ error && <p className="error-message">{ error }</p> }
			{ success && <p className="error-message">{ success }</p> }
			<form onSubmit={ onSubmitMusic }>
				<div className="form-group-music form-music-append">
					<section className="form-append-text">
						<input type="text" placeholder="title" name="title" value={ input.title } onChange={ onChangeInput } />
					</section>
					<label htmlFor="attache-thumbnail" className="form-append-file">
							<input type="file" name="imageFile" onChange={ onChangeInput } id="attache-thumbnail" />
							<PaperClipOutlined className="form-clip-music-icon" />
							<p>Attache Thumbnail</p>
					</label>
				</div>
				<div className="form-group-music">
					<input type="number" placeholder="year" name="year" onChange={ onChangeInput } value={ input.year }    />
				</div>
				<div className="form-group-music">
					<select name="artistId" onChange={ onChangeInput } value={ input.artistId } >
						{ loading && <option value="">{ loading }</option> }
						{
							artists?.map((a, i) => (<option value={ a.id } key={ i }>{ a.name }</option>))
						}
					</select>
				</div>
				<div className="form-group-music-attache  form-preview-attache-music">
					<label htmlFor="attache">
						<input type="file" name="audioFile" id="attache" onChange={ onChangeInput } placeholder="attache"  />
						<p>Attache</p>
					</label>
					{ audio && <p className="audio-name" style={{ color: 'white' }}>{ audio }</p>}
				</div>
				<div className="form-group-music form-submit-music form-preview-thumbnail">
					<button type="submit">{ loading ? loading : 'Add Song' }</button>
					{ preview && <img src={ preview } className="img-preview-thumbnail" alt="preview" /> }
				</div>
			</form>
		</main>
	)
}


export default MusicContent
