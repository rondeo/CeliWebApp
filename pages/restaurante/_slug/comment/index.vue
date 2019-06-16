<template >
<v-container xs12 pa-0>
  <v-container xs12 mt-0 >
    <v-layout x12 row wrap >
      <v-layout row ma-0 pa-0 xs12 md8 pt-0 >
        <v-flex >
          <v-card-text pt-0 mt-0  >
            <v-layout mt-0 pt-0 > 
              <h3 class="black--text subheading" >  <nuxt-link class="black--text subheading" style="text-decoration: none;" :to="{ path :'/provincia/' + $store.state.business.business.stateSlug}">Opciones sin gluten en {{$store.state.business.business.stateName}} </nuxt-link> / <nuxt-link class="black--text subheading" style="text-decoration: none;" :to="{ path :'/ciudad/' + $store.state.business.business.citySlug}">{{$store.state.business.business.cityName}}</nuxt-link> / {{$store.state.business.business.kindName}} </h3>
            </v-layout>
            <v-layout mt-2  > 
              <h1 class="display-3 black--text bold">{{$store.state.business.business.name}}</h1>
            </v-layout>
          </v-card-text>
          <v-layout  mt-1 >
            <img class="ml-3" v-if="$store.state.business.business.bread == 'S'" src ="/bread.png" alt="Dispone de pan sin gluten">
            <img class="ml-3" v-if="$store.state.business.business.beer == 'S'" src ="/pint.png" alt="Dispone de cerveza sin gluten">
            <img class="ml-3" v-if="$store.state.business.business.dessert == 'S'" src ="/cake.png" alt="Dispone de postres sin gluten">
            <img class="ml-3" v-if="$store.state.business.business.dessert == 'S'" src ="/menu.png" alt="Dispone de menú sin gluten">
            <img class="ml-3" v-if="$store.state.business.business.face == 'S'" src ="/stamp.png" alt="Tiene acuerdo con Asociación de celiacos">
          </v-layout>
          <v-layout mt-2 ml-3 pt-0 > 
            
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row mt-2 pt-3  xs12 md4  >
        <v-flex >
          <v-layout justify-end  pr-2 v-if="$store.state.business.business.votes > 0" id="rating">
              <span class="primary--text display-2 bold"  style="font-size: 40px !important;">{{ $store.state.business.business.average }} </span><span class ="ml-2 black--text headline">  / 10</span>
          </v-layout>
          <v-layout justify-end  v-if="$store.state.business.business.votes > 0">
              <a href="#comment" style="text-decoration: none;"><v-rating  v-model="$store.state.business.business.midaverage" color="primary" background-color="primary" half-increments length=5 readonly ></v-rating></a>
          </v-layout>
          <v-layout  justify-end  pr-2 mt-0 mb-0 pa-0 ma-0 v-if="$store.state.business.business.votes > 0">
              <span class="black--text body-1"> <a href="#comment" style="color:black;text-decoration: none;">( {{ $store.state.business.business.votes }} opiniones )</a> </span>
          </v-layout>
          <v-layout justify-end text--md-end pa-0 ma-0  v-if="$store.state.business.business.votes == 0">
              <span class="black--text subheading"> Sin opiniones aún de este sitio </span>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
  <v-container xs12 md12 pt-0 mt-0>
    <v-layout align-center justify-center row fill-heiht mt-2>
      <v-flex xs12>
        <v-card class="elevation-20" pt-4>
        <v-layout xs12 align-center justify-center  mt-4 pt-4>
           <v-flex xs12 md8 align-center justify-center>
            <p class="display-1 black--text bold align-center justify-center">Tu opinión sobre {{$store.state.business.business.name}}</p>
           <form  method="post" xs12  mt-4 pt-4 >
             <v-card-text xs12 mt-4>
                  <v-textarea  data-vv-name="comment" v-validate="'max:1000'" v-model="$store.state.comment.comment.comment"  name="comment" label="Tu Opinión" type="text" :counter=1000></v-textarea>
                  <v-flex mt-3 pt-3>
                   <v-slider mt-3 pt-3
                    v-model="$store.state.comment.comment.rating"
                    label="Valoracion"
                    thumb-color="accent"
                    :max="10"
                    thumb-label="always"
                  ></v-slider>
                  </v-flex>
              </v-card-text>
              <v-btn type="submit" @click="comment" color="primary">Enviar comentario</v-btn>
            </form>
           </v-flex>
        </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</v-container>
</template>

<script>
import axios from "axios";

export default {
  head() {
    return {
      titleTemplate: this.$store.state.business.business.name + " - %s en " + this.$store.state.business.business.cityName
    }
  },
  data() {
    return { 
      }
    },
  async asyncData ({ params, error, payload }) {
    if (payload) return { item: payload, slug: params.slug}
    else
    return {
      item: 
        {
          id: "",
          name: "",
          city: ""
        }, slug: params.slug
    };
  },
  async fetch({ store, params  }) {
    await store.dispatch('business/show', {slug: params.slug});
  },
  mounted() {
     if (this.$store.state.auth.user==null){
        this.$router.push({ name: 'login', query: { redirect: '/login' } });
      } else {
        this.$store.dispatch('comment/getFromUser', {slug:this.slug, unique_id: this.$store.state.auth.user.unique_id});  
      }
  },
  methods: {
     async comment() {
     }
  }
};
</script>

<style>
.bold { font-weight: bold; }
</style>