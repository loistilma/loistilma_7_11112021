import * as yup from 'yup'

export const postValidation = yup.object({
    title: yup
        .string('Enter your title')
        .required('Title is required'),
    description: yup
        .string('Enter your description')
        .required('Description is required')
})