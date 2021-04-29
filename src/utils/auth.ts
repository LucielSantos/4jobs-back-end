import jwt from 'jsonwebtoken'

import authConfig from '../config/auth.json'

export const generateToken = (id: string) => jwt.sign({ id }, authConfig.secret, {
  expiresIn: '30d',
})
