<template>
<v-container xs12>
  <v-layout center xs12>
      <v-flex  xs6 px-1>
        <v-text-field v-on:keyup="onChange" v-model="search"
                label="Busca tu restaurante sin gluten"
                persistent-hint
                color="orange"
                box
                />
      </v-flex>
       <v-flex  xs6 px-1>
        <v-text-field 
                label="Busca en una localidad en concreto"
                persistent-hint
                color="orange"
                box
                />
      </v-flex>
  </v-layout>
  <v-layout wrap>
     <template v-for="(item) in businesses"  v-if="item.id != ''">
       <v-flex xs12 md4 px-1 mb-1 v-bind:key="item.id"  >
          <v-card>
             <v-card-media
                class="white--text"
                height="200px"
                v-bind:src="item.photo" v-bind:key="item.id"
              >
                <v-layout justify-end mr-2 mt-5 v-if="item.average < 999" class="black--text">
                  {{item.average}}
                </v-layout>
             </v-card-media>
              <v-container fill-height fluid ma-0>
                <v-layout row fill-height wrap>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline" v-text="item.name"></span><br>
                    {{item.cityName}}({{item.stateName}})
                  </v-flex>
                </v-layout>
              </v-container>
          </v-card>
       </v-flex>
     </template>
 </v-layout>
</v-container>
</template>

<script>
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import Logo from "~/components/Logo.vue";
import axios from "axios";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      businesses: [
        {
          id: "",
          name: "",
          city: ""
        }
      ]
    };
  },
  methods: {
    onChange() {
      console.log(this.search);
      axios
        .get(
          "https://api.celicidad.net:8081/v1/business/name/" + this.search + "/"
        )
        .then(result => {
          this.businesses = result.data;
          console.log(result);
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
