<template >
<v-container xs12 pa-0>
  <v-container xs12 mt-0  fill-height class="primary" background-color=primary>
    <v-layout x12 row wrap >
      <v-layout row ma-0 pa-0 xs12 md8 pt-0 >
        <v-flex >
          <v-card-text pt-0 mt-0  >
            <v-layout mt-0 pt-0 > 
              <h3 class="white--text subheading" > Opciones sin gluten en {{item.stateName}} / {{item.cityName}} / {{kind}} </h3>
            </v-layout>
            <v-layout mt-4  > 
              <h1 class="display-3 white--text bold">{{ item.name }}</h1>
            </v-layout>
          </v-card-text>
          <v-layout  mt-3 >
            <img class="ml-3" v-if="item.bread == 'S'" src ="/bread.png" alt="Dispone de pan sin gluten">
            <img class="ml-3" v-if="item.beer == 'S'" src ="/pint.png" alt="Dispone de cerveza sin gluten">
            <img class="ml-3" v-if="item.dessert == 'S'" src ="/cake.png" alt="Dispone de postres sin gluten">
            <img class="ml-3" v-if="item.dessert == 'S'" src ="/menu.png" alt="Dispone de menú sin gluten">
          </v-layout>
          <v-layout mt-2 ml-3 pt-0 > 
            
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row mt-2 pt-3  xs12 md4  >
        <v-flex >
          <v-layout justify-end  pr-2 v-if="item.votes > 0">
              <span class="accent--text display-2 bold"  style="font-size: 40px !important;">{{ item.average }} </span><span class ="ml-2 white--text headline">  / 10</span>
          </v-layout>
          <v-layout justify-end  v-if="item.votes > 0">
            <v-rating  v-model="item.midaverage" color="accent" background-color="accent" half-increments="true" length=5 readonly ></v-rating>
          </v-layout>
          <v-layout  justify-end  pr-2 mt-0 mb-0 pa-0 ma-0 v-if="item.votes > 0">
              <span class="white--text body-1"> ( {{ item.votes }} opiniones ) </span>
          </v-layout>
          <v-layout justify-end text--md-end pa-0 ma-0  v-if="item.votes == 0">
              <span class="white--text subheading"> Sin opiniones aún de este sitio </span>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
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
              </v-flex>
            </v-layout>
          </v-container>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row fill-height mt-0>
      <v-flex d-flex xs12 >
          <v-card class="pt-3">
          <p v-if="item.comment != ''" class ="text-xs-center  pb-3 title">{{ item.comment}}</p>
          <v-layout xs12 wrap justify-center >
          <v-flex md3 xs12 ml-3 >
            <v-layout fill-height align-center justify-center>
            <p><img src ="/map.png"/></p>
            <div>
              <h3 class="subheading bold offset-xs3 ml-3 mb-0"  align>DIRECCIÓN</h3>
              <p class=".display-1 offset-xs3 ml-3 mt-0"  align>{{item.address}}</p>
            </div>
            </v-layout>
          </v-flex>
          <v-flex md3 xs12 ml-3 v-if="item.web != ' '" >
            <v-layout fill-height align-center justify-center>
            <p><a v-bind:href=item.web><img src ="/wifi.png"/></a></p>
            <div>
              <h3 class="subheading bold offset-xs3 ml-3 mb-0"  align>WEB</h3>
              <p class=".display-1 offset-xs3 ml-3 mt-0"  align><a v-bind:href=item.web>  Visita su página web</a></p>
            </div>
            </v-layout>
          </v-flex>
          <v-flex md3 xs12 ml-3 v-if="item.phone != ' ' && item.phone != ''">
            <v-layout fill-height align-center justify-center>
            <p><img src ="/smartphone.png"/></p>
            <div>
              <h3 class="subheading bold offset-xs3 ml-3 mb-0"  align>TELEFONO</h3>
              <p class="subheading offset-xs3 ml-3 mt-0" align>{{item.phone}}</p>
            </div>
            </v-layout>
          </v-flex>
          </v-layout>
          </v-card>
      </v-flex>
    </v-layout>

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
  async asyncData ({ params, error, payload }) {
    if (payload) return { item: payload,
      images: null,
      imagesCount: 0 }
    else
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
          this.item.midaverage = this.item.average/2;
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