import { CandidateController } from '@controllers/CandidateController'
import { CompanyController } from '@controllers/CompanyController'
import { Router } from 'express'
import { errorMiddleware } from './utils/errorMiddleware'

const router = Router()

const candidateController = new CandidateController()

const companyController = new CompanyController()

// Candidate routes
router.post('/candidate', async (req, res, next) => {
  try {
    await candidateController.create(req, res)
  } catch (error) {
    next(error)
  }
})

// Company routes
router.post('/company', async (req, res, next) => {
  try {
    await companyController.create(req, res)
  } catch (error) {
    next(error)
  }
})

router.use(errorMiddleware)

export { router }
