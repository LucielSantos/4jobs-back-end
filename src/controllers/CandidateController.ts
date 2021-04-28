import { Candidate } from '@models/Candidate'
import { CandidateRepository } from '@repositories/CandidateRepository'
import { createErrorMessage } from '@utils/errors'
import { Request, Response } from 'express'
import { ICreateCandidate } from 'src/dtos/candidate'
import { createCandidateValidationSchema } from 'src/validationSchemas'
import { getRepository } from 'typeorm'
import { BaseController } from './BaseController'

class CandidateController extends BaseController<CandidateRepository> {
  constructor() {
    super(createCandidateValidationSchema, CandidateRepository)
  }

  async create(req: Request, res: Response) {
    const data: ICreateCandidate = req.body

    const successValidation = await this.executeCreateValidation(data, res)

    if (await this.getRepository().verifyIfExists(data.name, data.email)) {
      return res.status(400).json(createErrorMessage({ toastMessage: 'Já existe candidato com este nome e email', isFormError: false }))
    }

    if (successValidation) {
      this.executeCreation(data, res)
    }
  }

  async executeCreation(data: ICreateCandidate, res: Response) {
    const company = this.getRepository().create(data)

    await this.getRepository().save(company)

    return res.json(company).status(201)
  }
}

export { CandidateController }
