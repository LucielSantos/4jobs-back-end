import { JobResponse } from '@models/JobResponse'
import { TJobResponseValues } from 'src/constants'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(JobResponse)
class JobResponseRepository extends Repository<JobResponse> {
  async verifyIfCandidateAlreadyLink(candidateId: string, jobId) {
    return Boolean(await this.findOne({ candidateId, jobId }))
  }

  async getById(jobCandidateId: string) {
    return await this.findOne({ where: { id: jobCandidateId }, relations: ['job'] })
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
}

export { JobResponseRepository }
