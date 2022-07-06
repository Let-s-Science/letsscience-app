import { useState } from 'react'

import { getAuth } from 'firebase/auth'
import { useEffect } from 'preact/hooks'
import { Navigate } from 'react-router'

const LogOut: React.FC = () => {
  // This is probably unnecessary
  const [loggedOut, setLoggedOut] = useState(false)
  useEffect(() => {
    getAuth().signOut()
      .then(() => setLoggedOut(true))
      .catch((error) => console.log(error))
  }, [])
  return (
    <>
      {loggedOut && <Navigate to='/signin' />}
      {!loggedOut && <p>Logging out</p>}
    </>
  )
}

export default LogOut
