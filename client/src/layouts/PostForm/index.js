import React, { useState, useEffect } from 'react'
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
import Image from '@components/Image'

function Thumb({ file }) {
    const [thumb, setThumb] = useState(undefined)
    useEffect(() => {
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setThumb(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setThumb(undefined)
        }
    }, [file])
    return (
        file ? <Image imageSrc={thumb} altText={"Vignette de l'image uploadée"} /> : null
    )
}

const Input = styled('input')({
    display: 'none',
})

export default function PostForm({ inputsValue, postId, requestFunction }) {
    const { title, description, file } = inputsValue
    //const { createPost, modifyPost } = usePost()
    return (
        <Formik
            initialValues={{
                title: title,
                description: description,
                file: file
            }}
            validationSchema={postValidation}
            onSubmit={async (values) => {
                await sleep(500)
                inputsValue.title === '' 
                    ? await requestFunction(values)
                    : await requestFunction(postId, values)
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
                        <Grid container item justifyContent="start" sm={6}>
                            <label htmlFor="file">
                                <Input
                                    accept="image/*"
                                    id="file"
                                    multiple
                                    type="file"
                                    onChange={(event) => { formik.setFieldValue("file", event.currentTarget.files[0]) }}
                                />
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                        </Grid>
                        <Grid container item justifyContent="start" sm={6}>
                            <Thumb file={formik.values.file} />
                        </Grid>
                        <Grid container item justifyContent="center">
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                loading={formik.isSubmitting}
                                type="submit"
                            >
                                Publier
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Formik>
    )
}