export interface ICreateCandidate {
  name: string
  password: string
  email: string
}

export interface IEditCandidate {
  about?: string;
  description?: string;
  experiences?: string[];
  formations?: string[];
  locality?: string;
  skills?: string[];
}
