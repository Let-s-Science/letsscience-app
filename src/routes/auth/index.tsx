// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react'
import * as firebaseui from 'firebaseui'
import { firebaseConfig } from '../../components/auth/fireBaseSetup'
import { Navigate } from 'react-router'
import { initializeApp } from 'firebase/app'
import { EmailAuthProvider, getAuth, GoogleAuthProvider, UserCredential } from 'firebase/auth'
import SignIn from '../../components/auth/SignIn'

initializeApp(firebaseConfig)

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInSuccessUrl: '/profile',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    // Potentially unstable use of UserCredentials instead of AuthResult
    signInSuccessWithAuthResult: (authResult: UserCredential, redirectUrl: string) => {
      return false
    }
  }
}

const SignInScreen: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

  const auth = getAuth()

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
    <Navigate to='/profile' />
  )
}

export default SignInScreen
