import { Request, Response } from 'express'

import { CandidateRepository } from '../repositories/CandidateRepository'
import { createErrorMessage } from '../utils/errors'
import { ICreateCandidate, IEditCandidate } from '../dtos/candidate'
import { createCandidateValidationSchema } from '../validationSchemas'
import { BaseController } from './BaseController'

class CandidateController extends BaseController<CandidateRepository> {
  constructor() {
    super(createCandidateValidationSchema, CandidateRepository)
  }

  async create(req: Request, res: Response) {
    const data: ICreateCandidate = req.body

    const successValidation = await this.executeCreateValidation(data, res)

    if (await this.repository.verifyIfExists(data.name, data.email)) {
      return res.status(400).json(createErrorMessage({ toastMessage: 'Já existe candidato com este nome ou email', isFormError: false }))
    }

    if (successValidation) {
      this.executeCreation(data, res)
    }
  }

  async executeCreation(data: ICreateCandidate, res: Response) {
    const company = this.repository.create(data)

    await this.repository.save(company)

    return res.status(201).json(company)
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id

    const candidate = await this.repository.getById(id)

    delete candidate.password

    return res.status(200).json(candidate)
  }

  async editById(req: Request<{ id: string }, any, IEditCandidate>, res: Response) {
    const id = req.params.id

    const candidateToEdit = req.body

    await this.repository.save({
      id,
      ...candidateToEdit,
    })

    return res.status(200).send()
  }
}

export { CandidateController }
