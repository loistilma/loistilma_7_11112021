import React from 'react';
import LoadingButton from '@components/Button'
import InputWithFormik from '@components/InputWithFormik';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { loginValidation } from '@schemas/authValidation'
import { Formik } from 'formik'
import { sleep } from '@utilities/timeout'
import useAuth from '@services/useAuth'
import Stack from '@mui/material/Stack'

export default function LoginForm() {
    const { loginUser } = useAuth()
    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={loginValidation}
            onSubmit={async (values) => {
                await sleep(500)
                await loginUser(values)
            }}
        >
            {formik => (
                <Box component="form" sx={{ p: 4 }} onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <Typography sx={{ color: 'rgba(9, 31, 67, 0.85)' }} variant="h1" component="h1">Se connecter</Typography>
                        <InputWithFormik
                            label="Username"
                            name="username"
                            id="username"
                            type="text"
                            {...formik.getFieldProps('username')}
                        />
                        <InputWithFormik
                            label="Password"
                            name="password"
                            id="password"
                            type="password"
                            {...formik.getFieldProps('password')}
                        />
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            loading={formik.isSubmitting}
                            type="submit"
                        >
                            Connexion
                        </LoadingButton>

                    </Stack>
                </Box>
            )}
        </Formik>
    )
}