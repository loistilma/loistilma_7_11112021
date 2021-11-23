import React from 'react'
import TextField from '@mui/material/TextField'
import { useField } from 'formik'

export default ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <TextField
                {...field}
                {...props}
                size="small"
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                variant="outlined"
                fullWidth
            />
        </>
    )
}