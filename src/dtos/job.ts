import { TDynamicFormValue } from 'src/constants'

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
  tags: string[];
  fields: IDynamicFormField[];
}
