import { AxiosResponse } from 'axios'
import { http } from './Http'

export let mePromise: Promise<AxiosResponse<Rescource<User>>> | undefined

export const resfresMe = () => {
  mePromise = http.get<Rescource<User>>('/me')
  return mePromise
}

export const fetchMe = resfresMe
