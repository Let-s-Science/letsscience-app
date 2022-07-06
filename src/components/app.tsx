import 'firebase/compat/auth'

import React from 'react'

import { getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation
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
  const location = useLocation()
  if (getApps().length === 0) {
    initializeFirebase()
  }
  if (getAuth().currentUser == null) {
    console.log(location)
    return <Navigate to='/signin' replace state={{ from: location.pathname }} />
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
