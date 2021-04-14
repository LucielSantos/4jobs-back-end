import { Request, Response } from 'express'
import { CompaniesRepository } from 'src/repositories/CompaniesRepository'
import { getCustomRepository } from 'typeorm'

class CompanyController {
  async create(req: Request, res: Response) {
    const { name } = req.body

    const companyRepository = getCustomRepository(CompaniesRepository)

    const company = companyRepository.create({ name })

    await companyRepository.save(company)

    return res.json(company).status(201)
  }
}

export { CompanyController }
