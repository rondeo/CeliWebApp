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
