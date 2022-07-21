import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'

const Home = (): JSX.Element => {

  const {t, i18n} = useTranslation()

  return <div>
    <p>Home</p>
    <p>{t('Welcome to React')}</p>
    <Outlet />
  </div>
}

export default Home
