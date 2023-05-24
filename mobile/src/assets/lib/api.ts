import axios from 'axios'

export const api = axios.create({
  // localhost works onIOS but not on Android
  baseURL: 'http://192.168.15.95:3333',
})
