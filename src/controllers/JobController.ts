import { JobRepository } from '@repositories/JobRepository'
import { createErrorMessage } from '@utils/'
import { Request, Response } from 'express'
import { ICreatJob } from 'src/dtos/job'
import { createJobValidationSchema } from 'src/validationSchemas'
import { BaseController } from './BaseController'

class JobController extends BaseController<JobRepository> {
  constructor() {
    super(createJobValidationSchema, JobRepository)
  }

  async create(req: Request, res: Response) {
    const data: ICreatJob = req.body
    const companyId = res.locals.userId as string

    if (data.fields.length < 1) {
      return res
        .status(400)
        .json(createErrorMessage({ toastMessage: 'O formulário de desafio precisa ter ao menos uma pergunta' }))
    }

    const successValidation = await this.executeCreateValidation(data, res)

    if (await this.repository.verifyIfExists(data.title, companyId)) {
      return res.status(400).json(createErrorMessage({ toastMessage: 'Você já criou uma vaga com o mesmo nome', isFormError: false }))
    }

    if (successValidation) {
      this.executeCreation(data, companyId, res)
    }
  }

  async executeCreation(data: ICreatJob, companyId: string, res: Response) {
    const jobToSave = { ...data, companyId }

    const job = this.repository.create(jobToSave)

    await this.repository.save(job)

    return res.status(201).json(job)
  }

  async getJobs(req: Request, res: Response) {
    const companyId = res.locals.userId as string

    const jobs = await this.repository
      .find({
        where: {
          companyId,
        },
        select: ['created_at', 'deadlineResolve', 'description', 'id', 'title', 'tags'],
      })

    return res.status(200).json(jobs)
  }
}

export { JobController }
