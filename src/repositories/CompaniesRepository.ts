import { EntityRepository, Repository } from 'typeorm'

import { Company } from '../models/Company'

@EntityRepository(Company)
class CompaniesRepository extends Repository<Company> {
  async verifyIfExists(name: string, email: string) {
    return Boolean(await this.findOne({ where: [{ name }, { email }] }))
  }

  async getById(companyId: string) {
    return await this.findOne({ id: companyId })
  }
}

export { CompaniesRepository }
