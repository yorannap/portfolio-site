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
    let init = () => {
      this.$store.dispatch('init');
    }
    init();
    window.addEventListener("resize", init);
  }
}
</script>