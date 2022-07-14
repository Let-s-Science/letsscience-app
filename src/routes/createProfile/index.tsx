import * as React from 'react'

import {
  getAuth,
  updateProfile
} from 'firebase/auth'
import Jazzicon from 'react-jazzicon'
import { Navigate } from 'react-router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const UpdateProfile: React.FC = () => {
  const currentUser = getAuth().currentUser

  // This is not required because the router checks if the user is logged in,
  // but it also helps resolve TS issues
  if (currentUser == null) {
    return <Navigate to='/signin' />
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): any => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // TODO: Better error handling
    const displayName = data.get('displayName')?.toString() as string
    // User should be logged in
    if (currentUser == null) {
      return console.error('User is not logged in ')
    }
    updateProfile(currentUser, {
      displayName: displayName
    }).catch((err) => console.log(err))
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
        <Typography component='h1' variant='h5'>
          Update Profile
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Jazzicon diameter={100} seed={Math.round(Math.random() * 10000000)} />
          </Box>
          <TextField
            margin='normal'
            required
            fullWidth
            defaultValue={currentUser.displayName}
            id='displayName'
            label='Display Name'
            name='displayName'
            autoComplete='username'
            autoFocus
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default UpdateProfile
