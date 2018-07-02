<template>
  <v-layout column  xs12 pa-0>
    <v-layout row xs12 height="1000">
      <v-flex row>
        <v-flex row pa-0  xs12>
          <v-parallax xs12 src="/cocina.jpg"  
          height="800"
          >
            <v-layout row justify-center mt-5 >
              <v-flex xs8 mt-5 text-xs-center >
                <v-text-field v-on:keyup="onChange" v-model="search"
                label="Busca tu restaurante sin gluten"
                persistent-hint
                color="orange"
                box
                ></v-text-field>
                <v-text-field v-on:keyup="onChange"
                label="Busca tu restaurante sin gluten"
                persistent-hint
                color="orange"
                box
                id="2"
                :value="search"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-parallax>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-flex>
                  <v-list two-line>
                    <template v-for="item in businesses">
                      <v-subheader
                        v-if="item.cityName"
                        :value="item.cityName"
                        :key="item.id"
                      >
                      </v-subheader>
                      <v-list-tile
                        :value="item.name"
                        :key="item.id"
                      >
                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.name"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.cityName"></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
              </v-flex>
      <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo/>
        <vuetify-logo/>
      </div>
      <v-card>
        <v-card-title class="headline">Welcome to the Vuetify + Nuxt.js template</v-card-title>
        <v-card-text>
          <p>aVuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <p>For more information on Vuetify, check out the <a href="https://vuetifyjs.com" target="_blank">documentation</a>.</p>
          <p>If you have questions, please join the official <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">discord</a>.</p>
          <p>Find a bug? Report it on the github <a href="https://github.com/vuetifyjs/vuetify/issues" target="_blank" title="contribute">issue board</a>.</p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a href="https://nuxtjs.org/" target="_blank">Nuxt Documentation</a>
          <br>
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt GitHub</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>

import VuetifyLogo from '~/components/VuetifyLogo.vue'
import Logo from '~/components/Logo.vue'
import axios from 'axios';

export default {
   components: {
    Logo,
    VuetifyLogo
  },
  props: {
    searchType: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      search: this.searchType
        ? {...this.searchType}
        : "",
      businesses: [
        {
          id : "",
          name: "",
          city: ""
        }
      ]
    }
  },
  methods: {
    onChange() {
      console.log(this.search);
      axios.get('http://172.104.146.157:8080/api-0.0.1-SNAPSHOT/business/name/' + this.search + '/')
        .then(result => {
          this.businesses = result.data;
          console.log(result)
        })
        .catch(e => console.log(e))
    }
  }
}
</script>
