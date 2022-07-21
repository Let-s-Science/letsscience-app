import { render } from 'preact'

import i18n from "i18next"
import { initReactI18next  } from 'react-i18next'
import translation from "../translation/app.json"

import App from './components/app'

i18n
    .use(initReactI18next)
    .init({
        resources: translation,
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    })

render(<App />, document.getElementById('app') as HTMLElement)
