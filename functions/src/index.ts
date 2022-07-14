import * as functions from 'firebase-functions'
import * as express from 'express'
import { quizRouter } from './quiz'

const app = express()
app.get('/api/helloWorld', (req, res) => {
  res.json({
    message: 'Hello, World!'
  })
})

const api = functions.https.onRequest(app)

app.use(quizRouter)

export { api }
