export interface ILinkCandidateReq {
  jobId: string;
  companyId: string;
}

export interface IResponseFormJob {
  value: string;
  title: string;
}

export interface IMessageJobResponse {
  author: string;
  message: string;
  date: string;
}

export interface INewMessageReq {
  message: string;
}
