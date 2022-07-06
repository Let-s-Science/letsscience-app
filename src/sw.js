import {
  getFiles,
  setupPrecaching,
  setupRouting
} from 'preact-cli/sw/'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

registerRoute(
  ({ url }) => {
    return (url.pathname === '/api/quiz')
  },
  new StaleWhileRevalidate()
)

setupRouting()
setupPrecaching(getFiles())
