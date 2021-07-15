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
    this.$store.dispatch('init');
    // re-init on window size change
    window.addEventListener("resize", this.$store.dispatch('init'));
    console.log(this.$store.getters.mainJson)
  },
  transition: {
    name: "layout",
    mode: "out-in",
    css: false,
    appear: true,
    enter(el, done) {
      let childElements = document.querySelectorAll('header')[0].children;
      gsap.from(childElements, {
        opacity: 0,
        scale: 0.95,
        ease: "power1.out",
        duration: 1,
        clearProps: "all",
        delay: 1.25,
        onComplete: done
      });
    }
  }
}
</script>