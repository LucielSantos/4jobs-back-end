import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('candidates')
class Candidate {
  @PrimaryColumn('varchar')
  readonly id: string;

  @Column('varchar')
  email: string;

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

  @Column('simple-array')
  skills: string[];

  @Column('simple-array')
  formations: string[];

  @Column('simple-array')
  experiences: string[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Candidate }
