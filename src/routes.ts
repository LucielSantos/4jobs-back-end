import { Router } from 'express'

import { AuthController } from '@controllers/AuthController'
import { CandidateController } from '@controllers/CandidateController'
import { CompanyController } from '@controllers/CompanyController'
import { authMiddleware } from './middlewares/auth'
import { errorMiddleware } from './utils/errorMiddleware'

const router = Router()

const candidateController = new CandidateController()

const companyController = new CompanyController()

const authController = new AuthController()

// Candidate routes
router.post('/candidate', (req, res) => candidateController.create(req, res))

// Company routes
router.post('/company', (req, res) => companyController.create(req, res))

// Authenticate routes
router.post('/authenticate', (req, res) => authController.authenticate(req, res))

router.use(errorMiddleware)

export { router }
