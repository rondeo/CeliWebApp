const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')
const axios = require('axios')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Celicidad - Restaurantes Sin Gluten',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito:300,400,500,700' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    'vuetify/src/stylus/main.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
      baseURL: process.env.API_URL || 'http://api.celicidad.net:8081/v1/',
      redirectError: {
        401: '/login',
        404: '/notfound'
      },
      https: true,
      ssr: false
  },

  generate: {
    routes: function () {
      let businesses = axios.get('https://api.celicidad.net:8081/v1/business/slug/')
      .then((res) => {
         return res.data.map((item) => {
             return {
                route: '/restaurante/' + item.slug,
                payload: item
             }
         })
      })
      let states = axios.get('https://api.celicidad.net:8081/v1/state/')
      .then((res) => {
         return res.data.map((item) => {
             return {
                route: '/provincia/' + item.slug,
                payload: item
             }
         })
      })
      return Promise.all([businesses, states]).then(values => {
          return [...values[0], ...values[1]]
      })
     }
 },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
