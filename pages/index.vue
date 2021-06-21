<template>
  <div @mousemove="loco">
    <div class="background-text">
      <div class="line">
       <span>C</span>
       <span>u</span>
       <span>r</span>
       <span>a</span>
       <span>t</span>
       <span>e</span>
       <span>d</span>
      </div>
      <div class="line">
       <span>P</span>
       <span>r</span>
       <span>o</span>
       <span>j</span>
       <span>e</span>
       <span>c</span>
       <span>t</span>
       <span>s</span>
      </div>
    </div>
    <div id="projects" @scroll="loco" data-scroll-container>
      <div class="dummy-project"></div>
      <div
        class="featured-project"
        :class="project.slug"
        data-scroll
        :data-scroll-section="project.slug"
        v-for="project in mainJson.projects"
        :key="project.slug"
      >
        <p class="kicker">{{ project.kicker }}</p>
        <div class="project-header">
          <h2 class="project-title-1 project-titles" @click="clickedProject(project.slug)">{{ project.title }}</h2>
        </div>
        <div class="ghost-container" @click="clickedProject(project.slug)">
          <div class="project-image" :style="`background-image: url(${project.thumbnail})`"></div>
          <div class="ghost-wrapper">
            <h2 class="project-title-2 project-titles" :style="`color: #${project.color}`">
              {{ project.title }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(['mainJson'])
  },
  methods: {
    ...mapActions(["loco"]),
    clickedProject(projectSlug) {
      // add clicked class so leave animation can exclude the clicked project
      let projectEl = document.querySelector(`#projects .${projectSlug}`);
      projectEl.classList.add("project-clicked");
      this.$router.push({ path: `projects/${projectSlug}` });

      // disable future animations
      this.$store.state.animActive = false;

      // delay that waits for running animation to finish before defining the clicked project
      setTimeout(() => {
        let ghostContainer = projectEl.querySelector(".ghost-container");
        let rotation = gsap.getProperty(ghostContainer, "rotate");
        let scale = gsap.getProperty(ghostContainer, "scale");

        // send defined project properties to store
        this.$store.dispatch("definingClickedProject", {
          projectSlug,
          rotation,
          scale,
        });
      }, this.$store.state.animDuration * 1000);
    },
  },
  transition: {
    name: "home",
    mode: "out-in",
    css: false,
    appear: true,
    leave(el, done) {
      let projectsNotClicked = el.querySelectorAll("#projects .featured-project:not(.project-clicked)");
      let projectTitles = el.querySelectorAll(".project-titles");
      let projectKickers = el.querySelectorAll(".kicker");
      let backgroundText = el.querySelectorAll(".background-text");
      gsap.to([projectTitles, projectKickers, backgroundText, projectsNotClicked], {
          opacity: 0,
          scale: 0.95,
          ease: "power3.out",
          duration: 1,
          onComplete: done,
        }
      );
    },
    afterLeave() {
      // re-activate scrolling and animation
      this.$store.state.animActive = true;
    },
    enter(el, done) {
      // animate background text
      let backgroundTextLetters = el.querySelectorAll(".background-text span");
      function calculateOffset(i) {
        let letterWidth = backgroundTextLetters[i].getBoundingClientRect().width;
        let letterPositionX = backgroundTextLetters[i].getBoundingClientRect().x;
        let windowWidth = window.innerWidth;
        let letterPositionCenter = letterPositionX + (letterWidth / 2) - (windowWidth / 2);
        return letterPositionCenter / 3
      }
      gsap.from(backgroundTextLetters, {
        scale: 0.5,
        x: calculateOffset,
        opacity: 0,
        ease: "power3.out",
        duration: 2,
        stagger: 0.02
      });
      // animate first project
      let dummyProject = el.querySelector("#projects .dummy-project");
      let triggerScrollAnim = () => {
        this.$store.dispatch("loco");
      };
      gsap.from(dummyProject, {
        height: 100 + "%",
        ease: "power4.out",
        duration: this.$store.state.animDuration * 2,
        onUpdate: triggerScrollAnim,
        onComplete: done,
        delay: 0.75
      });
    },
  },
  mounted() {
    this.$store.state.animActive = true;
  },
};
</script>

<style scoped>
.ghost-container,
.project-title-1 {
  cursor: pointer;
}
</style>
