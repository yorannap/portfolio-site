<template>
  <div>
    <the-header></the-header>
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
export default {
  components: {
    TheHeader
  },
  mounted() {
    this.$store.dispatch('init');
    // re-init on window size change
    window.addEventListener("resize", this.$store.dispatch('init'));
    console.log(this.$store.getters.mainJson)
  }
}
</script>