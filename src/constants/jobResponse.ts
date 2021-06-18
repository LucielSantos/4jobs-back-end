export type TJobResponseValues = 1 | 2 | 3 | 4 | 5 | 6;

export interface IJobResponseTypes {
  [key: string]: TJobResponseValues;
}

export const jobResponseTypes: IJobResponseTypes = {
  registered: 1,
  answering: 2,
  answered: 3,
  returned: 4,
  inEvaluation: 5,
  finished: 6,
}

export const jobResponseMessageByStatus = {
  [jobResponseTypes.registered]: 'Você se candidatou ao desafio, aguarde a pré-avaliação.',
  [jobResponseTypes.answering]: 'Você já pode responder ao desafio!',
  [jobResponseTypes.answered]: 'Aguarde a avaliação do desafio.',
  [jobResponseTypes.returned]: 'Seu desafio foi retornado, poderá responder novamente.',
  [jobResponseTypes.inEvaluation]: 'Seu desafio está em avaliação no momento, aguarde.',
  [jobResponseTypes.finished]: 'O processo de recrutamento acabou!',
}
