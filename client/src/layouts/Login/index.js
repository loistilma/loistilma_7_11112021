import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton'
import InputWithFormik from '@components/InputWithFormik';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useSnackbar } from 'notistack'
import { loginValidation } from '@schemas/authValidation'
import { Formik } from 'formik'
import { sleep } from '@utilities/timeout'
import useAuth from '@services/useAuth'

export default function CustomForm() {
    const { enqueueSnackbar } = useSnackbar()
    const { loginUser, error } = useAuth()
    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={loginValidation}
            onSubmit={async (values) => {
                try {
                    await sleep(500)
                    await loginUser(values)

                } catch (error) {
                    console.log(error)
                    enqueueSnackbar('400 Bad Request', { variant: 'error' })
                }
            }}
        >
            {formik => (
                <Box component="form" sx={{ p: 4 }} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid container item>
                            <Typography>Se connecter sur Groupomania</Typography>
                        </Grid>
                        <Grid container item justifyContent="center">
                            <InputWithFormik
                                label="Username"
                                name="username"
                                id="username"
                                {...formik.getFieldProps('username')}
                            />
                        </Grid>
                        <Grid container item justifyContent="center">
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