<template >
<v-container xs12 pa-0>
  <v-container xs12 mt-0  fill-height class="primary" background-color=primary>
    <v-layout x12 row wrap >
      <v-layout row ma-0 pa-0 xs12 md8 pt-0 >
        <v-flex >
          <v-card-text pt-0 mt-0  >
            <v-layout mt-0 pt-0 > 
              <h3 class="white--text subheading" > Opciones sin gluten en {{item.stateName}} / {{item.cityName}} / {{item.kindName}} </h3>
            </v-layout>
            <v-layout mt-2  > 
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
              <a href="#comment"><v-rating  v-model="item.midaverage" color="accent" background-color="accent" half-increments length=5 readonly ></v-rating></a>
          </v-layout>
          <v-layout  justify-end  pr-2 mt-0 mb-0 pa-0 ma-0 v-if="item.votes > 0">
              <span class="white--text body-1"> <a href="#comment" style="color:white;text-decoration: none;">( {{ item.votes }} opiniones )</a> </span>
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
          <p v-if="item.comment != ''" class ="text-xs-center pt-3 pb-3 title">{{ item.comment}}</p>
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
                  <p class=".display-1 offset-xs3 ml-3 mt-0 bold"  align><a v-bind:href=item.web>  Visita su página web</a></p>
                </div>
                </v-layout>
              </v-flex>
              <v-flex md3 xs12 ml-3 v-if="item.phone != ' ' && item.phone != ''">
                <v-layout fill-height align-center justify-center>
                <p><img src ="/smartphone.png"/></p>
                <div>
                  <h3 class="subheading bold offset-xs3 ml-3 mb-0"  align>TELEFONO</h3>
                  <p class=".display-1 offset-xs3 ml-3 mt-0" align>{{item.phone}}</p>
                </div>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout xs12 wrap justify-center v-if="imagesCount > 0" >
              <v-flex xs12 >
                 <v-layout wrap mt-3  mb-0 justify-center>
                    <v-flex 
                      v-for="(image) in images.slice(0, 4)"
                      v-bind:key="image.id"
                      xs6 md2 pl-1 pr-1  mb-0 wrap :class="{'ml-0 mr-0': $vuetify.breakpoint.smAndDown, 'ml-3 mr-3': $vuetify.breakpoint.mdAndUp}"
                    >
                      <img  mb-0 :src=image.uri style="border-radius: 15px;" class="image" :alt=item.name width="100%" height="150" hover>
                    </v-flex>
                  </v-layout>
              </v-flex>
            </v-layout>
            <v-layout xs12 wrap mt-0 mr-4 v-if="imagesCount > 0" justify-center >
              <v-flex md3 xs12 ml-4 >
                <h3 class=".display-1 bold primary--text text-xs-center">Ver las {{imagesCount}} imagenes</h3>
              </v-flex>
            </v-layout>
            <v-layout xs12 mt-3 ml-4 id="comment" >
              <v-flex md3 xs12 ml-4 >
                <h2 class=".display-1 bold">{{item.votes}} opiniones</h2>
              </v-flex>
            </v-layout>
            <v-layout xs12 wrap justify-center v-if="comments != null" >
              <v-flex d-flex  >
                 <v-layout xs12 mt-3  mb-0 justify-center wrap>
                    <v-flex  ml-5 mr-5
                      v-for="(comment) in comments"
                      v-bind:key="comment.id" xs12 wrap
                    >
                      <v-card xs12 class="primaryLight" pl-5 >
                        <v-flex xs12 pt-4 :class="{'ml-1 mr-1': $vuetify.breakpoint.smAndDown, 'ml-5 mr-5': $vuetify.breakpoint.mdAndUp}" >
                          <v-layout fill-height align-center >
                          <p><v-avatar ml-5 xs4 pl-5
                          >
                            <img :src=comment.avatar alt="avatar" v-if="comment.avatar!=null">
                            <img src=/rounded.png alt="avatar" v-if="comment.avatar==null">
                          </v-avatar></p>
                          <v-flex ml-5 >
                            <span class="title bold primary--text" >{{comment.firstName}} {{comment.lastName}}</span><br>
                            <span class="caption" mt-0>{{comment.tim}}</span>
                          </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-card>
                      <v-card  >
                        <v-flex mt-0 mb-4 ml-5 mr-5 pt-4 pb-4>
                          <span class="body-1">{{comment.comment}}</span>
                        </v-flex>
                      </v-card>
                    </v-flex>
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
      titleTemplate: this.item.name + " - %s en " + this.item.cityName
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
      imagesCount: 0,
      comments: null
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
          "https://api.celicidad.net:8081/v1/image/business/slug/" + this.$route.params.slug + "/"
        )
        .then(result => {
          this.images = result.data;
          this.imagesCount = result.data.length;
          console.log(result);
        })
        .catch(e => console.log(e));
      axios
        .get(
          "https://api.celicidad.net:8081/v1/comment/business/slug/" + this.$route.params.slug + "/"
        )
        .then(result => {
          this.comments = result.data;
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