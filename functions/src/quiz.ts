import * as express from 'express'
import { isLoggedIn } from './auth.js'
import { store } from './initFirestore.js'
import { QuizQuestion } from '@let-s-science/api-types/types'
import { isQuiz } from '@let-s-science/api-types'

const router = express.Router() // eslint-disable-line max-len

router.get('/api/quiz/:id', isLoggedIn, (req, resp): void => {
  const parsed = parseInt(req.params.id)

  if (isNaN(parsed)) {
    resp.status(400).send()
    return
  }

  if (parsed < 0) {
    resp.status(422).send()
    return
  }

  store
    .collection('quizzes')
    .where('id', '==', req.params.id)
    .get()
    .then((query) => {
      if (!query.empty) {
        const snapshot = query.docs[0]
        const data = snapshot.data()
        resp.json(data)
      } else {
        resp.status(404).send()
      }
    })
    .catch(() => resp.status(500).send())
})

// TODO: Only allow this for admins
router.post('/api/quiz', isLoggedIn, (req, resp): void => {
  try {
    isQuiz(req.body)
  } catch {
    resp.status(400)
      .send()
    console.log('Invalid request')
    return
  }

  const body = req.body as QuizQuestion
  store.collection('quizzes').add(body)
    .then(() => resp.status(200).send())
    .catch(() => resp.status(500).send())
})

// TODO: Only allow this for admins
router.delete('/api/quiz/:id', isLoggedIn, async (req, resp) => {
  const quiz = await store.collection('quizzes')
    .doc(req.params.id)
    .get()

  if (!quiz.exists) {
    resp.status(404)
      .send()
      .send()
    return
  }

  quiz.ref.delete()
    .then(() => resp.status(200).send())
    .catch(() => resp.status(500).send())
})

export { router as quizRouter }
