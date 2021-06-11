import { v4 as uuid } from 'uuid'
import { IDynamicFormField } from '../dtos/job'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Company } from './Company'

@Entity('jobs')
class Job {
  @PrimaryColumn('varchar')
  readonly id: string;

  @Column('varchar')
  companyId: string;

  @ManyToOne(() => Company, company => company.name)
  @JoinColumn({ name: 'companyId' })
  company: Company

  @Column('varchar')
  title: string;

  @Column('integer')
  deadlineResolve: number;

  @Column('varchar')
  description: string;

  @Column('varchar')
  expectedResolution: string;

  @Column('varchar')
  observations: string;

  @Column('simple-array')
  tags: string[];

  @Column('simple-json')
  fields: IDynamicFormField[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Job }
