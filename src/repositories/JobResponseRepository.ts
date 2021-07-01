import { EntityRepository, Repository } from 'typeorm'

import { JobResponse } from '../models/JobResponse'
import { TJobResponseValues } from '../constants'
import { CandidateController } from '@controllers/CandidateController'
import { CompanyController } from '@controllers/CompanyController'

@EntityRepository(JobResponse)
class JobResponseRepository extends Repository<JobResponse> {
  async verifyIfCandidateAlreadyLink(candidateId: string, jobId) {
    return Boolean(await this.findOne({ candidateId, jobId }))
  }

  async getById(jobCandidateId: string) {
    return await this.findOne({ where: { id: jobCandidateId }, relations: ['job'] })
  }

  async getResponsesById(jobCandidateId: string) {
    return await this.findOne({ where: { id: jobCandidateId }, select: ['response'] })
  }

  async getSimpleById(jobCandidateId: string) {
    return await this
      .createQueryBuilder('jobResponse')
      .select([
        'jobResponse.id',
        'jobResponse.challengeResolved',
        'jobResponse.status',
        'jobResponse.response',
        'jobResponse.created_at',
        'jobs.id',
        'jobs.title',
        'jobs.observations',
        'jobs.deadlineResolve',
        'jobs.description',
      ])
      .where({ id: jobCandidateId })
      .leftJoin('jobResponse.job', 'jobs')
      .getOne()
  }

  async getList(candidateId: string) {
    return await this
      .createQueryBuilder('jobResponse')
      .select([
        'jobResponse.id',
        'jobResponse.challengeResolved',
        'jobResponse.status',
        'jobResponse.hasCompanyMessage',
        'jobResponse.hasCandidateMessage',
        'jobResponse.created_at',
        'jobs.id',
        'jobs.title',
        'jobs.observations',
        'jobs.deadlineResolve',
        'jobs.description',
      ])
      .where({ candidateId })
      .leftJoin('jobResponse.job', 'jobs')
      .getMany()
  }

  async getCountByJob(jobId: string) {
    return await this.count({ where: { jobId } })
  }

  async getCountByJobAndStatus(jobId: string, status: TJobResponseValues) {
    return await this.count({ where: { jobId, status } })
  }

  async getCandidatesByJobAndStatus(jobId: string, status: TJobResponseValues) {
    const list = await this
      .find({
        where: { jobId, status },
        relations: ['candidate'],
      })

    return list.map(jobResponse => {
      const candidate = jobResponse.candidate

      delete candidate.created_at
      delete candidate.password

      return {
        ...candidate,
        status: jobResponse.status,
        jobResponseId: jobResponse.id,
        hasCandidateMessage: jobResponse.hasCandidateMessage,
        hasCompanyMessage: jobResponse.hasCompanyMessage,
      }
    })
  }

  async changeStatus(jobResponseId: string, newStatus: TJobResponseValues) {
    return this.save({
      id: jobResponseId,
      status: newStatus,
    })
  }

  async getMessages(jobResponseId: string) {
    const jobResponse = await this.findOne({ where: { id: jobResponseId } })

    if (jobResponse) {
      return jobResponse.messages
    } else {
      return false
    }
  }

  async addMessage(jobResponseId: string, authorId: string, message: string) {
    const candidateController = new CandidateController()
    const companyController = new CompanyController()

    const messages = await this.getMessages(jobResponseId)

    const newMessage = {
      message,
      author: '',
      date: new Date().toString(),
    }

    const candidate = await candidateController.repository.getById(authorId)

    if (candidate) {
      newMessage.author = candidate.name

      return await this.save({
        id: jobResponseId,
        messages: messages ? [...messages, newMessage] : [newMessage],
      })
    }

    const company = await companyController.repository.getById(authorId)

    if (company) {
      newMessage.author = company.name

      return await this.save({
        id: jobResponseId,
        messages: messages ? [...messages, newMessage] : [newMessage],
      })
    }

    return false
  }
}

export { JobResponseRepository }
