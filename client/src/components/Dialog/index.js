import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText'
import { commentValidation } from '@schemas/postValidation'
import { Formik } from 'formik'
import { sleep } from '@utilities/timeout'
import LoadingButton from '@components/Button'
import InputWithFormik from '@components/InputWithFormik'
import Box from '@mui/material/Box'

export default function FormDialog({ open, handleClose, createComment, postId }) {

    return (
        <div>


            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Commentaire</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Écrivez un commentaire
                    </DialogContentText>
                    <Formik
                        initialValues={{
                            content: '',
                        }}
                        validationSchema={commentValidation}
                        onSubmit={async (values) => {
                            await sleep(500)
                            await createComment(postId, values)
                        }}
                    >
                        {formik => (
                            <Box sx={{ pt: 3 }} component="form" onSubmit={formik.handleSubmit}>
                                <InputWithFormik
                                    label="Commentaire"
                                    name="content"
                                    id="content"
                                    multiline
                                    rows={2}
                                    {...formik.getFieldProps('content')}
                                />

                                <DialogActions sx={{ pt: 3 }}>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <LoadingButton
                                        variant="contained"
                                        color="primary"
                                        loading={formik.isSubmitting}
                                        type="submit"
                                    >
                                        Envoyer
                                    </LoadingButton>
                                </DialogActions>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>

            </Dialog>


        </div>
    );
}