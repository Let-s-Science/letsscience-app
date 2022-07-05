import { Navigate, Outlet, Route, Routes } from 'react-router'

import Navigation from './navigation'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home'
import Profile from '../routes/profile'
import Quiz from '../routes/quiz'
import SignInScreen from '../routes/auth'
import { BrowserRouter } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { firebaseConfig } from './auth/fireBaseSetup'

const auth = getAuth()
let user: User | null
onAuthStateChanged(auth, (newUserObject) => {
  user = newUserObject
})

const RequireAuth = () => {
  if (firebase.apps.length === 0) {
    const app = firebase.initializeApp(firebaseConfig)
    console.log(firebase.auth(app).currentUser)
    console.log(firebase.apps)
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

const App = () => (
  <div id='app'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RequireAuth />}>
          <Route path='profile/:user' element={<Profile />} />
          <Route path='profile' element={<Profile />} />
          <Route path='quiz' element={<Quiz id={1} />} />
        </Route>
        <Route path='/signin' element={<SignInScreen />} />
      </Routes>
    </BrowserRouter>
  </div>
)

export default App
