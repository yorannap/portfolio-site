<template>
  <div @mousemove="locoSingle">
    <div id="projects" class="single" @scroll="locoSingle" data-scroll-container>
      <div class="featured-project" :class="project.slug" data-scroll :data-scroll-section="project.slug">
        <p class="kicker">{{ project.kicker }}</p>
        <div class="project-header">
          <h2 class="project-title-1 project-titles">{{ project.title }}</h2>
        </div>
        <p class="summary">{{ project.introduction }}</p>
        <div class="ghost-container">
          <div class="project-image" :style="`background-image: url(${project.thumbnail})`"></div>
        </div>
      </div>
      <div class="project-content container">
        <section v-for="section in project.sections" :key="section.index" :class="section.type" data-scroll>
          <p v-if="section.type === 'paragraph'">{{ section.data }}</p>
          <h3 v-if="section.type === 'heading'">{{ section.data }}</h3>
          <img v-if="section.type === 'image'" :src="section.data" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapActions } from "vuex";

export default {
  validate(data) {
    // validate that path exists in the main json, otherwise 404
    let validParam = false;
    let allProjects = data.store.getters.mainJson.projects;
    allProjects.forEach(project => {
      if(validParam === true) {
        return;
      }
      else if(project.slug === data.params.slug) {
        validParam = true;
      }
      else {
        validParam = false;
      }
    });
    return validParam
  },
  methods: {
    ...mapActions(["locoSingle"]),
  },
  computed: {
    project() {
      // find project json data from slug
      let slug = this.$route.params.slug;
      let project = this.$store.getters.mainJson.projects.find(project => {
        return project.slug === slug;
      })
      return project;
    },
  },
  transition: {
    name: 'project',
    mode: 'out-in',
    css: false,
    appear: true,
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
@keyframes sections {
  from {
    transform: scale(1.03);
    opacity: 0;
    transition-timing-function: cubic-bezier(0.19,1,0.22,1);
  }
}

.project-content section.is-inview {
  animation-name: sections;
  animation-duration: 1s;
}

.project-content {
  margin-top: 50px;
  max-width: 800px;
}

section.image img {
  margin-top: 20px;
  margin-bottom: 30px;
}

#projects.single .ghost-container,
#projects.single .project-header {
  max-width: 1200px;
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