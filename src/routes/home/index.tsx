import React from 'react'
import P5Wrapper from '../../components/P5Wrapper/index'
import style from './style.css'

const Home = (): JSX.Element => (
  <div className={style.home}>
    <h1>Home</h1>
    <p>This is the Home component.</p>
    <P5Wrapper />
  </div>
)

export default Home
