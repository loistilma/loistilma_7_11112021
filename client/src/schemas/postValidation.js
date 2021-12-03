import * as yup from 'yup'

export const postValidation = yup.object({
    title: yup
        .string()
        .min(2, 'Le titre peut contenir au minimum 2 caractères')
        .max(255, 'Le titre peut contenir au maximum 255 caractères')
        .required('Un titre est requis'),
    description: yup
        .string()
        .min(2, 'La description peut contenir au minimum 2 caractères')
        .max(255, 'La description peut contenir au maximum 255 caractères')
        .required('Une description est requise')
})

export const commentValidation = yup.object({
    content: yup
        .string()
        .min(2, 'Le commentaire peut contenir au minimum 2 caractères')
        .max(255, 'Le commentaire peut contenir au maximum 255 caractères')
        .required('Un commentaire est requis'),
})