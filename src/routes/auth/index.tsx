import React, {
  useEffect,
  useState
} from 'react'

// Import FirebaseAuth and firebase.
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  Navigate,
  useLocation
} from 'react-router'

import { firebaseConfig } from '../../components/auth/fireBaseSetup'
import SignIn from '../../components/auth/SignIn'

initializeApp(firebaseConfig)

interface RedirectState {
  from: string
}

const SignInScreen: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.
  const { from = '/profile/me' }: RedirectState = (useLocation().state as RedirectState | null) ?? { from: '/profile/me' }

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged(user => {
      setIsSignedIn(!(user == null))
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  if (!isSignedIn) {
    return (
      <div>
        <SignIn />
      </div>
    )
  }
  return (
    <Navigate to={from} />
  )
}

export default SignInScreen
