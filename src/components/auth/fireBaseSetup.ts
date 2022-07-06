// Import the functions you need from the SDKs you need

import {
  getApps,
  initializeApp
} from 'firebase/app'
import {
  connectAuthEmulator,
  getAuth
} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: 'AIzaSyDeIc6CtnjkRx53nvguZUkEpF4oHquNM0g',

  authDomain: 'let-s-science.firebaseapp.com',

  projectId: 'let-s-science',

  storageBucket: 'let-s-science.appspot.com',

  messagingSenderId: '644249210334',

  appId: '1:644249210334:web:2cb9735a51bac5af56e14f'

}

const initializeFirebase = (): void => {
  if (getApps().length > 0) { return }
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://localhost:9099')
  }
}

const firebaseApp = initializeFirebase()

export { firebaseApp, firebaseConfig, initializeFirebase }
