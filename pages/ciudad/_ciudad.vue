<template >
    <ListBusiness></ListBusiness>
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
    components: {
        ListBusiness
    },
    async fetch({ store, params  }) {
        await store.dispatch('business/getByCity', {value: params.ciudad});
        await store.dispatch('city/get', {value: params.ciudad});
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