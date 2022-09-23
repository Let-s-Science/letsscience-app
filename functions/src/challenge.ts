import { isChallenge } from '@let-s-science/api-types'
import { Challenge } from '@let-s-science/api-types/types'
import * as express from 'express'
import { isLoggedIn } from './auth'
import { store } from './initFirestore'

const router = express.Router()

router.get('/api/challenge/:id', isLoggedIn, (req, resp): void => {
  const id = req.params.id

  store
    .collection('challenges')
    .where('id', '==', id)
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
router.post('/api/challenge', isLoggedIn, (req, resp): void => {
  try {
    isChallenge(req.body)
  } catch {
    resp.status(400)
      .send()
    console.log('Invalid request')
    return
  }

  const body = req.body as Challenge
  store.collection('challenges')
    .add(body)
    .then(() => resp.status(200).send())
    .catch(() => resp.status(500).send())
})

// TODO: Only allow this for admins
router.delete('/api/challenge/:id', isLoggedIn, async (req, resp) => {
  const challenge = await store.collection('challenges')
    .doc(req.params.id)
    .get()

  if (!challenge.exists) {
    resp.status(404)
      .send()
    return
  }

  challenge.ref.delete()
    .then(() => resp.status(200).send())
    .catch(() => resp.status(500).send())
})
