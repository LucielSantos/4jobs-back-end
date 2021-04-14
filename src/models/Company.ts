import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('companies')
class Company {
  @PrimaryColumn('varchar')
  readonly id: string

  @Column('varchar')
  name: string

  @Column('varchar')
  responsible: string

  @Column('varchar')
  description: string

  @Column('varchar')
  marketSegment: string

  @Column('varchar')
  cnpj: string

  @Column('varchar')
  state: string

  @Column('varchar')
  city: string

  @Column('varchar')
  email: string

  @Column('varchar')
  phone: string

  @Column('varchar')
  password: string

  @Column('varchar')
  profileImage: string

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Company }
