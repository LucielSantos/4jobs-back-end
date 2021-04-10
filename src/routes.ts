import { CandidateController } from '@controllers/CandidateController'
import { Router } from 'express'

const router = Router()

const candidateController = new CandidateController()

router.post('/candidate', candidateController.create)

export { router }
