<template>
  <div @mousemove="locoSingle">
    <div id="projects" class="single" @scroll="locoSingle" data-scroll-container>
      <div class="featured-project" :class="project.id" data-scroll :data-scroll-section="project.id">
        <p class="kicker">{{ project.kicker }}</p>
        <div class="project-header">
          <h2 class="project-title-1 project-titles">{{ project.title }}</h2>
        </div>
        <p class="summary">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias vitae quos molestias exercitationem adipisci fugiat eaque doloremque blanditiis.</p>
        <div class="ghost-container">
          <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }"></div>
        </div>
      </div>
      <div class="project-content container">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias vitae quos molestias exercitationem adipisci fugiat eaque doloremque blanditiis. Cupiditate doloribus reprehenderit minus exercitationem voluptatum perferendis dignissimos saepe. Deserunt, odit asperiores!</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias vitae quos molestias exercitationem adipisci fugiat eaque doloremque blanditiis. Cupiditate doloribus reprehenderit minus exercitationem voluptatum perferendis dignissimos saepe. Deserunt, odit asperiores!</p>
        <img :src="project.image" />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias vitae quos molestias exercitationem adipisci fugiat eaque doloremque blanditiis. Cupiditate doloribus reprehenderit minus exercitationem voluptatum perferendis dignissimos saepe. Deserunt, odit asperiores!</p>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapActions } from "vuex";
import imageWellington from '~/assets/wellington.jpg';

export default {
  data() {
    return {
      scroll: null,
      project: {
        id: 'project-1',
        kicker: 'graphic design',
        title: 'Wellington Posters',
        link: '/projects/wellington-posters',
        image: imageWellington,
        textColour: '#f5ce4e'
      }
    }
  },
  methods: {
    ...mapActions(["locoSingle"]),
  },
  transition: {
    name: 'project',
    mode: 'out-in',
    css: false,
    appear: false,
    enter(el, done) {
      let ghostContainer = el.querySelector('.ghost-container');
      let projectTitles = el.querySelector('.project-titles');
      let projectKickers = el.querySelector('.kicker');
      let projectSummary = el.querySelector('.summary');
      let projectContent = el.querySelector('.project-content');
      let clickedProject = this.$store.getters.clickedProject;
      gsap.from(ghostContainer, {
        rotate: clickedProject.rotation,
        width: clickedProject.width,
        height: clickedProject.height,
        scale: clickedProject.scale,
        left: clickedProject.x + (clickedProject.rectWidth / 2),
        top: clickedProject.y + (clickedProject.rectHeight / 2),
        ease: "power4.inOut",
        duration: 1,
        clearProps: "all"
      });
      gsap.from([projectTitles, projectKickers, projectContent, projectSummary], {
        y: 20,
        opacity: 0,
        ease: "out", 
        duration: 1,
        delay: 0.75,
        clearProps: "all",
        onComplete: done
      });
    },
    leave(el, done) {
      let page = document.querySelectorAll('.single')[0].children;
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
}
</script>

<style scoped>
#projects.single .ghost-container,
#projects.single .project-header {
  max-width: 1000px;
  width: 90vw;
}

.ghost-container {
  top: 37rem;
}

.kicker {
  top: 21rem;
}

.featured-project {
  height: 50rem;
}
</style>