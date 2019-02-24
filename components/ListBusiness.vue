<template >
<div id="ListBusiness">
<v-container xs12 pa-0>
    <v-layout x12 row wrap  align-center justify-center>
    <v-flex 
        v-for="(business) in $store.state.business.list"
        v-bind:key="business.id"
       xs12 md10 mt-2 :class="{'ml-2 mr-2': $vuetify.breakpoint.smAndDown, 'ml-1 mr-1': $vuetify.breakpoint.mdAndUp}"
    >
         <nuxt-link  :to="{ path :'/restaurante/' + business.slug}" style="text-decoration: none;" append>
        <v-card xs12 wrap style="border-radius: 15px;">
            <v-layout xs12 wrap fill-height>
                <v-flex xs12 md4>
                    <v-img :src=business.photo :style="{'border-top-left-radius: 15px border-top-right-radius: 15px':$vuetify.breakpoint.smAndDown, 'border-top-left-radius: 15px border-bottom-left-radius: 15px   ': $vuetify.breakpoint.mdAndUp}" max-height="250" :alt=business.name  :aspect-ratio="9/9"  v-if="business.photo!='no'" ></v-img>
                    <v-img src=/rounded.png :style="{'border-top-left-radius: 15px border-top-right-radius: 15px':$vuetify.breakpoint.smAndDown, 'border-top-left-radius: 15px border-bottom-left-radius: 15px': $vuetify.breakpoint.mdAndUp}"  max-height="250" :alt=business.name  :aspect-ratio="9/9" v-if="business.photo=='no'"></v-img>
                </v-flex>
                 <v-flex xs12 md6 :class="{'ml-1 mr-1': $vuetify.breakpoint.smAndDown, 'ml-5 mr-5': $vuetify.breakpoint.mdAndUp}">
                    <v-layout>
                        <v-flex xs12 md8 mt-3 ml-4> 
                            <h1>{{business.name}}</h1>
                            <p class="mt-0 ma-0 pa-0">{{business.cityName}}</p>
                            <p class="mt-0 ma-0 pa-0">{{business.kindName}}</p>
                            <p mt-2 ma-0 pa-0>{{business.address}}</p>
                        </v-flex>
                        <v-flex xs12 md4 text-xs-right mt-4 ml-0 v-if="business.average < 999">
                            <span class="accent--text bold display-1">{{Math.floor(business.average* 100) / 100}}</span>
                            <p mt-4>{{business.votes}} opiniones</p>
                        </v-flex>
                    </v-layout>
                    <v-layout mt-2 ml-4>
                        <p class="subheading" mt-2>{{business.comment}}</p>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card>
         </nuxt-link>
    </v-flex>
    </v-layout>
</v-container>
</div>
</template>