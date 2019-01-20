<template>
  <v-app >
   
    <v-toolbar fixed app  color="primaryDark" >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title v-text="title" class="white--text bold"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content   class="primaryLight">
        <nuxt />
    </v-content>
    <v-footer :fixed="fixed" app color ="info">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Celicidad'
      }
    }
  }
</script>
