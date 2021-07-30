import React, { useEffect, useState } from 'react'

import { server } from '../config/axios'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import Loading from './Loading'

import thumbnails from '../image/music-thumbnail.png'

const LandingPageContent = () => {
  const thumbnail = 'http://192.168.1.12:5000/public/thumbnail/'
  const [visibleLoginModal, setVisibleLoginModal] = useState(false)
  const [visibleRegisterModal, setVisibleRegisterModal] = useState(false)
  const [isLoading, setLoading] = useState('')
  const [musics, setMusics] = useState()

  useEffect(() => {
    getMusics()
    return () => setMusics()
  }, [])

  const getMusics = async () => {
    try {
      setLoading('loading data...')
      const res = await server.get('/musics')
      console.log(res?.data.musics)
      setMusics(res?.data.musics)
    } catch (error) {
      console.log(error?.response)
    } finally {
      setLoading('')
    }
  }

  const onClickLogin = () => setVisibleLoginModal(!visibleLoginModal)

  return (
    <main className="lp-body">
      <p className="lpb-title">Dengarkan dan Rasakan</p>
      <LoginModal
        visibleLoginModal={ visibleLoginModal }
        setVisibleLoginModal={ setVisibleLoginModal }
        setVisibleRegisterModal={ setVisibleRegisterModal }
      />
      <RegisterModal
        visibleRegisterModal={ visibleRegisterModal }
        setVisibleRegisterModal={ setVisibleRegisterModal }
        setVisibleLoginModal={ setVisibleLoginModal }
      />
      <section className="lpb-wrapper-music">
        { isLoading && <Loading type="spin" color="#eaeaea" /> }
        { musics?.map((music, i) => (
            <div className="lpb-card-music" key={ i } onClick={ onClickLogin }>
              <img src={ thumbnail + music.thumbnail} alt="thumbnail-music" className="lpb-card-img" />
              <div className="lpb-music-ty">
                <p className="lpb-title-music">
                  { (music.title.length > 13)? `${music.title.substring(0, 12)}...` : music.title  }
                </p>
                <p>{ music.year }</p>
              </div>
              <p>
                { (music.artist.name.length > 30)? `${music.artist.name.substring(0, 12)}...` : music.artist.name }
              </p>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default LandingPageContent
