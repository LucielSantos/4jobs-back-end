import * as Yup from 'yup'
import { requiredMessage } from './messages'

export const createJobValidationSchema = Yup.object().shape({
  title: Yup.string().required(requiredMessage),
  deadlineResolve: Yup.string().required(requiredMessage),
  description: Yup.string().required(requiredMessage),
  expectedResolution: Yup.string().required(requiredMessage),
  observations: Yup.string().required(requiredMessage),
  tags: Yup.array().min(1, requiredMessage),
})
