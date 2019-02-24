<template>
  <v-app >
   
    <v-toolbar dark fixed app  color="primaryDark" >
      <v-toolbar-side-icon  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text bold">
        <nuxt-link  :to="{ path :'/'}" style="text-decoration: none; black--text" append><span flat v-text="title"  class="white--text bold">HogeHoge</span></nuxt-link></v-toolbar-title>
      <v-spacer ></v-spacer>
      <v-toolbar-items v-if="$store.state.auth.user!=null"  >
        <v-menu
          offset-y
          content-class="dropdown-menu"
          transition="slide-y-transition"
          nudge-right>
         <v-btn class="white--text bold" flat  slot="activator">
           <v-layout  class="hidden-sm-and-down ">
             {{ $store.state.auth.user.firstName}} {{ $store.state.auth.user.lastName}} 
           </v-layout>
           <v-layout ml-2>
            <v-avatar ml-5 xs3 mr-4 size=40>
              <img :src=$store.state.auth.user.avatar alt="avatar" v-if="$store.state.auth.user.avatar!=null">
              <img src=/rounded.png alt="avatar" v-if="$store.state.auth.user.avatar==null">
            </v-avatar>
           </v-layout>
         </v-btn>
         <v-card>
            <v-list dense>
              <v-list-tile  @click="logout()"
              >
                  <v-list-tile-title
                    v-text="logOut"
                  />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar-items>
      <v-toolbar-items v-if="$store.state.auth.user==null">
        <v-menu
          offset-y
          content-class="dropdown-menu"
          transition="slide-y-transition"
          nudge-right>
         <v-btn class="white--text bold" flat slot="activator">
           <v-layout  class="hidden-sm-and-down ">
             INICIA SESIÓN
           </v-layout>
           <v-layout ml-2>
            <v-avatar ml-5 xs3 mr-4>
              <img src=/rounded.png alt="avatar">
            </v-avatar>
           </v-layout>
         </v-btn>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
              >
               <nuxt-link  :to="{ path :'/' + notification.uri}" style="text-decoration: none; black--text" append>
                  <v-list-tile-title
                    v-text="notification.text"
                  />
               </nuxt-link>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
    >
      <v-toolbar flat class="primaryDark" v-if="$store.state.auth.user!=null" pt-4 >
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="$store.state.auth.user.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="white--text bold">{{ $store.state.auth.user.firstName}} {{ $store.state.auth.user.lastName}} </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
     <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="login()"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content   class="primaryLight">
        <nuxt />
    </v-content>
    <v-footer   color ="info">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        right: false,
        rightDrawer: false,
        title: 'Celicidad',
        logOut: 'Salir',
        notifications: [
          {
            text: 'Login',
            uri: 'login'
          }
        ],
        componentKey: 0
      }
    },
    methods: {
      async logout() {
        try {
          await this.$store.dispatch('auth/reset')
        } catch (e) {
          this.error = e.response
        }
      },
      forceRerender(){
        console.log("forceRerender");
        this.componentKey += 1;  
      }
    }
  }
</script>
