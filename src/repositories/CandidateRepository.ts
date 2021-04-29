import { Candidate } from '@models/Candidate'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Candidate)
class CandidateRepository extends Repository<Candidate> {
  async verifyIfExists(name: string, email: string) {
    return Boolean(await this.findOne({ where: [{ name }, { email }] }))
  }
}

export { CandidateRepository }
