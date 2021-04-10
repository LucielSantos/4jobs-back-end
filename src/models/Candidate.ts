import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('candidates')
class Candidate {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  description: string;

  @Column()
  about: string;

  @Column()
  locality: string;

  @Column()
  skills: string;

  @Column()
  formations: string;

  @Column()
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
