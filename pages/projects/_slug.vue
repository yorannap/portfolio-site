<template>
  <div @mousemove="locoSingle">
    <div id="projects" class="single" @scroll="locoSingle" data-scroll-container>
      <div class="featured-project main" :class="project.slug" data-scroll>
        <p class="subheading">{{ project.kicker }}</p>
        <h2 class="project-titles">{{ project.title }}</h2>
        <p class="summary">{{ project.introduction }}</p>
        <div class="ghost-container">
          <div class="project-image" :style="`background-image: url(${project.thumbnail})`"></div>
        </div>
      </div>

      <div class="project-content container">
        <section v-if="project.link">
          <a :href="project.link.data" target="_blank" class="featured-button">{{ project.link.text }}</a>
        </section>
        <section v-for="section in project.sections" :key="section.index" :class="section.type" data-scroll>
          <div v-if="section.type === 'heading'">
            <h3>{{ section.data }}</h3>
          </div>
          <div v-if="section.type === 'subtitle'">
            <h4>{{ section.data }}</h4>
          </div>
          <div v-if="section.type === 'image'">
            <img :src="section.data" />
            <p class="caption">{{ section.caption }}</p>
          </div>
          <div v-if="section.type === 'paragraph'">
            <p>{{ section.data }}</p>
          </div>
          <div v-if="section.type === 'list'">
            <ol>
              <li v-for="item in section.data" :key="item">{{ item }}</li>
            </ol>
          </div>
          <div v-if="section.type === 'link'">
            <a :href="project.link.data" target="_blank" class="featured-button">{{ project.link.text }}</a>
          </div>
        </section>
      </div>

      <div class="next-project" @scroll="locoSingle" data-scroll-container @click="clickedProject(nextProject.slug)">
        <div class="featured-project" :class="nextProject.slug" data-scroll>
          <div class="project-header">
            <h2 class="project-title-1 project-titles">Next Project</h2>
          </div>
          <div class="ghost-container">
            <div class="project-image" :style="`background-image: url(${nextProject.thumbnail})`"></div>
          </div>
        </div>
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
    clickedProject(projectSlug) {
      // add clicked class so leave animation can exclude the clicked project
      let projectEl = document.querySelector(`#projects .${projectSlug}`);
      projectEl.classList.add("project-clicked");
      this.$router.push({ path: `/projects/${projectSlug}` });

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
  computed: {
    project() {
      // find project json data from slug
      let slug = this.$route.params.slug;
      let project = this.$store.getters.mainJson.projects.find(project => {
        return project.slug === slug;
      })
      return project;
    },
    nextProject() {
      let nextProject;
      let allProjects = this.$store.getters.mainJson.projects;
      // loop through projects to find current one, then define next or first project
      allProjects.forEach((project, index) => {
        if (project === this.project) {
          if(index === (allProjects.length - 1)) {
            nextProject = allProjects[0]
          }
          else {
            nextProject = allProjects[index + 1]
          }
        }
      });
      return nextProject;
    }
  },
  transition: {
    name: 'project',
    mode: 'out-in',
    css: false,
    appear: true,
    enter(el, done) {
      let projectSummary = el.querySelectorAll('.featured-project p');
      let projectTitle = el.querySelector('.featured-project h2');
      let ghostContainer = el.querySelector('.ghost-container');
      let projectContent = el.querySelector('.project-content');
      let clickedProject = this.$store.getters.clickedProject;
      gsap.from(ghostContainer, {
        rotate: clickedProject.rotation,
        opacity: clickedProject.opacity,
        width: clickedProject.width,
        height: clickedProject.height,
        scale: clickedProject.scale,
        left: clickedProject.x + (clickedProject.rectWidth / 2),
        top: clickedProject.y + (clickedProject.rectHeight / 2),
        ease: "power4.inOut",
        duration: 1,
        /* clearProps: "all" */
      });
      gsap.from([projectTitle, projectContent, projectSummary], {
        y: 20,
        opacity: 0,
        ease: "out", 
        duration: 1,
        delay: 0.75,
        /* clearProps: "all", */
        onComplete: done
      });
    },
    leave(el, done) {
      let projectsNotClicked = el.querySelectorAll("#projects .featured-project:not(.project-clicked)");
      let projectContent = el.querySelectorAll("#projects .project-content");
      let nextProjectTitle = el.querySelectorAll("#projects .project-titles");
      gsap.to([projectContent, projectsNotClicked, nextProjectTitle], {
          opacity: 0,
          ease: "inOut",
          duration: 1,
          onComplete: done,
        }
      );
    }
  },
  beforeEnter(to, from, next) {
    loadImage(Digital);
  },
  mounted() {
    this.$store.state.animActive = true;
  },
}
</script>

<style scoped>
@keyframes images {
  from {
    transform: scale(0.95);
    opacity: 0;
    transition-timing-function: cubic-bezier(0, 0.8, 0, 1);
  }
}

.subheading {
  padding-top: 130px;
}

.summary {
  text-align: center;
  width: 90vw;
  max-width: 800px;
  margin: auto;
}

.project-content section.image.is-inview {
  animation-name: images;
  animation-duration: 0.7s;
}

h2 {
  margin-top: 0.4em;
}

h3 {
  font-size: 150%;
}

h4 {
  font-size: 120%;
}

h3, h4 {
  margin-top: 5%;
  margin-bottom: 1%;

}

ol {
  margin-left: 2.5em;
  margin-bottom: 1em;
}

li::marker {
  font-weight: 700;
}

.project-content {
  margin-top: 50px;
}

section {
  max-width: 600px;
  margin: auto;
}

section.image {
  max-width: 850px;
  margin: 50px auto;
}

section.image img {
  box-shadow: 0px 5px 50px var(--shadow-color);
}

section.image .caption {
  font-size: 80%;
  max-width: 600px;
  margin: 5px auto 0 auto;
  color: #999;
  text-align: center;
}

.featured-project.main .ghost-container,
.featured-project.main .project-header {
  max-width: 1200px;
  width: 90vw;
}

.featured-project.main .ghost-container {
  top: 28em;
}

@media only screen and (max-height: 600px) {
  .featured-project.main .ghost-container {
    top: 25em;
  }
}

/*** NEXT PROJECT ***/
.next-project {
  cursor: pointer;
  height: 350px;
  overflow: hidden;
}
.next-project .featured-project {
  min-height: 100%;
}

.next-project .ghost-container {
  margin-top: 150px;
  transform: translate(-50%, -50%) rotate(10deg);
}
.next-project .project-header {
  z-index: 5;
  top: 55%;
}

/* FEATURED BUTTON */
a.featured-button {
  display: block;
  margin: auto;
  margin-bottom: 2em;
  text-align: center;
  text-decoration: none;
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab, #eccb67);
	background-size: 500% 500%;
	animation: gradient 5s infinite;
  border-radius: 0.5em;
  border: none;
  padding: 20px;
  color: white;
}

a.featured-button:hover {
  opacity: 0.8;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>