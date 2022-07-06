import GoogleIcon from '@mui/icons-material/Google'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { getAuth, GoogleAuthProvider, signInAnonymously, signInWithRedirect } from 'firebase/auth'
import { useNavigate } from 'react-router'

const SocialLogins: React.FC = () => {

    const auth = getAuth()
  
    const guestSignIn = () => {
        signInAnonymously(auth)
            .then((userCredential) => {
                useNavigate()('/profile/me')
            })
            // TODO: better error handling
            .catch((error) => console.log(error))
    }

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
            .then(() => {
                useNavigate()('/profile/me')
            })
            // TODO: better error handling
            .catch((error) => console.log(error))
    }

  return <>
      <Stack spacing={3}>
        <Button variant='contained' startIcon={<GoogleIcon />} color='error' onClick={googleSignIn}>
          Sign in with Google
        </Button>
        <Button variant='contained' startIcon={<PersonIcon />} color='warning' onClick={guestSignIn}>
          Sign in as Guest
        </Button>
      </Stack>
    </>
  
}

export default SocialLogins
