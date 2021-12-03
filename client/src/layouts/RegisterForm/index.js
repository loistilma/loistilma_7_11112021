import React from 'react';
import LoadingButton from '@components/Button'
import InputWithFormik from '@components/InputWithFormik';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { registerValidation } from '@schemas/authValidation'
import { Formik } from 'formik'
import { sleep } from '@utilities/timeout'
import useAuth from '@services/useAuth'
import Stack from '@mui/material/Stack'

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
                    <Stack spacing={2}>
                        <Typography sx={{ color: 'rgba(9, 31, 67, 0.85)' }} variant="h1" component="h1">S'inscrire</Typography>
                        <InputWithFormik
                            label="Username"
                            name="username"
                            id="username"
                            type="text"
                            {...formik.getFieldProps('username')}
                        />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <InputWithFormik
                                label="Email"
                                name="email"
                                id="email"
                                type="email"
                                {...formik.getFieldProps('email')}
                            />
                            <InputWithFormik
                                label="Password"
                                name="password"
                                id="password"
                                type="password"
                                {...formik.getFieldProps('password')}
                            />
                        </Stack>
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            loading={formik.isSubmitting}
                            type="submit"
                        >
                            Inscription
                        </LoadingButton>
                    </Stack>
                </Box>
            )}
        </Formik>
    )
}