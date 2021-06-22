import { TJobStatus } from 'src/dtos/job'
import { EntityRepository, Repository } from 'typeorm'

import { Job } from '../models/Job'

@EntityRepository(Job)
class JobRepository extends Repository<Job> {
  async verifyIfExists(title: string, companyId: string) {
    return Boolean(await this.findOne({ title, companyId }))
  }

  async getById(jobId: string) {
    return await this.findOne({ id: jobId })
  }

  async getPreview(jobId: string) {
    return await this
      .createQueryBuilder('jobs')
      .select([
        'jobs.id',
        'jobs.title',
        'jobs.deadlineResolve',
        'jobs.description',
        'jobs.expectedResolution',
        'jobs.observations',
        'jobs.tags',
        'jobs.title',
        'companies.name',
        'companies.marketSegment',
        'companies.id',
      ])
      .where({ id: jobId })
      .leftJoin('jobs.company', 'companies')
      .getOne()
  }

  async verifyIfJobExistsByCompany(jobId: string, companyId: string) {
    return Boolean(await this.findOne({ id: jobId, companyId }))
  }

  async changeStatus(jobId: string, newStatus: TJobStatus) {
    return await this.save({
      id: jobId,
      status: newStatus,
    })
  }
}

export { JobRepository }
