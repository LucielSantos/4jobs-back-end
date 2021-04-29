import jwt from 'jsonwebtoken'

import { createErrorMessage, ITokenPayload } from '@utils/'
import authConfig from '../config/auth.json'

import { NextFunction, Request, Response } from 'express'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) { return res.status(401).send(createErrorMessage({ toastMessage: 'Usuário não pode executar esta ação' })) }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) { return res.status(401).send(createErrorMessage({ toastMessage: 'Token error: not contains two parts' })) }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) { return res.status(401).send(createErrorMessage({ toastMessage: 'Token error: not contains "Bearer"' })) }

  jwt.verify(token, authConfig.secret, (error, decoded: ITokenPayload) => {
    if (error) { return res.status(401).send(createErrorMessage({ toastMessage: 'Usuário não pode executar esta ação' })) }

    res.locals.userId = decoded.id

    return next()
  })
}
