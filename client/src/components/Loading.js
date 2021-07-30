import React from 'react'
import ReactLoading from 'react-loading';


const Loading = ({ type, color, height = 50, width = 50 }) => {
	return (
		<ReactLoading type={ type } color={ color } height={ height } width={ width } />
	)
}

export default Loading
