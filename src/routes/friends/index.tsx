import React, { useState } from 'react'

import { format } from 'date-fns'
import {
  getAuth,
  User
} from 'firebase/auth'
import { useEffect } from 'preact/hooks'
import { Outlet } from 'react-router'

import AddIcon from '@mui/icons-material/Add'
import {
  FormGroup,
  IconButton
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

const Friends = (): JSX.Element => {
  const user = getAuth().currentUser
  const [friends, setFriends] = useState<[User] | []>([])

  useEffect(() => {
    setFriends(loadFriends)
  }, [])

  const loadFriends = (): [User] | [] => {
    // TODO - load friends from database
    if (user != null) {
      console.log(user)
      const out: [User] = [user]
      for (let i = 0; i <= 10; i++) {
        out.push(user)
      }
      return out
    } else {
      return []
    }
  }

  const formatDate = (date: string) => {
    return format(new Date(date), 'EEEE, MMMM d yyyy')
  }

  // TODO: Align Typography to the left and the Button to the right (do not use marginLeft property)
  // TODO: The nav bar should not overlap the last list item
  // TODO: change FormGroup to AppBar

  return (
    <div>
      <FormGroup row>
        <Typography component='h1' variant='h5'>
          Friends
        </Typography>
        <IconButton
          color='primary'
          aria-label='add a friend'
          component='label'
          sx={{ marginLeft: '180px' }}
        >
          <AddIcon />
        </IconButton>
      </FormGroup>
      {friends && friends.length > 0
        ? (
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {friends.map((friend: User) => {
              return (
                <>
                  <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                      <Avatar
                        alt='Remy Sharp'
                        src='/static/images/avatar/1.jpg'
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${friend.displayName}`}
                      secondary={
                        <>
                  <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                          fontSize={12}
                          fontStyle='italic'
                        >
                          {`Joined on ${formatDate(
                            friend.metadata.creationTime ?? Date.now.toString()
                          )}`}
                        </Typography>
                </>
                    }
                    />
                  </ListItem>
                  <Divider variant='fullWidth' component='li' />
                </>
              )
            })}
          </List>
          )
        : (
          <>
            <h2>Oops, you haven't added any of your friends to the app yet.</h2>
            <p>To add new friends click here</p>
          </>
          )}
      <Outlet />
    </div>
  )
}

export default Friends
