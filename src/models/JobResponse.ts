import { v4 as uuid } from 'uuid'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Candidate } from './Candidate'
import { Job } from './Job'
import { Company } from './Company'
import { TJobResponseValues } from '../constants'
import { IMessageJobResponse, IResponseFormJob } from '../dtos/jobResponse'

@Entity('jobResponse')
class JobResponse {
  @PrimaryColumn('varchar')
  readonly id: string;

  @Column('varchar')
  candidateId: string;

  @Column('varchar')
  jobId: string;

  @Column('varchar')
  companyId: string;

  @Column('boolean')
  challengeResolved: boolean;

  @Column('integer')
  status: TJobResponseValues;

  @Column('simple-json')
  response: IResponseFormJob[];

  @Column('simple-json')
  messages: IMessageJobResponse[];

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'candidateId' })
  candidate: Candidate

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'jobId' })
  job: Job

  @ManyToOne(() => Company, company => company.name)
  @JoinColumn({ name: 'companyId' })
  company: Company

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { JobResponse }
