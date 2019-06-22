<template>
  <section class="section">
     <v-container fluid fill-height>
    <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Celicidad</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-form method="post" @submit.prevent="login">
              <v-card-text>
                  <v-text-field v-model="email" prepend-icon="person" name="email" label="E-mail" type="text"></v-text-field>
                  <v-text-field  v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="primary">Login</v-btn>
              </v-card-actions>
            </v-form>
            </v-card>
          </v-flex>
        </v-layout>
     </v-container>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  components: {
    Notification,
  },

  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login() {
      try {
            
      await this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      }).then(result => {
        this.fetch()
      }).catch(error => {
        this.loading = false
        if (error.response && error.response.data) {
          this.alert = {type: 'error', message: error.response.data.message || error.reponse.status}
        }
      })
      } catch (e) {
        this.error = e.response
      }
    },
    async fetch(){
      await this.$store.dispatch('auth/fetch')
        .then(result => {
          
           this.$router.push({
                  path: this.$router.back()
              }) 
        })
    }
  }
}
</script>