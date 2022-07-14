import kyUniversal from 'ky-universal'

const api = kyUniversal.create({ prefixUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '' })

export default api
