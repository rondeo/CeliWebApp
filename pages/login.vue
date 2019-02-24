<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Login!</h2>

          <Notification :message="error" v-if="error"/>

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                  required
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Login</button>
            </div>
          </form>

        </div>
      </div>
    </div>
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
         
      }).catch(error => {
        this.loading = false
        if (error.response && error.response.data) {
          this.alert = {type: 'error', message: error.response.data.message || error.reponse.status}
        }
      })
      await this.$store.dispatch('auth/fetch')
        .then(result => {
          this.$router.push({
                  path: '/'
              })
        })
      } catch (e) {
        this.error = e.response
      }
    }
  }
}
</script>