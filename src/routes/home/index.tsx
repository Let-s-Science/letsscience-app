import { Outlet } from 'react-router'

const Home = (): JSX.Element => (
  <div>
    <p>Home</p>
    <Outlet />
  </div>
)

export default Home
