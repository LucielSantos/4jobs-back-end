import { TDynamicFormValue } from '../constants'

export interface IDynamicFormField {
  title: string;
  type: TDynamicFormValue;
  required: boolean;
}

export interface ICreatJob {
  title: string;
  deadlineResolve: number;
  description: string;
  expectedResolution: string;
  observations: string;
  observationsAfterEvaluation: string;
  tags: string[];
  fields: IDynamicFormField[];
}
