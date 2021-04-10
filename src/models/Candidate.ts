import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('candidates')
class Candidate {
  @PrimaryColumn('varchar')
  readonly id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  about: string;

  @Column('varchar')
  locality: string;

  @Column('varchar')
  skills: string;

  @Column('varchar')
  formations: string;

  @Column('varchar')
  experiences: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Candidate }
