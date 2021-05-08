import { CompaniesRepository } from '@repositories/CompaniesRepository'
import { createErrorMessage } from '@utils/errors'
import { Request, Response } from 'express'
import { ICreateCompany } from 'src/dtos/company'
import { createCompanyValidationSchema } from 'src/validationSchemas'
import { BaseController } from './BaseController'

class CompanyController extends BaseController<CompaniesRepository> {
  constructor() {
    super(createCompanyValidationSchema, CompaniesRepository)
  }

  async create(req: Request, res: Response) {
    const data: ICreateCompany = req.body

    const success = await this.executeCreateValidation(data, res)

    if (await this.repository.verifyIfExists(data.name, data.email)) {
      return res.status(400).json(createErrorMessage({ toastMessage: 'Uma empresa com este nome ou email já existe', isFormError: false }))
    }

    if (success) {
      this.executeCreation(data, res)
    }
  }

  async executeCreation(data: ICreateCompany, res: Response) {
    const company = this.repository.create(data)

    await this.repository.save(company)

    return res.status(201).json(company)
  }
}

export { CompanyController }
