import { Request, Response } from 'express'

import { JobResponseRepository } from '../repositories/JobResponseRepository'
import { createErrorMessage } from '../utils/'
import { jobResponseMessageByStatus, jobResponseTypes, jobStatus, TJobResponseValues } from '../constants'
import { ILinkCandidateReq, INewMessageReq, IResponseFormJob } from '../dtos/jobResponse'
import { BaseController } from './BaseController'
import { JobController } from './JobController'

class JobResponseController extends BaseController<JobResponseRepository> {
  constructor() {
    super(false, JobResponseRepository)
  }

  async validateLinkCandidateJob({ jobId, companyId, candidateId }: { jobId: string, companyId: string, candidateId: string }, res: Response): Promise<boolean> {
    if (!companyId) {
      res.status(400).json(createErrorMessage({ toastMessage: 'companyId is required' }))

      return false
    }

    if (!jobId) {
      res.status(400).json(createErrorMessage({ toastMessage: 'jobId is required' }))
      return false
    }

    if (await this.repository.verifyIfCandidateAlreadyLink(candidateId, jobId)) {
      res.status(400).json(createErrorMessage({ toastMessage: 'Você já está candidatado à esta vaga' }))
      return false
    }

    const jobController = new JobController()

    if (!await jobController.repository.verifyIfJobExistsByCompany(jobId, companyId)) {
      res.status(400).json(createErrorMessage({ toastMessage: 'this job does not belong to the company indicated' }))
      return false
    }

    const job = await jobController.repository.getById(jobId)

    if (job.status === jobStatus.closed) {
      res.status(400).json(createErrorMessage({ toastMessage: 'As inscrições para esta vaga estão canceladas' }))

      return false
    }

    return true
  }

  async linkCandidateJob(req: Request<any, any, ILinkCandidateReq>, res: Response) {
    const { jobId, companyId } = req.body
    const candidateId = res.locals.userId as string

    const validationSuccess = await this.validateLinkCandidateJob({ jobId, companyId, candidateId }, res)

    if (validationSuccess) {
      const data = {
        jobId,
        companyId,
        candidateId,
      }

      const saveData = await this.repository.create(data)

      await this.repository.save(saveData)

      await this.repository.addMessage(saveData.id, companyId, jobResponseMessageByStatus[`${saveData.status || 1}`])

      const jobCreated = await this.repository.getSimpleById(saveData.id)

      res.status(200).json(jobCreated)
    }
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    const { params: { id } } = req

    const jobCandidate = await this.repository.getById(id)

    if (!jobCandidate) {
      res.status(404).send()
    }

    return res.status(200).json(jobCandidate)
  }

  async getList(req: Request, res: Response) {
    const candidateId = res.locals.userId as string

    const jobs = await this.repository.getList(candidateId)

    // console.log(jobs)

    return res.status(200).json(jobs)
  }

  async replyForm(req: Request<{ jobResponseId: string }, any, { fields: IResponseFormJob[] }>, res: Response) {
    const jobResponseId = req.params.jobResponseId
    const responses = req.body.fields

    const jobResponse = await this.repository.getById(jobResponseId)

    if (!jobResponse) {
      return res.status(404).send()
    }

    if (jobResponse.status === jobResponseTypes.registered) {
      return res.status(400).send(createErrorMessage({ toastMessage: 'Aguarde a empresa liberar o formulário' }))
    }

    if (jobResponse.status !== jobResponseTypes.answering && jobResponse.status !== jobResponseTypes.returned) {
      return res.status(400).send(createErrorMessage({ toastMessage: 'Você já respondeu este formulário, aguarde a avaliação' }))
    }

    await this.repository.save({
      id: jobResponseId,
      response: responses,
      status: jobResponseTypes.answered,
      challengeResolved: true,
    })

    const savedJobResponse = await this.repository.getById(jobResponseId)

    return res.status(200).json(savedJobResponse)
  }

  async changeStatus(req: Request<{ jobResponseId: string }, any, { newStatus: TJobResponseValues }>, res: Response) {
    const { jobResponseId } = req.params
    const { newStatus } = req.body
    const companyId = res.locals.userId as string

    const statusArr = Object.keys(jobResponseTypes).map(key => jobResponseTypes[key])

    if (statusArr.indexOf(newStatus) < 0) {
      return res.status(400).json(createErrorMessage({ toastMessage: 'Este status não existe' }))
    }

    await this.repository.addMessage(jobResponseId, companyId, jobResponseMessageByStatus[newStatus])

    await this.repository.changeStatus(jobResponseId, newStatus)

    return res.status(200).send()
  }

  async getMessages(req: Request<{ jobResponseId: string }>, res: Response) {
    const { jobResponseId } = req.params

    const messages = await this.repository.getMessages(jobResponseId)

    return res.status(200).json({ messages: messages || [] })
  }

  async addNewMessage(req: Request<{ jobResponseId: string }, any, INewMessageReq>, res: Response) {
    const userId = res.locals.userId as string
    const { jobResponseId } = req.params

    const { message } = req.body

    await this.repository.addMessage(jobResponseId, userId, message)

    return res.status(200).send()
  }

  async getJobResponses(req: Request<{ jobResponseId: string }>, res: Response) {
    const { jobResponseId } = req.params

    const responses = await this.repository.getResponsesById(jobResponseId)

    return res.status(200).json(responses)
  }
}

export { JobResponseController }
