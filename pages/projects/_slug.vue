<template>
  <div @mousemove="locoSingle">
    <div id="projects" class="single" @scroll="locoSingle" data-scroll-container>
      <div class="featured-project first" :class="project.slug" data-scroll>
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
//import Images from this.nextProject.thumbnail
import gsap from 'gsap';
import { mapActions } from "vuex";

export default {
  beforeRouteEnter(to, from, next) {
    console.log(from)
    if(from.path === '/') {
      let imgEl = document.createElement('img');
      imgEl.src = '/images/wellington.jpg';
      imgEl.onload = function() {
        console.log(imgEl)
        next()
      }
    }
    else {
      next()
    }
    /* loadImage(FeatureImage);
    function loadImage(imagesObject) {
      Object.keys(imagesObject).map((key, index) => {
        const img = new Image();
        img.src = imagesObject[key];
      });
    } */
  },
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
      gsap.from([projectKickers, projectTitles, projectContent, projectSummary], {
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
      let projectsNotClicked = el.querySelectorAll("#projects .featured-project:not(.project-clicked)");
      let projectContent = el.querySelectorAll("#projects .project-content");
      let nextProjectTitle = el.querySelectorAll("#projects .project-titles");
      gsap.to([projectContent, projectsNotClicked, nextProjectTitle], {
          opacity: 0,
          scale: 0.95,
          ease: "power3.out",
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

#projects.single .first .ghost-container,
#projects.single .first .project-header {
  max-width: 1200px;
  width: 90vw;
}

#projects.single .first .ghost-container {
  top: 37rem;
}

#projects.single .first .kicker {
  top: 21rem;
}

.featured-project.first {
  height: 50rem;
}

/*** NEXT PROJECT ***/
.next-project {
  cursor: pointer;
  height: 350px;
  overflow: hidden;
}
.next-project .featured-project {
  height: 100%;
}

.next-project .ghost-container {
  margin-top: 150px;
  transform: translate(-50%, -50%) rotate(10deg);
}
.next-project .project-header {
  z-index: 5;
  top: 70%;
}
</style>