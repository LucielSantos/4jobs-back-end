import { Company } from '@models/Company'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Company)
class CompaniesRepository extends Repository<Company> {

}

export { CompaniesRepository }
