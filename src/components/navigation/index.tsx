import { useState } from 'react'

import { Link } from 'react-router-dom'

import Home from '@mui/icons-material/Home'
import QuestionMark from '@mui/icons-material/QuestionMark'
import VerifiedUser from '@mui/icons-material/VerifiedUser'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'

const Navigation = (): JSX.Element => {
  const [value, setValue] = useState('')

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction to='/home' label='Home' icon={<Home />} component={Link} />
        <BottomNavigationAction to='/profile' label='Profile' icon={<VerifiedUser />} component={Link} />
        <BottomNavigationAction to='/quiz' label='Quiz' icon={<QuestionMark />} component={Link} />
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
