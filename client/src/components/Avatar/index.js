import React from 'react';
import Avatar from '@mui/material/Avatar'

export default ({ text }) => {
	return (
		<Avatar sx={{ background: 'rgba(9, 31, 67, 0.7)' }}>{text}</Avatar>
	)
}