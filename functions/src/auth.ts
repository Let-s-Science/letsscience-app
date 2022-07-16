import { Request, RequestHandler, Response } from 'express'
import { auth } from './initFirestore.js'

export const isLoggedIn: RequestHandler = async (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization

  if (token === undefined) {
    return res.status(401).send()
  }

  let validToken = true
  await auth.verifyIdToken(token).catch(() => {
    validToken = false
  })

  if (!validToken) {
    return res.status(401).send()
  }

  return next()
}
