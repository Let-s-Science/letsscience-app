import * as admin from 'firebase-admin'

admin.initializeApp()

const store = admin.firestore()
const auth = admin.auth()

export { store, auth }
