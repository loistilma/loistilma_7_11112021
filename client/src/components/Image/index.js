import React from 'react'
import CardMedia from '@mui/material/CardMedia'

export default (props) => {
    const { imageSrc, altText, ...rest } = props
    return <CardMedia component="img" image={imageSrc} alt={altText} {...rest} />
}