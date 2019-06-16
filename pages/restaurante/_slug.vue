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
    <v-layout xs12 justify-center>
      <p v-if="$store.state.business.business.comment != ''" class ="text-xs-center pt-3 pb-0 mb-0 title">{{ $store.state.business.business.comment}}</p>
    </v-layout>
  </v-container>
  <v-container xs12 md12 pt-0 mt-0>
    <v-flex xs12 mb-3>
        <v-card  class="elevation-20" >
          <v-layout xs12 wrap>
          <v-flex xs12 md8 >
          <v-card-media xs12 md6 
            class="black--text"
            height="400px"
            v-bind:src="$store.state.business.business.photo"
            v-if="$store.state.business.business.photo!='no'"
            >
          </v-card-media>
          </v-flex>
          <v-flex xs12 md4>
            <v-layout xs12 wrap justify-center v-if="$store.state.image.list.length > 0" >
              <v-flex xs12 >
                 <v-layout wrap ma-0 pa-0 justify-left>
                    <v-flex d-flex 
                      v-for="(image) in $store.state.image.list.slice(0, 4)"
                      v-bind:key="image.id"
                      xs6 md6 pa-0 wrap :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-0': $vuetify.breakpoint.mdAndUp}"
                    >
                      <img  :src=image.uri class="image ma-0 pa-0" :alt=$store.state.business.business.name width="100%" height="200px" hover>
                    </v-flex>
                  </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-layout>
        </v-card>
    </v-flex>
    <v-layout align-center justify-center row fill-height mt-0 mb-3>
      <v-flex xs12 >
          <v-card class="pt-3">
            <v-layout xs12 wrap justify-center >
              <v-flex md3 xs12 ml-3 >
                <v-layout fill-height  :class="{'align-left justify-left': $vuetify.breakpoint.smAndDown, 'align-center justify-center': $vuetify.breakpoint.mdAndUp}">
                <p><img src ="/map.png"/></p>
                <div>
                  <h3 class="subheading bold offset-xs3 ml-3 mb-0"  align>DIRECCIÓN</h3>
                  <p class=".display-1 offset-xs3 ml-3 mt-0"  align>{{$store.state.business.business.address}}</p>
                </div>
                </v-layout>
              </v-flex>
              <v-flex md3 xs12 ml-3 v-if="$store.state.business.business.web != ' '" >
                <v-layout fill-height  :class="{'align-left justify-left': $vuetify.breakpoint.smAndDown, 'align-center justify-center': $vuetify.breakpoint.mdAndUp}">
                <p><a v-bind:href=$store.state.business.business.web><img src ="/wifi.png"/></a></p>
                <div>
                  <h3 class="subheading bold offset-xs3 ml-3 mb-0"  align>WEB</h3>
                  <p class=".display-1 offset-xs3 ml-3 mt-0 bold"  align><a v-bind:href=$store.state.business.business.web>  Visita su página web</a></p>
                </div>
                </v-layout>
              </v-flex>
              <v-flex md3 xs12 ml-3 v-if="$store.state.business.business.phone != ' ' && $store.state.business.business.phone != ''">
                <v-layout fill-height :class="{'align-left justify-left': $vuetify.breakpoint.smAndDown, 'align-center justify-center': $vuetify.breakpoint.mdAndUp}">
                <p><img src ="/smartphone.png"/></p>
                <div>
                  <h3 class="subheading bold offset-xs3 ml-3 mb-0"  align>TELEFONO</h3>
                  <p class=".display-1 offset-xs3 ml-3 mt-0" align>{{$store.state.business.business.phone}}</p>
                </div>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row fill-heiht mt-2>
      <v-flex xs12>
        <v-card class="elevation-20" pt-4>
        <v-flex  xs12 md8 mt-3 ml-4 id="comment"  v-if=" this.$store.state.comment.list.length > 0 && $store.state.business.business.votes > 0" wrap >
                  <v-flex md3 mt-3 ml-4 >
                    <h2 class=".display-1 bold pt-3">{{$store.state.business.business.votes}} opiniones</h2>
                  </v-flex>
                </v-flex>
            <v-layout xs12 row wrap>
              <v-flex xs12 md8 wrap v-if="this.$store.state.comment.list.length > 0 && $store.state.business.business.votes > 0">
                <v-flex justify-left wrap  >
                  <v-flex d-flex  wrap >
                    <v-layout mb-2 mt-3 justify-center wrap>
                        <v-flex  :class="{'ml-1': $vuetify.breakpoint.smAndDown, 'ml-5': $vuetify.breakpoint.mdAndUp}" xs12 mt-2 mb-1 
                          v-for="(comment) in this.$store.state.comment.list"
                          v-bind:key="comment.id" wrap
                        >
                          <v-flex xs12 mt-1>
                            <v-flex pt-1 :class="{'ml-1': $vuetify.breakpoint.smAndDown, 'ml-2': $vuetify.breakpoint.mdAndUp}" >
                              <v-layout fill-height>
                              <p><v-avatar ml-5 xs4
                              >
                                <img :src=comment.avatar alt="avatar" v-if="comment.avatar!=null">
                                <img src=/rounded.png alt="avatar" v-if="comment.avatar==null">
                              </v-avatar></p>
                              <v-flex ml-3 >
                                <span class="title bold primary--text" >{{comment.firstName}} {{comment.lastName}}</span><br>
                                <span class="caption" mt-0>{{comment.tim}}</span>
                              </v-flex>
                              <v-flex mt-0 mb-4 :class="{'mr-2': $vuetify.breakpoint.smAndDown, 'mr-5': $vuetify.breakpoint.mdAndUp}" justify-right text-xs-right>
                                <span class="display-1 primaryLight--text bold" justify-right text-xs-right>{{comment.rating}}</span>
                              </v-flex>
                              </v-layout>
                            </v-flex>
                            <v-layout>
                            <v-flex mt-0 mb-4 ml-4 mr-4 >
                              <span class="body-1">{{comment.comment}}</span>
                            </v-flex>
                            </v-layout>
                            <v-spacer primary class="primary"></v-spacer>
                          </v-flex>
                        </v-flex>
                    </v-layout>
                  </v-flex>
                </v-flex>
                <v-flex class="text-xs-center" mt-0 pt-0 mb-3 pb-3 v-if=" Math.floor(($store.state.business.business.votes/10)) > 0">
                  <v-pagination mt-0 pt-0 mb-3 pb-3
                    v-model=currentPage
                    value=currentPage
                    :length=Math.floor(($store.state.business.business.votes/10)+1)
                    @input="onPageChange"
                    :total-visible="5"
                  ></v-pagination>
                </v-flex>
              </v-flex>
                <v-flex xs12 md4 pl-5 pr-5 justify-center mt-5 mb-5>
                  <v-flex class="white" d-flex  v-if="$store.state.nearbusiness.list.length > 0"  >
                    <v-card class="primaryLighter"  >
                      <p class="title bold mt-3 justify-center text-xs-center primaryLighter" >Establecimientos Cercanos</p>
                      <v-flex 
                        v-for="(near) in $store.state.nearbusiness.list.slice(0,5)"
                        v-bind:key="near.id" wrap mb-2 ma-0 pa-0 class="primaryLighter"
                      >
                        <nuxt-link :to="{ path :'/restaurante/' + near.slug}" v-bind:key="near.slug"  style="text-decoration: none;">
                        <v-layout fill-height ml-2 align-center mt-3 mb-2 >
                          <v-layout>
                              <p><v-avatar ml-5 xs4 pl-5
                              >
                                <img :src=near.photo :alt=near.name v-if="near.photo!='no'">
                                <img src=/rounded.png :alt=near.photo v-if="near.photo=='no'">
                              </v-avatar></p>
                              <v-flex ml-2 >
                                <span class="accent--text bold subheading" >{{near.name}}</span><br>
                                <span class="body-1 black--text" mt-0>{{near.kindName}}</span>
                                <v-layout class="body-1 black--text  mb-0 mr-2" mt-0 mb-0><v-flex class=" text-xs-left body-2">{{Math.floor(near.distance* 100) / 100}} km</v-flex></v-layout>
                              </v-flex>
                          </v-layout>
                          <v-flex class=" text-xs-right primaryDark--text bold title" mr-2 v-if="near.votes>0 && near.average < 999"> {{Math.floor(near.average* 100) / 100}}</v-flex>
                        </v-layout>
                        </nuxt-link>
    
                      </v-flex>
                    </v-card>
                  </v-flex>
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
      titleTemplate: this.$store.state.business.business.name + " - %s en " + this.$store.state.business.business.cityName
    }
  },
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return { currentPage: 1}
    },
  async asyncData ({ params, error, payload }) {
    if (payload) return { item: payload}
    else
    return {
      item: 
        {
          id: "",
          name: "",
          city: ""
        }
    };
  },
  async fetch({ store, params  }) {
    await store.dispatch('business/show', {slug: params.slug});
    await store.dispatch('nearbusiness/get', {slug: params.slug});
    await store.dispatch('comment/get', {slug: params.slug, element: 0});
    await store.dispatch('image/get', {slug: params.slug});
  },
  mounted() {
    this.loadComments();
  },
  methods: {
    loadComments() {
      this.$store.dispatch('comment/get', {slug: this.$store.state.business.business.slug, element: this.currentPage - 1});  
    },
    onPageChange() {
      this.loadComments();
    }
  }
};
</script>

<style>
.bold { font-weight: bold; }
</style>