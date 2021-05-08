import { createErrorMessage } from '@utils/errors'
import { Response } from 'express'
import { getCustomRepository, ObjectType } from 'typeorm'
import * as Yup from 'yup'

type TValidationSchema = Yup.AnyObjectSchema;

interface IBaseController<T> {
  createValidationSchema: TValidationSchema;
  modelRepository: ObjectType<T>;
}

interface IValidationDataObj { [key: string]: any; }

interface IErrorMessages { [key: string]: any; }

class BaseController<T> implements IBaseController<T> {
  createValidationSchema: TValidationSchema;
  modelRepository: ObjectType<T>;

  constructor(createValidationSchema: TValidationSchema, repository: ObjectType<T>) {
    this.createValidationSchema = createValidationSchema
    this.modelRepository = repository
  }

  get repository() {
    return getCustomRepository(this.modelRepository)
  }

  async executeCreateValidation(data: IValidationDataObj, res: Response): Promise<boolean> {
    try {
      await this.createValidationSchema.validate(data, {
        abortEarly: false,
        context: data,
      })

      return true
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages: IErrorMessages = {}

        error.inner.forEach(error => {
          if (error.path) {
            errorMessages[error.path] = error.message
          }
        })

        res
          .status(400)
          .json(
            createErrorMessage({
              toastMessage: 'Hove erros de validação',
              formErrors: errorMessages,
              isFormError: true,
            }))
          .send()

        return false
      }

      return false
    }
  }
}

export { BaseController }
