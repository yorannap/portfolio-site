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
    let initScroll = () => {
      this.$store.dispatch('initScroll');
    }
    initScroll();
    window.addEventListener("resize", initScroll);
  }
}
</script>