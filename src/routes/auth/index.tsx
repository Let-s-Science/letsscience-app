// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react'
import { firebaseConfig } from '../../components/auth/fireBaseSetup'
import { Navigate } from 'react-router'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import SignIn from '../../components/auth/SignIn'

initializeApp(firebaseConfig)

const SignInScreen: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

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
