export type TJobResponseValues = 1 | 2 | 3 | 4;

export interface IJobResponseTypes {
  [key: string]: TJobResponseValues;
}

export const jobResponseTypes: IJobResponseTypes = {
  registered: 1,
  answering: 2,
  answered: 3,
  returned: 4,
}
