import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { server } from '../config/axios'
import { UserContext } from '../context/UserContext'
import MusicPlayer from './MusicPlayer'

import thumbnails from '../image/music-thumbnail.png'

const HomeContent = () => {
  const pathAudio = 'http://localhost:5000/public/audio/'
  const pathCover = 'http://localhost:5000/public/thumbnail/'
  const thumbnail = 'http://localhost:5000/public/thumbnail/'
  const history = useHistory()
  const [state] = useContext(UserContext)
  const [isLoading, setLoading] = useState('')
  const [musics, setMusics] = useState()
  const [musicsUnsub, setMusicsUnsub] = useState()
  const [srcMusic, setSrcMusic] = useState()
  const [srcMusicUnsub, setSrcMusicUnsub] = useState()
  const [mid, setMid] = useState()
  const [visibleMusic, setVisibleMusic] = useState(false)

  const onClickMusic = (mid) => {
    if (visibleMusic) {
      setMid(mid)
      setVisibleMusic(false)
      setTimeout(() => setVisibleMusic(true), 500)
    } else {
      setMid(mid)
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
      const filters = res?.data.musics.filter((m, i) => i < 3)
      setMusics(res?.data.musics)
      const srcUnsub = filters.map((music) => ({
        name: music.title,
        singer: music.artist.name,
        cover: pathCover+music.thumbnail,
        musicSrc: pathAudio+music.attache
      }))
      const src = res?.data.musics.map((music) => ({
        name: music.title,
        singer: music.artist.name,
        cover: pathCover+music.thumbnail,
        musicSrc: pathAudio+music.attache
      }))
      setSrcMusic(src)
      setMusicsUnsub(filters)
      setSrcMusicUnsub(srcUnsub)
      console.log(srcMusicUnsub)
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

      { (state.user.subscribe !== 'true') && 
        <section className="lpb-alert-subscribe">
          Subscribe now to get access to all music <span onClick={ () => history.push('/payment') }>click here</span>
        </section> 
      }
      <section className="lpb-wrapper-music">
        { isLoading && <h1 style={{ fontSize: 24, color: '#fff' }}>{ isLoading }</h1> }
        {
          (state.user.subscribe === 'true') ? 
            musics?.map((music, i) => (
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
          
            :
            
            musicsUnsub?.map((music, i) => (
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
      { (state.user.subscribe === 'true') ? 
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
        :
          <MusicPlayer
            visibleMusic={ visibleMusic }
            setVisibleMusic={ setVisibleMusic }
            audioLists={ srcMusicUnsub }
            options={{
              playIndex: mid,
              showDownload: false,
              mode: 'full',
              showThemeSwitch: false
            }}
          />
      }
      </section>
    </main>
  )
}

export default HomeContent
