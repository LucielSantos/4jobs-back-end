export type TUserTypeNum = 1 | 2;

export interface IUserType {
  company: TUserTypeNum;
  candidate: TUserTypeNum;
}

export const userType: IUserType = {
  company: 1,
  candidate: 2,
}
