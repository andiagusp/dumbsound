import React, { useContext, useEffect, useState, createRef } from 'react'

import { server } from '../config/axios'
import { UserContext } from '../context/UserContext'
import MusicPlayer from './MusicPlayer'

import thumbnails from '../image/music-thumbnail.png'

const HomeContent = () => {
  const pathAudio = 'http://localhost:5000/public/audio/'
  const pathCover = 'http://localhost:5000/public/thumbnail/'
  const musicRef = createRef()
  const thumbnail = 'http://localhost:5000/public/thumbnail/'
  const [state] = useContext(UserContext)
  const [isLoading, setLoading] = useState('')
  const [musics, setMusics] = useState()
  const [srcMusic, setSrcMusic] = useState()
  const [mid, setMid] = useState()
  const [visibleMusic, setVisibleMusic] = useState(false)

  const onClickMusic = (mid) => {
    if (visibleMusic) {
      setMid(mid)
      setVisibleMusic(false)
      setTimeout(() => setVisibleMusic(true), 500)
    } else {
      setVisibleMusic(true)
    }
  }

  useEffect(() => {
    getMusics()
    return () => setMusics()
  }, [])

  const getMusics = async () => {
    try {
      setLoading('loading data...')
      const res = await server.get('/musics')
      setMusics(res?.data.musics)
      const src = res?.data.musics.map((music) => ({
        name: music.title,
        singer: music.artist.name,
        cover: pathCover+music.thumbnail,
        musicSrc: pathAudio+music.attache
      }))
      setSrcMusic(src)
      console.log(src)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading('')
    }
  }

  return (
    <main className="lp-body">
      <p className="lpb-title">Dengarkan dan Rasakan</p>

      <section className="lpb-wrapper-music">
        { isLoading && <h1 style={{ fontSize: 24, color: '#fff' }}>{ isLoading }</h1> }
        { musics?.map((music, i) => (
            <div className="lpb-card-music" key={ i } onClick={ () => onClickMusic(i) }>
              <img src={ thumbnail + music.thumbnail} alt="thumbnail-music" className="lpb-card-img" />
              <div className="lpb-music-ty">
                <p className="lpb-title-music">
                  { (music.title.length > 12)? `${music.title.substring(0, 12)}...` : music.title  }
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
      <section className="mp-music-player" >
        <MusicPlayer
          visibleMusic={ visibleMusic }
          setVisibleMusic={ setVisibleMusic }
          audioLists={ srcMusic }
          options={{
            playIndex: mid,
            showDownload: false,
            mode: 'full',
            showThemeSwitch: false
          }}
        />
      </section>
    </main>
  )
}

export default HomeContent
