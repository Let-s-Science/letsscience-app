import 'firebase/compat/auth'

import React from 'react'

import { getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  Navigate,
  Outlet,
  Route,
  Routes
} from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import SignInScreen from '../routes/auth'
import Home from '../routes/home'
// Code-splitting is automated for `routes` directory
import Profile from '../routes/profile'
import Quiz from '../routes/quiz'
import { initializeFirebase } from './auth/fireBaseSetup'
import LogOut from './auth/LogOut'
import Navigation from './navigation'

const RequireAuth: React.FC = () => {
  if (getApps().length === 0) {
    initializeFirebase()
  }
  if (getAuth().currentUser == null) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/signin' />
  }

  return <><Outlet /><Navigation /></>
}
// getAuth().signOut()

const App: React.FC = () => (
  <div id='app'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RequireAuth />}>
          <Route path='home' element={<Home />} />
          <Route path='profile/:user' element={<Profile />} />
          <Route path='profile' element={<Profile />} />
          <Route path='quiz' element={<Quiz id={1} />} />
          <Route path='logout' element={<LogOut />} />
        </Route>
        <Route path='/signin' element={<SignInScreen />} />
      </Routes>
    </BrowserRouter>
  </div>
)

export default App
