import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    primaryLight: '#C8E6C9',
    primaryLighter: '#dff1e0',
    accent: '#FF9800',
    secondary: '#f7fbf7',
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  },
  bgc: {
    backgroundColor: '#C8E6C9'
  }
})
