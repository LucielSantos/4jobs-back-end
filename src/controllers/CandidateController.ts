import { Request, Response } from 'express'

class CandidateController {
  create(req: Request, res: Response) {
    const body = req.body

    console.log(body)

    return res.send().status(200)
  }
}

export { CandidateController }
