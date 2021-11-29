import React from 'react'
import Button from '@mui/material/Button'

export default (props) => {
    const { children, ...parentProps } = props
    return (
        <Button
            variant="contained"
            {...parentProps}
        >
            {children}
        </Button>
    )
}
