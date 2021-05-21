<template>
  <div>
    <div class="background-text">
      <h1>Curated Projects</h1>
    </div>
    <div id="projects" @scroll="loco" data-scroll-container>
      <div class="dummy-project"></div>
      <div
        class="featured-project"
        :class="project.id"
        data-scroll
        :data-scroll-section="project.id"
        v-for="project in projects"
        :key="project.id"
      >
        <p class="kicker">{{ project.kicker }}</p>
        <div class="project-header">
          <h2 class="project-title-1 project-titles">{{ project.title }}</h2>
        </div>
        <div class="ghost-container" @click="clickedProject(project.id, project.link)">
          <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }"></div>
          <div class="ghost-wrapper">
            <h2 class="project-title-2 project-titles" :style="{ color: `${project.textColour}` }">
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
import imageWellington from "~/assets/wellington.jpg";
import imagePanda from "~/assets/panda.jpg";

export default {
  data() {
    return {
      projects: [
        {
          id: "project-1",
          kicker: "graphic design",
          title: "Wellington Posters",
          link: "/projects/wellington-posters",
          image: imageWellington,
          textColour: "#f5ce4e",
        },
        {
          id: "project-2",
          kicker: "ui & web design",
          title: "The Red Panda Project",
          link: "/projects/red-panda-project",
          image: imagePanda,
          textColour: "#E6C1B1",
        },
        {
          id: "project-3",
          kicker: "graphic design",
          title: "Wellington Posters",
          link: "/projects/wellington-posters",
          image: imageWellington,
          textColour: "#f5ce4e",
        },
        {
          id: "project-4",
          kicker: "ui & web design",
          title: "The Red Panda Project",
          link: "/projects/red-panda-project",
          image: imagePanda,
          textColour: "#E6C1B1",
        },
        {
          id: "project-5",
          kicker: "graphic design",
          title: "Wellington Posters",
          link: "/projects/wellington-posters",
          image: imageWellington,
          textColour: "#f5ce4e",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["loco"]),
    clickedProject(projectName, projectUrl) {
      // add clicked class so leave animation can exclude the clicked project
      let projectEl = document.querySelector(`#projects .${projectName}`);
      projectEl.classList.add("project-clicked");
      this.$router.push({ path: projectUrl });

      // disable future animations
      this.$store.state.animActive = false;

      // delay that waits for running animation to finish before defining the clicked project
      setTimeout(() => {
        let ghostContainer = projectEl.querySelector(".ghost-container");
        let rotation = gsap.getProperty(ghostContainer, "rotate");
        let scale = gsap.getProperty(ghostContainer, "scale");

        // send defined project properties to store
        this.$store.dispatch("definingClickedProject", {
          projectName,
          rotation,
          scale,
        });

        // re-activate scrolling and animation
        this.$store.state.animActive = true;
      }, this.$store.state.animDuration * 1000);
    },
  },
  transition: {
    name: "home",
    mode: "out-in",
    css: false,
    appear: true,
    leave(el, done) {
      let projectsNotClicked = el.querySelectorAll(
        "#projects .featured-project:not(.project-clicked)"
      );
      let projectTitles = el.querySelectorAll(".project-titles");
      let projectKickers = el.querySelectorAll(".kicker");
      let backgroundText = el.querySelectorAll(".background-text");
      gsap.to(
        [projectTitles, projectKickers, backgroundText, projectsNotClicked],
        {
          opacity: 0,
          ease: "power4.out",
          duration: this.$store.state.animDuration + 0.1,
          onComplete: done,
        }
      );
    },
    enter(el, done) {
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
      });
    },
  },
};
</script>

<style>
</style>
