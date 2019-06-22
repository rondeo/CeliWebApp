<template >
 <v-layout x12 row wrap  align-center justify-center>
     <v-layout xs12 mt-3 mb-3 align-center justify-center>
          <h1 class="display-5 black--text bold ">Restaurantes sin gluten en {{$store.state.city.city.name}}</h1>
     </v-layout>
    <ListBusiness></ListBusiness>
    <v-layout mt-4 mb-4 align-center justify-center v-if="$store.state.business.total > 30">
    <v-pagination mt-0 pt-0 mb-3 pb-3
        v-model=currentPage
        value=currentPage
        :length=Math.floor(($store.state.business.total/30)+1)
        @input="onPageChange"
        :total-visible="5"
    ></v-pagination>
    </v-layout>
 </v-layout>
</template>

<script>
import ListBusiness from "../../components/ListBusiness.vue"
import axios from "axios";

export default {
    head() {
        return {
        titleTemplate: "Restaurantes sin gluten en la ciudad de " + this.$store.state.city.city.name + " - Celicidad"
        }
    },
    data() {
    return { 
      currentPage: 1
        }
    },
    components: {
        ListBusiness
    },
    async fetch({ store, params  }) {
        params.element=0;
        await store.dispatch('business/setTotalSearchCity', {value: params.ciudad})
        await store.dispatch('business/getByCity', {value: params});
        await store.dispatch('city/get', {value: params.ciudad});
    },
    async beforeMount () {
        await this.load();
    },
    methods: {
        load() {
        console.log(this.search);     
        },
        loadBusiness() {
            var states ={
                    ciudad: this.$store.state.city.city.slug,
                    element: (this.currentPage - 1) * 30
                }
            this.$store.dispatch('business/getByCity', {value: states});  
        },
        onPageChange() {
            this.loadBusiness();
        },
    }
};
</script>