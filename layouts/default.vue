<template>
  <div>
    <the-header></the-header>
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import gsap from 'gsap';

export default {
  components: {
    TheHeader
  },
  mounted() {
    // init app
    let init = () => {
      this.$store.dispatch('init');
    }
    init();
    // re-init on window size change
    window.addEventListener("resize", init);
    // console.log mainjson
    console.log(this.$store.getters.mainJson)
    // mount animation
    let childElements = document.querySelectorAll('header')[0].children;
    gsap.from(childElements, {
      opacity: 0,
      scale: 0.95,
      ease: "power1.out",
      duration: 1,
      clearProps: "all",
      delay: 1.25
    });
  }
}
</script>