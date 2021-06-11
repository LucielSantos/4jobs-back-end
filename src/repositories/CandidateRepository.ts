import { EntityRepository, Repository } from 'typeorm'

import { Candidate } from '../models/Candidate'

@EntityRepository(Candidate)
class CandidateRepository extends Repository<Candidate> {
  async verifyIfExists(name: string, email: string) {
    return Boolean(await this.findOne({ where: [{ name }, { email }] }))
  }

  async getById(id: string) {
    return await this.findOne({ id })
  }
}

export { CandidateRepository }
