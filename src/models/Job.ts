import { uuid } from '@utils/'
import { IDynamicFormField } from 'src/dtos/job'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('jobs')
class Job {
  @PrimaryColumn('varchar')
  readonly id: string;

  @Column('varchar')
  companyId: string;

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
