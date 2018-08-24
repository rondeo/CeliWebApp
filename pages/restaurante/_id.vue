<template mt-0>
<v-container xs12 >
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 md8 >
      <v-card>
        <v-card-media
          class="white--text"
          height="400px"
          v-bind:src="item.photo"
          v-if="item.photo!='no'"
          >
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import Logo from "~/components/Logo.vue";
import axios from "axios";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      item: [
        {
          id: "",
          name: "",
          city: ""
        }
      ]
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
          "https://api.celicidad.net:8081/v1//business/single/" + this.$route.params.id +  "/"
        )
        .then(result => {
          this.item = result.data;
          console.log(result);
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
