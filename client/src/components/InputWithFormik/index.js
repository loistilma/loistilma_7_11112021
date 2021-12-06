import React from 'react'
import TextField from '@mui/material/TextField'
import { useField } from 'formik'

export default ({ ...props }) => {
    const [field, meta] = useField(props)
    const styles = {
        '& label.Mui-focused': {
            color: 'rgba(9, 31, 67, 0.7)',
        },
        '& input:valid + fieldset': {
            borderColor: 'rgba(9, 31, 67, 0.7)',
            borderWidth: 1,
        },

        '& input:valid:focus + fieldset': {
            borderColor: 'rgba(9, 31, 67, 0.7)',
            borderLeftWidth: 6,
            padding: '4px !important',
        },

    }
    return (
        <>
            <TextField
                {...field}
                {...props}
                size="small"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                variant="outlined"
                sx={styles}
                fullWidth
            />
        </>
    )
}