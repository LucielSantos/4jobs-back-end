import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export const errorMiddleware = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware de erro')

  console.error(err)

  res.status(500).send({ error: err.toString() })
}
