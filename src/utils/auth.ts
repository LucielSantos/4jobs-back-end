import jwt from 'jsonwebtoken'

import authConfig from '../config/auth.json'

export interface ITokenPayload {
  id: string;
}

export const generateToken = (id: string) => jwt.sign({ id }, authConfig.secret, {
  expiresIn: '30d',
})
