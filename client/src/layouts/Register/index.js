import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton'
import InputWithFormik from '@components/InputWithFormik';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { registerValidation } from '@schemas/authValidation'
import { Formik } from 'formik'
import { sleep } from '@utilities/timeout'
import useAuth from '@services/useAuth'

export default function RegisterForm() {
    const { registerUser } = useAuth()
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: ''
            }}
            validationSchema={registerValidation}
            onSubmit={async (values) => {
                await sleep(500)
                await registerUser(values)
            }}
        >
            {formik => (
                <Box component="form" sx={{ p: 4 }} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid container item>
                            <Typography>S'inscrire sur Groupomania</Typography>
                        </Grid>
                        <Grid container item justifyContent="center">
                            <InputWithFormik
                                label="Username"
                                name="username"
                                id="username"
                                {...formik.getFieldProps('username')}
                            />
                        </Grid>
                        <Grid container item justifyContent="center" sm={6}>
                            <InputWithFormik
                                label="Email"
                                name="email"
                                id="email"
                                {...formik.getFieldProps('email')}
                            />
                        </Grid>
                        <Grid container item justifyContent="center" sm={6}>
                            <InputWithFormik
                                label="Password"
                                name="password"
                                id="password"
                                {...formik.getFieldProps('password')}
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
            )}
        </Formik>
    )
}