import { Request, Response } from 'express'

import { createErrorMessage } from '../utils/errors'

import { IAuthenticate } from '../dtos/auth'
import { CandidateController } from './CandidateController'
import { CompanyController } from './CompanyController'

import { userType } from '../constants/user'
import { generateToken } from '../utils'

class AuthController {
  async authenticate(req: Request, res: Response) {
    const data: IAuthenticate = req.body

    const candidateController = new CandidateController()

    const candidate = await candidateController
      .repository
      .findOne({
        where: [
          { email: data.login, password: data.password },
          { name: data.login, password: data.password },
        ],
      })

    if (!candidate) {
      const companyController = new CompanyController()

      const company = await companyController
        .repository
        .findOne({
          where: [
            { name: data.login, password: data.password },
            { email: data.login, password: data.password },
          ],
        })

      if (!company) { return res.status(400).send(createErrorMessage({ toastMessage: 'Usuário ou senha incorretos', isFormError: false })) }

      const token = generateToken(company.id, userType.company)

      return res
        .json({
          token,
          userType: userType.company,
          user: company,
        })
        .status(200)
    }

    const token = generateToken(candidate.id, userType.candidate)

    return res.json({ token, userType: userType.candidate, user: { ...candidate } }).status(200)
  }
}

export { AuthController }
