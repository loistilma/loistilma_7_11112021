import React from 'react';
import Avatar from '@mui/material/Avatar'

export default (props) => {
	const { imageSrc, altText, text } = props
	return imageSrc
		? <Avatar alt={altText} src={imageSrc} />
		: <Avatar>{text}</Avatar>
}