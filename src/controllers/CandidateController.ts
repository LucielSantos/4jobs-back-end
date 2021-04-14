import { Candidate } from '@models/Candidate'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

class CandidateController {
  async create(req: Request, res: Response) {
    const { name, password, description, about, locality, skills, formations, experiences } = req.body

    const candidateRepository = getRepository(Candidate)

    const candidate = candidateRepository.create({ name, password, description, about, locality, skills, formations, experiences })

    await candidateRepository.save(candidate)

    return res.json(candidate).status(201)
  }
}

export { CandidateController }
