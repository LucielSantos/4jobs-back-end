import { Request, Response } from 'express'

class CompanyController {
  create(req: Request, res: Response) {
    console.log(req.body)
  }
}

export { CompanyController }
