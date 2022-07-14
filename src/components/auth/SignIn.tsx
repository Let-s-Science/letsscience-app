import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth
} from 'firebase/auth'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { initializeFirebase } from './fireBaseSetup'
import SocialLogins from './SocialLogins'

initializeFirebase()

const SignIn: React.FC = () => {
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): any => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // TODO: Better error handling
    const email = data.get('email')?.toString() as string
    const password = data.get('password')?.toString() as string
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
      })
      .catch((error: AuthError) => {
        // TODO: Better error handling
        console.log(error.message)
      })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3, mt: 3 }} />

          <SocialLogins />
        </Box>
      </Box>
    </Container>
  )
}

export default SignIn
