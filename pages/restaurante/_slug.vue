<template >
<v-container>
  <v-container xs12 md12 pt-0 mt-0>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 md12 >
        <v-card  class="elevation-20">
          <v-card-media
            class="black--text"
            height="400px"
            v-bind:src="item.photo"
            v-if="item.photo!='no'"
            >
            <v-container fill-height justify-end>
            <v-layout  justify-end>
              <v-flex xs12  justify-end class="text-xs-right">
                <span class="primaryLight headline" style="font-size: 40px !important;" pa-3>{{ item.name }}</span>
              </v-flex>
            </v-layout>
          </v-container>
          </v-card-media>
           <v-card-media
            class="black--text"
            height="400px"
            src="/foto_generica.png" 
            v-if="item.photo=='no'"
            >
            <v-container fill-height justify-end>
            <v-layout justify-end>
              <v-flex xs12  justify-end class="text-xs-right">
                <span class="primaryLight headline" style="font-size: 40px !important;">{{ item.name }}</span>
              </v-flex>
            </v-layout>
          </v-container>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container fluid grid-list-sm>
      <v-layout row wrap > 
      <v-flex xs12 md4 order-xs2 order-md1>
      <v-layout column wrap>
      <v-flex d-flex order-xs2 order-md1 >
        <v-card>
        {{ item.web}}
        {{ item.phone}}
        </v-card>
      </v-flex>
      <v-flex wrap d-flex v-bind="{ [`grid-list-${size}`]: true }" v-if="imagesCount > 0" order-xs4 order-md1>
            <v-card 
          height="100%" v-if="images != null">
              <v-container ma-0 pa-0> 
                    <v-layout ma-0 pa-0>
                      <v-flex ma-0 pa-1 class="text-xs-right">
                        <span class="primary--text bold"  v-if="images.length > 0">FOTOS DE VISITANTES</span>
                      </v-flex>
                    </v-layout>
              </v-container>
              <v-layout wrap mb-3>
                <v-flex 
                  v-for="(image) in images.slice(0, 4)"
                  v-bind:key="image.id"
                  xs6 pa-1
                >
                  <img :src=image.uri class="image" :alt=item.name width="100%" height="100%" hover>
                </v-flex>
              </v-layout>
              <v-container ma-0 pa-0> 
                    <v-layout ma-0 pa-0>
                      <v-flex ma-0 pa-1 class="text-xs-right">
                        <span class="primary--text bold"  v-if="images.length > 0">VER LAS {{ images.length }} FOTOS</span>
                      </v-flex>
                    </v-layout>
              </v-container>
            </v-card>
          </v-flex>
      <v-flex d-flex order-xs3 order-md1>
        <v-card>
        {{ item.web}}
        {{ item.phone}}
        {{ item.name }}
        </v-card>
      </v-flex>
      </v-layout>
      </v-flex> 
      <v-flex d-flex xs12 md8 offset-xs0 order-xs1 order-md2>
      <v-layout column wrap>
      <v-flex d-flex>
            <v-layout column wrap>
              <v-flex d-flex>
                <v-card >
                  <v-layout  justify-end mt-3 ml-2>
                    <v-flex xs8>
                      <span class="headline" style="font-size: 40px !important;">{{ item.name }}</span>
                    </v-flex>
                    <v-flex xs class=text-xs-right mr-4>
                      <span class="accent--text headline" style="font-size: 40px !important;">{{ item.average }}</span>
                      
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
           </v-flex>
      </v-layout>
      </v-flex>
      </v-layout>
    </v-container>
  </v-container>
  <v-btn
              relative
              dark
              fab
              bottom
              align-end
              mb-5
              right
              color="accent"
            >
              <v-icon>more_vert</v-icon>
  </v-btn>
</v-container>
</template>

<script>
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import Logo from "~/components/Logo.vue";
import axios from "axios";

export default {
  head() {
    return {
      titleTemplate: "%s"
    }
  },
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      item: 
        {
          id: "",
          name: "",
          city: ""
        },
      images: null,
      imagesCount: 0
    };
  },
  async beforeMount () {
    await this.load();
  },
  methods: {
    load() {
      console.log(this.search);
      axios
        .get(
          "https://api.celicidad.net:8081/v1/business/slug/" + this.$route.params.slug + "/"
        )
        .then(result => {
          this.item = result.data;
          this.item.average = Math.floor(result.data.average* 100) / 100;
          console.log(result);
        })
        .catch(e => console.log(e));
      axios
        .get(
          "https://api.celicidad.net:8081/v1/image/business/" + this.$route.params.id + "/"
        )
        .then(result => {
          this.images = result.data;
          this.imagesCount = result.data.length;
          console.log(result);
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style>
.bold { font-weight: bold; }
</style>