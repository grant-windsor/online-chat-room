<template>
<div class="home">
  <Room v-if="this.$root.$data.user" />
  <HomePage v-else />
</div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'
import Room from '@/components/Room.vue'
import axios from "axios"
export default {
  name: 'Home',
  components: {
    HomePage,
    Room
  },
  async created() {
    try {
      let response = await axios.get('/api/users/one');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
