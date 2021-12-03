import * as yup from 'yup'

export const registerValidation = yup.object({
    username: yup
        .string()
        .min(2, "Le nom d'utilisateur doit contenir plus de 2 caractères")
        .max(20, "Le nom d'utilisateur doit contenir au maximum 20 caractères")
        .matches(/^[A-Za-z][A-Za-z0-9]*$/, "Le nom d'utilisateur doit contenir que des lettres et des chiffres")
        .required("Un nom d'utilisateur est requis"),
    email: yup
        .string()
        .email("Entrer une adresse email valide")
        .required("Une adresse email est requise"),
    password: yup
        .string()
        .min(8, 'Le mot de passe doit contenir au minimum 8 caractères')
        .max(255, 'Le mot de passe peut contenir au maximum 255 caractères')
        .required('Un mot de passe est requis'),
})

export const loginValidation = yup.object({
    username: yup
        .string()
        .required("Un nom d'utilisateur est requis"),
    password: yup
        .string()
        .required('Un mot de passe est requis'),
})