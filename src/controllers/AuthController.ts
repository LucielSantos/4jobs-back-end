import { createErrorMessage } from '@utils/errors'
import { Request, Response } from 'express'

import { IAuthenticate } from 'src/dtos/auth'
import { CandidateController } from './CandidateController'
import { CompanyController } from './CompanyController'

import authConfig from '../config/auth.json'
import { expiresTokenIn } from 'src/constants'
import { userType } from 'src/constants/user'
import { generateToken } from '@utils/'

class AuthController {
  async authenticate(req: Request, res: Response) {
    const data: IAuthenticate = req.body

    const candidateController = new CandidateController()

    const candidate = await candidateController
      .getRepository()
      .findOne({
        where: [
          { email: data.login, password: data.password },
          { name: data.login, password: data.password },
        ],
      })

    if (!candidate) {
      const companyController = new CompanyController()

      const company = await companyController
        .getRepository()
        .findOne({
          select: ['name', 'email', 'id'],
          where: [
            { name: data.login, password: data.password },
            { email: data.login, password: data.password },
          ],
        })

      if (!company) { return res.status(400).send(createErrorMessage({ toastMessage: 'Usuário ou senha incorretos', isFormError: false })) }

      const token = generateToken(company.id)

      return res.json({ token, user: { ...company, userType: userType.company } }).status(200)
    }

    const token = generateToken(candidate.id)

    return res.json({ token, user: { ...candidate, userType: userType.candidate } }).status(200)
  }
}

export { AuthController }
