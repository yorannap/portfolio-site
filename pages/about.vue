<template>
  <div class="about container page">
    <img :src="profilePic" alt="Yoran's profile picture" class="profile frame">
    <p class="subheading">designer</p>
    <h2>Yoran Nap</h2>
    <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <p>senior designer <a href="https://storbie.com" class="button" target="_blank">@storbie</a></p>
    <p>contact me at <a href="mailto:yoran.nap@gmail.com" class="button">yoran.nap@gmail.com</a></p>
  </div>
</template>

<script>
import gsap from 'gsap';
import imageProfile from "~/assets/memoji.jpg";

export default {
  data() {
    return {
      profilePic: imageProfile
    }
  },
  transition: {
    name: 'about',
    mode: 'out-in',
    css: false,
    appear: true,
    enter(el, done) {
      let page = document.querySelectorAll('.page')[0].children;
      gsap.from(page, {
        y: 100,
        opacity: 0,
        ease: "power3.out",
        stagger: 0.1,
        duration: 1,
        clearProps: "all",
        onComplete: done
      });
    },
    leave(el, done) {
      let page = document.querySelectorAll('.page');
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
p, h2 {
  text-align: center;
}

img.profile {
  border-radius: 50%;
  max-width: 200px;
  margin: auto;
  margin-bottom: 30px;
  display: block;
  
}
</style>