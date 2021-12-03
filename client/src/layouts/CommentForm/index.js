import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import InputWithFormik from '@components/InputWithFormik'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { commentValidation } from '@schemas/postValidation'
import { Formik } from 'formik'
import { sleep } from '@utilities/timeout'

export default function CommentForm({ postId, requestFunction }) {

    return (
        <Formik
            initialValues={{
                content: ''
            }}
            validationSchema={commentValidation}
            onSubmit={async (values) => {
                await sleep(500)
                await requestFunction(postId, values)
            }}
        >
            {formik => (
                <Box component="form" sx={{ p: 4 }} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid container item>
                            <Typography>Ecrivez un commentaire</Typography>
                        </Grid>
                        <Grid container item justifyContent="center">
                            <InputWithFormik
                                label="Commentaire"
                                name="content"
                                id="content"
                                multiline
                                rows={2}
                                {...formik.getFieldProps('content')}
                            />
                        </Grid>
                        <Grid container item justifyContent="center">

                        </Grid>
                    </Grid>
                </Box>
            )}
        </Formik>
    )
}