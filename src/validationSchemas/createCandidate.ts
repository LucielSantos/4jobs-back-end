import * as Yup from 'yup'
import { passwordMatches } from './constants'
import { requiredMessage, invalidPassword, invalidEmail } from './messages'

export const createCandidateValidationSchema = Yup.object().shape({
  email: Yup.string().email(invalidEmail).required(requiredMessage),
  name: Yup.string().required(requiredMessage),
  password: Yup.string()
    .required(requiredMessage)
    .matches(passwordMatches, invalidPassword),
})
