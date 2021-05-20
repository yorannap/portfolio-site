<template>
  <div @mousemove="loco">
    <div class="background-text">
      <h1>
        Curated
        Projects
      </h1>
    </div>
    <div id="projects" @scroll="loco" data-scroll-container>
      <div class="featured-project" 
      :class="project.id" 
      data-scroll 
      :data-scroll-section="project.id" 
      v-for="project in projects" 
      :key="project.id">
        <p class="kicker">{{project.kicker}}</p>
        <div class="project-header">
          <h2 class="project-title-1 project-titles">{{ project.title }}</h2>
        </div>
        <div class="ghost-container" @click="updateClickedProject(project.id, project.link)">
          <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }"></div>
          <div class="ghost-wrapper">
            <h2 class="project-title-2 project-titles" :style="{color: `${project.textColour}`}">{{ project.title }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapGetters } from 'vuex'
import imageWellington from '~/assets/wellington.jpg'
import imagePanda from '~/assets/panda.jpg'

export default {
  computed: {
    ...mapGetters(['clickedProject'])
  },
  data() {
    return {
      lmS: null,
      projectNo: ['project-1', 'project-1', 'project-1', 'project-1', 'project-1'],
      projects: [
        {
          id: 'project-1',
          kicker: 'graphic design',
          title: 'Wellington Posters',
          link: '/projects/wellington-posters',
          image: imageWellington,
          textColour: '#f5ce4e'
        },
        {
          id: 'project-2',
          kicker: 'ui & web design',
          title: 'The Red Panda Project',
          link: '/projects/red-panda-project',
          image: imagePanda,
          textColour: '#E6C1B1'
        },
        {
          id: 'project-3',
          kicker: 'graphic design',
          title: 'Wellington Posters',
          link: '/projects/wellington-posters',
          image: imageWellington,
          textColour: '#f5ce4e'
        },
        {
          id: 'project-4',
          kicker: 'ui & web design',
          title: 'The Red Panda Project',
          link: '/projects/red-panda-project',
          image: imagePanda,
          textColour: '#E6C1B1'
        },
        {
          id: 'project-5',
          kicker: 'graphic design',
          title: 'Wellington Posters',
          link: '/projects/wellington-posters',
          image: imageWellington,
          textColour: '#f5ce4e'
        }
      ],
      mouseOffset: {
        x: 0,
        y: 0
      },
      animActive: true,
      animDuration: 0.4,
      ease: 'inOut',
      windowHeight: null,
      windowWidth: null,
      currentProject: null,
      projectChange: true,
      firstProject: {
        y: null,
        section: null,
        kicker: null,
        titles: null,
        wrapper: null,
        container: null
      },
      secondProject: {
        y: null,
        section: null,
        titles: null,
        kicker: null,
        wrapper: null,
        container: null
      }
    };
  },
  methods: {
    updateClickedProject(projectName, projectUrl) {
      // add clicked class so leave animation can exclude the clicked project
      let projectEl = document.querySelector(`#projects .${projectName}`)
      projectEl.classList.add('project-clicked');
      this.$router.push({ path: projectUrl })
      // disable future animations
      this.animActive = false;
      // delay that waits for running animation to finish before recording co-ordinates
      setTimeout(() => {
        let ghostContainer = projectEl.querySelector('.ghost-container')
        let rotation = gsap.getProperty(ghostContainer, "rotate");
        let scale = gsap.getProperty(ghostContainer, "scale");
        this.$store.dispatch('updateClickedProject', {projectName, rotation, scale})
      }, this.animDuration * 1000);
    },
    loco(e) {
      if(this.animActive === false) {
        let projectsContainer = document.querySelector('#projects');
        projectsContainer.style.overflowY = 'hidden';
        return;
      }
      // update locomotive
      this.lmS.update();

      // set state
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      this.firstProject.section = document.querySelectorAll(".featured-project.is-inview")[0];
      this.secondProject.section = document.querySelectorAll(".featured-project.is-inview")[1];

      // check for project change
      if(this.currentProject !== this.firstProject.section) {
        this.projectChange = true;
        this.currentProject = this.firstProject.section;
      }
      else {
        this.projectChange = false;
      }

      // reselect elements on project change
      if(this.projectChange) {
        let allProjects = document.querySelectorAll(".featured-project");
        allProjects.forEach(project => {
          project.classList.remove("second-project");
          project.classList.remove("first-project");
        });
        if(this.firstProject.section !== undefined) {
          this.firstProject.section.classList.add("first-project");
          this.firstProject.section.classList.remove("second-project");
          this.firstProject.titles = this.firstProject.section.querySelectorAll(".project-titles");
          this.firstProject.kicker = this.firstProject.section.querySelectorAll(".kicker");
          this.firstProject.wrapper = this.firstProject.section.querySelector(".ghost-wrapper");
          this.firstProject.container = this.firstProject.section.querySelector(".ghost-container");
        }
        if(this.secondProject.section !== undefined) {
          this.secondProject.section.classList.add("second-project");
          this.secondProject.section.classList.remove("first-project");
          this.secondProject.titles = this.secondProject.section.querySelectorAll(".project-titles");
          this.secondProject.kicker = this.secondProject.section.querySelectorAll(".kicker");
          this.secondProject.wrapper = this.secondProject.section.querySelector(".ghost-wrapper");
          this.secondProject.container = this.secondProject.section.querySelector(".ghost-container");
        }
      }

      // if mousemove then set new co-ordinates and offset
      if (e.type === 'mousemove') {
        let mouseLocationX = e.clientX;
        let mouseLocationY = e.clientY;
        this.mouseOffset.x = this.mapRange(mouseLocationX, 0, this.windowHeight, -10, 10);
        this.mouseOffset.y = this.mapRange(mouseLocationY, 0, this.windowWidth, -10, 10);
      }

      // animate first project
      if(this.firstProject.section !== undefined) {
        this.firstProject.y = this.firstProject.section.getBoundingClientRect().y;
        let rotate = this.mapRange(this.firstProject.y, 0, window.innerHeight, -10, 10);
        let position = this.mapRange(this.firstProject.y, 0, window.innerHeight, -120, 100);
        let scale = this.mapRange(this.firstProject.y, 0, window.innerHeight / 2, 1, 1);
        /* scale = 0.8; */

        gsap.to(this.firstProject.titles, {
          y: position - this.mouseOffset.y, 
          x: -this.mouseOffset.x, 
          ease: this.ease, 
          duration: this.animDuration});

        gsap.to(this.firstProject.kicker, {
          y: (position * 0.8) - (this.mouseOffset.y * 1.2), 
          x: -this.mouseOffset.x * 1.2,
          ease: this.ease, 
          duration: this.animDuration});

        gsap.to(this.firstProject.wrapper, {
          y: -this.mouseOffset.y, 
          x: -this.mouseOffset.x, 
          rotate: -rotate, 
          scale: 1 / scale,
          ease: this.ease, 
          duration: this.animDuration});

        gsap.to(this.firstProject.container, {
          y: this.mouseOffset.y, 
          x: this.mouseOffset.x,
          rotate: rotate,
          scale: scale,
          ease: this.ease, 
          duration: this.animDuration});
      }

      // animate second project
      if(this.secondProject.section !== undefined) {
        this.secondProject.y = this.secondProject.section.getBoundingClientRect().y;
        let rotate2 = this.mapRange(this.secondProject.y, 0, window.innerHeight, -10, 10);
        let position2 = this.mapRange(this.secondProject.y, 0, window.innerHeight, -120, 100);
        let scale2 = this.mapRange(this.secondProject.y, 0, window.innerHeight / 2, 1, 0.85);
        /* scale2 = 0.8; */

        gsap.to(this.secondProject.titles, {
          y: position2 -this.mouseOffset.y, 
          x: -this.mouseOffset.x,
          ease: this.ease, 
          duration: this.animDuration});

        gsap.to(this.secondProject.kicker, {
          y: (position2 * 0.8) - (this.mouseOffset.y * 1.2), 
          x: -this.mouseOffset.x * 1.2,
          ease: this.ease, 
          duration: this.animDuration});

        gsap.to(this.secondProject.wrapper, {
          y: -this.mouseOffset.y, 
          x: -this.mouseOffset.x,
          rotate: -rotate2, 
          scale: 1 / scale2,
          ease: this.ease, 
          duration: this.animDuration});
          
        gsap.to(this.secondProject.container, {
          y: this.mouseOffset.y, 
          x: this.mouseOffset.x,
          scale: scale2,
          rotate: rotate2, 
          ease: this.ease, 
          duration: this.animDuration});
      }
    },
    mapRange(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }
  },
  transition: {
    name: 'home',
    mode: 'out-in',
    css: false,
    leave(el, done) {
    // make sure duration of this animation is > this.animDuration
      let projectNotClicked = el.querySelectorAll('#projects .featured-project:not(.project-clicked)');
      let projectTitles = el.querySelectorAll('.project-titles');
      let projectKickers = el.querySelectorAll('.kicker');
      let backgroundText = el.querySelectorAll('.background-text');
      gsap.to([projectTitles, projectKickers, backgroundText, projectNotClicked], {
        opacity: 0,
        ease: 'out', 
        duration: 0.5,
        onComplete: done
      });
    }
  },
  mounted() {
    this.lmS = new this.locomotiveScroll({
      el: document.querySelector("#projects"),
      smooth: true,
      repeat: true,
    });
    window.addEventListener("resize", this.loco);
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      //console.log(vh);
    });
  }
}
</script>

<style>

</style>
