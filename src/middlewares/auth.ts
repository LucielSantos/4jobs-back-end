import jwt from 'jsonwebtoken'

import { createErrorMessage, ITokenPayload } from '../utils'
import { TUserTypeNum } from '../constants'
import authConfig from '../config/auth.json'

import { NextFunction, Request, Response } from 'express'

/** If false, not consider user type, only if is logged */
export const authMiddleware = (userType: TUserTypeNum | false) => (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) { return res.status(401).send(createErrorMessage({ toastMessage: 'Usuário não pode executar esta ação' })) }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) { return res.status(401).send(createErrorMessage({ toastMessage: 'Token error: not contains two parts' })) }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) { return res.status(401).send(createErrorMessage({ toastMessage: 'Token error: not contains "Bearer"' })) }

  jwt.verify(token, authConfig.secret, (error, decoded: ITokenPayload) => {
    if (error) { return res.status(401).send(createErrorMessage({ toastMessage: 'Usuário não pode executar esta ação' })) }

    if (userType && decoded.userType !== userType) { return res.status(401).send(createErrorMessage({ toastMessage: 'Usuário não pode executar esta ação' })) }

    res.locals.userId = decoded.id
    res.locals.userType = decoded.userType

    return next()
  })
}
