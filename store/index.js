import cookie from 'cookie'
import {setAuthToken, resetAuthToken} from '~/utils/auth'
export const actions = {
  nuxtServerInit ({dispatch}, context) {
    return new Promise((resolve, reject) => {
      if(context.req && context.req.headers && context.req.headers.cookie){
        const cookies = cookie.parse(context.req.headers.cookie || '')
        if (cookies.hasOwnProperty('x-access-token')) {
          setAuthToken(cookies['x-access-token'])
          dispatch('auth/fetch')
            .then(result => {
              resolve(true)
            })
            .catch(error => {
              console.log('Provided token is invalid:', error)                       
              resetAuthToken()
              resolve(false)
            })
        } else {
          resetAuthToken()
          resolve(false)
        }
      }  else {
        resetAuthToken()
        resolve(false)
      }
    })
  }
}