export type TJobResponseValues = 1 | 2;

export interface IJobResponseTypes {
  [key: string]: TJobResponseValues;
}

export const jobResponseTypes: IJobResponseTypes = {
  registered: 1,
  answering: 2,
}
