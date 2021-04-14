import { Company } from '@models/Company'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Company)
class CompaniesRepository extends Repository<Company> {
  async verifyIfExists(name: string, email: string) {
    return Boolean(await this.findOne({ name, email }))
  }
}

export { CompaniesRepository }
