import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton'
import { useFormik } from 'formik'
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { registerValidation } from '@schemas/authValidation'
import { useSnackbar } from 'notistack'
import { BASE_URL } from '@constants/api'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default function CustomForm() {
    const { enqueueSnackbar } = useSnackbar()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: registerValidation,
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                setSubmitting(false);
                //console.log(JSON.stringify(values))
                axios.post('/api/auth/signup', JSON.stringify(values))
                    .then(function (res) {
                        console.log(res.data.message);
                        enqueueSnackbar(res.data.message, {variant: 'success'})
                    })
                    .catch(function (error) {
                        console.log(error.response)
                        enqueueSnackbar('400 Bad Request', {variant: 'error'})
                    })
                //alert(JSON.stringify(values, null, 2));
            }, 500);
        },
    });
    return (
        <Box component="form" sx={{ p: 4 }} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid container item>
                    <Typography>S'inscrire sur Groupomania</Typography>
                </Grid>
                <Grid container item justifyContent="center">
                    <TextField
                        size="small"
                        label="Username"
                        name="username"
                        id="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid container item justifyContent="center" sm={6}>
                    <TextField
                        size="small"
                        label="Email"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid container item justifyContent="center" sm={6}>
                    <TextField
                        size="small"
                        label="Password"
                        name="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid container item justifyContent="center">
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        loading={formik.isSubmitting}
                        type="submit"
                    >
                        Submit
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}