import { CandidateController } from '@controllers/CandidateController'
import { CompanyController } from '@controllers/CompanyController'
import { Router } from 'express'

const router = Router()

const candidateController = new CandidateController()

const companyController = new CompanyController()

// Candidate routes
router.post('/candidate', candidateController.create)

// Company routes
router.post('/company', companyController.create)

export { router }
