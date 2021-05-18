import { JobResponse } from '@models/JobResponse'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(JobResponse)
class JobResponseRepository extends Repository<JobResponse> {
  async verifyIfCandidateAlreadyLink(candidateId: string, jobId) {
    return Boolean(await this.findOne({ candidateId, jobId }))
  }

  async getById(jobCandidateId: string) {
    return await this.findOne({ id: jobCandidateId })
  }

  async getSimpleById(jobCandidateId: string) {
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
}

export { JobResponseRepository }
