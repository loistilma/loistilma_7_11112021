import React, { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import InputWithFormik from '@components/InputWithFormik'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { postValidation } from '@schemas/postValidation'
import { Formik } from 'formik'
import { sleep } from '@utilities/timeout'
import usePost from '@services/usePost'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
/*
function Thumb () {
    const [loading, setLoading] = useState(false)
    const [thumb, setThumb] = useState(undefined)
}
*/
const Input = styled('input')({
    display: 'none',
})

export default function PostForm() {
    const { createPost } = usePost()
    return (
        <Formik
            initialValues={{
                title: '',
                description: ''
            }}
            validationSchema={postValidation}
            onSubmit={async (values) => {
                await sleep(500)
                await createPost(values)
            }}
        >
            {formik => (
                <Box component="form" sx={{ p: 4 }} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid container item>
                            <Typography>Créer un post</Typography>
                        </Grid>
                        <Grid container item justifyContent="center">
                            <InputWithFormik
                                label="Titre"
                                name="title"
                                id="title"
                                {...formik.getFieldProps('title')}
                            />
                        </Grid>
                        <Grid container item justifyContent="center">
                            <InputWithFormik
                                label="Description"
                                name="description"
                                id="description"
                                multiline
                                rows={4}
                                {...formik.getFieldProps('description')}
                            />
                        </Grid>
                        <Grid container item justifyContent="center">
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
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