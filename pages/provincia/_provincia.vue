<template >
    <v-layout x12 row wrap  align-center justify-center>
            <v-layout x12 row wrap  align-center justify-center>
                <h1>{{$store.state.business.list.size}}</h1>
                <h1>aaaa</h1>
            </v-layout>
    <ListBusiness></ListBusiness>
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
    components: {
        ListBusiness
    },
    async fetch({ store, params  }) {
        await store.dispatch('business/getByState', {value: params.provincia});
        await store.dispatch('states/get', {value: params.provincia});
    },
    async beforeMount () {
        await this.load();
    },
    methods: {
        load() {
        console.log(this.search);     
        }
    }
};
</script>