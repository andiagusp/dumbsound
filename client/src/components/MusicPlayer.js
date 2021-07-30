import React from 'react'

import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

const MusicPlayer = ({ visibleMusic, setVisibleMusic, audioLists, options }) => {
  console.log(options.playIndex)
  const onClickClose = () => setVisibleMusic(!visibleMusic)

  return visibleMusic && (
    <div>
      <ReactJkMusicPlayer audioLists={ audioLists } { ...options } />
      <div className="mp-close-button" onClick={ onClickClose }>
        <p className="mp-close-text">X</p>
      </div>
    </div>
  )
}

export default MusicPlayer
