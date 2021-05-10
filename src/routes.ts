import { Router } from 'express'

import { authMiddleware } from './middlewares/auth'
import { errorMiddleware } from './utils/errorMiddleware'

import { AuthController } from '@controllers/AuthController'
import { CandidateController } from '@controllers/CandidateController'
import { CompanyController } from '@controllers/CompanyController'
import { JobController } from '@controllers/JobController'
import { userType } from './constants/user'

const router = Router()

const candidateController = new CandidateController()

const companyController = new CompanyController()

const authController = new AuthController()
const jobController = new JobController()

// Authenticate routes
router.post('/authenticate', (req, res) => authController.authenticate(req, res))

// Candidate routes
router.post('/candidate', (req, res) => candidateController.create(req, res))

// Company routes
router.post('/company', (req, res) => companyController.create(req, res))

// Job routes
router.post('/jobs', authMiddleware(userType.company), (req, res) => jobController.create(req, res))

router.get('/jobs', authMiddleware(userType.company), (req, res) => jobController.getJobs(req, res))

router.use(errorMiddleware)

export { router }
