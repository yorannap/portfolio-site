<template>
  <div class="about container page">
    <img src="/images/memoji.jpg" alt="Yoran's profile picture" class="profile frame">
    <p class="subheading">{{ mainJson.about.kicker }}</p>
    <h2>{{ mainJson.about.name }}</h2>
    <p v-html="mainJson.about.intro" class="intro"></p>
    <div class="about-content">
      <p v-for="paragraph in mainJson.about.paragraphs" :key="paragraph" v-html="paragraph"></p>
      <nuxt-link to="/" class="button">View projects 👀</nuxt-link>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(['mainJson'])
  },
  transition: {
    name: 'about',
    mode: 'out-in',
    css: false,
    appear: true,
    enter(el, done) {
      let page = document.querySelectorAll('.page')[0].children;
      gsap.from(page, {
        y: 20,
        opacity: 0,
        ease: "power3.out",
        stagger: 0.1,
        duration: 1,
        clearProps: "all",
        onComplete: done
      });
    },
    leave(el, done) {
      let page = document.querySelectorAll('.page')[0].children;
      gsap.to(page, {
        opacity: 0,
        scale: 0.95,
        ease: "power3.out",
        duration: 1,
        clearProps: "all",
        onComplete: done
      });
    }
  }
};
</script>

<style scoped>
.about-content {
  max-width: 600px;
  margin: auto;
}

p.intro {
  font-size: 1.2em;
  line-height: 1.4em;
  margin-bottom: 1.2em!important;
}

p.intro, h2 {
  text-align: center;
  max-width: 800px!important;
  margin: auto;
}

img.profile {
  border-radius: 50%;
  max-width: 200px;
  margin: auto;
  margin-bottom: 30px;
  display: block;
}
</style>