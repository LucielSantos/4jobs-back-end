import jwt from 'jsonwebtoken'

import { TUserTypeNum } from '../constants'
import authConfig from '../config/auth.json'

export interface ITokenPayload {
  id: string;
  userType: TUserTypeNum;
}

export const generateToken = (id: string, userType: TUserTypeNum) => jwt.sign({ id, userType }, authConfig.secret, {
  expiresIn: '30d',
})
