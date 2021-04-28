import { CandidateController } from '@controllers/CandidateController'
import { CompanyController } from '@controllers/CompanyController'
import { Router } from 'express'
import { errorMiddleware } from './utils/errorMiddleware'

const router = Router()

const candidateController = new CandidateController()

const companyController = new CompanyController()

// Candidate routes
router.post('/candidate', (req, res) => candidateController.create(req, res))

// Company routes
router.post('/company', (req, res) => companyController.create(req, res))

router.use(errorMiddleware)

export { router }
