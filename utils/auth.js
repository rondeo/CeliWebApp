import axios from 'axios'

export function setAuthToken (token) {
  axios.defaults.headers.common['x-access-token'] = token
  axios.defaults.headers.common['Authorization'] = token
}
export function resetAuthToken () {
  delete axios.defaults.headers.common['x-access-token']
  delete axios.defaults.headers.common['Authorization']
}