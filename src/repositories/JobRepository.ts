import { Job } from '@models/Job'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Job)
class JobRepository extends Repository<Job> {
  async verifyIfExists(title: string, companyId: string) {
    return Boolean(await this.findOne({ title, companyId }))
  }
}

export { JobRepository }
