import * as yup from 'yup'

export const registerValidation = yup.object({
    username: yup
        .string('Enter your username')
        //.email('Enter a valid username')
        .required('Username is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        //.min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
})

export const loginValidation = yup.object({
    username: yup
        .string('Enter your username')
        //.email('Enter a valid username')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
})