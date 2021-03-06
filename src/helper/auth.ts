import { getAuth } from 'firebase/auth'

const isNewUser = (): boolean => {
  const user = getAuth().currentUser
  return user != null && user.metadata.creationTime === user.metadata.lastSignInTime
}

const profileIsSet = (): boolean => {
  const user = getAuth().currentUser
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  return user != null &&
    user.displayName != null &&
    user.displayName.length > 0
    // TODO: implement photoURL
    // user.photoURL != null &&
    // user.photoURL.length > 0
}

export { isNewUser, profileIsSet }
