import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'

export default (props) => {
    const { children, ...parentProps } = props
    const styles = {
        '&': {
            fontWeight: '600',
            letterSpacing: '0.050em',
            color: '#FFFFFF',
            background: 'rgba(9, 31, 67, 0.7)',
        },
        ':hover': {
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#FFFFFF',
        }
    }
    return (
        <LoadingButton
            sx={styles}
            variant="contained"
            {...parentProps}
        >
            {children}
        </LoadingButton>
    )
}
