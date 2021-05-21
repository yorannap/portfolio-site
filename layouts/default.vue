<template>
  <div id="layout" @mousemove="loco">
    <the-header></the-header>
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import { mapActions } from "vuex";

export default {
  components: {
    TheHeader
  },
  methods: {
    ...mapActions(["loco"]),
  },
  mounted() {
    let init = () => {
      this.$store.dispatch('init');
    }
    init();
    window.addEventListener("resize", init);
  }
}
</script>