import axios, { AxiosInstance } from 'axios'
import { getAuth } from 'firebase/auth'

import {
  API,
  Quiz
} from '@let-s-science/api-types/types'

const getClient = async (): Promise<AxiosInstance> => {
  const token = await getAuth().currentUser?.getIdToken()
  return axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '',
    headers: {
      Authorization: token ?? ''
    }
  })
}

const getQuiz = async (id: number): Promise<API<Quiz>> => {
  const resp = (await getClient()).get(`api/quiz/${id}`)
  return (await resp).data
}

export { getQuiz }
