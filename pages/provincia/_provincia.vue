<template >
    <v-layout x12 row wrap  align-center justify-center>
     <v-layout xs12 mt-3 mb-3 align-center justify-center>
          <h1 class="display-5 black--text bold">Restaurantes sin gluten en la provincia de {{$store.state.states.stateUnique.name}}</h1>
     </v-layout>
    <ListBusiness></ListBusiness>
    <v-layout mt-4 mb-4 align-center justify-center v-if="$store.state.business.total > 30">
    <v-pagination mt-4 pt-0 mb-3 pb-3
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
        titleTemplate: "Restaurantes sin gluten en la provincia de " + this.$store.state.states.stateUnique.name + " - Celicidad"
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
        await store.dispatch('business/setTotalSearchState', {value: params.provincia})
        await store.dispatch('business/getByState', {value: params});
        await store.dispatch('states/get', {value: params.provincia});
    },
    async beforeMount () {
        await this.load();
    },
    beforeMount () {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        load() {
         console.log(this.search);     
        },
        async onScroll () {
            var scrollPos = window.scrollY
            var winHeight = window.innerHeight
            var docHeight = document.documentElement.scrollHeight
            var perc = 100 * scrollPos / (docHeight - winHeight)
            console.log(perc)
         /*   if (perc > 50) {
                console.log("going for more businesses")
                var states ={
                    provincia: this.$store.state.states.stateUnique.slug,
                    element: 10
                }
                console.log("looking from " + states.element + " for " + states.provincia)
                await this.$store.dispatch('business/addByState', {value: states});
                this.currentPage = this.currentPage + 10;
            }*/
        },
        loadBusiness() {
            var states ={
                    provincia: this.$store.state.states.stateUnique.slug,
                    element: (this.currentPage - 1) * 30
                }
            this.$store.dispatch('business/getByState', {value: states});  
        },
        onPageChange() {
            this.loadBusiness();
        },
    }
};
</script>