import { CompaniesRepository } from '@repositories/CompaniesRepository'
import { createErrorMessage } from '@utils/errors'
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

class CompanyController {
  async create(req: Request, res: Response) {
    const { name, responsible, description, marketSegment, cnpj, state, city, email, phone, password, profileImage } = req.body

    const companyRepository = getCustomRepository(CompaniesRepository)

    if (await companyRepository.verifyIfExists(name, email)) {
      return res.status(400).json(createErrorMessage({ toastMessage: 'Uma empresa com este nome e email já existe' }))
    }

    const company = companyRepository.create({ name, responsible, description, marketSegment, cnpj, state, city, email, phone, password, profileImage })

    await companyRepository.save(company)

    return res.json(company).status(201)
  }
}

export { CompanyController }
