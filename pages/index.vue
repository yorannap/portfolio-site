<template>
  <div @mousemove="loco">
    <div @scroll="loco" id="projects" data-scroll-container>
      <div class="featured-project" @click="updateClickedProject(project.id)" :class="project.id" data-scroll :data-scroll-section="project.id" v-for="project in projects" :key="project.id">
        <p class="kicker" data-scroll>{{project.kicker}}</p>
        <nuxt-link :to="project.link">
          <div class="project-header">
            <h2 class="project-title-1 project-titles" data-scroll>{{ project.title }}</h2>
          </div>
          <div class="ghost-container">
            <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }"></div>
            <div class="ghost-wrapper">
              <h2 class="project-title-2 project-titles" :style="{color: `${project.textColour}`}" data-scroll>{{ project.title }}</h2>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="background-text">
      <h1>
        Curated
        Projects
      </h1>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
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
      animDuration: 0.5,
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
    ...mapActions(['updateClickedProject']),
    loco(e) {
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
        if(this.firstProject.section !== undefined) {
          this.firstProject.titles = this.firstProject.section.querySelectorAll(".project-titles");
          this.firstProject.kicker = this.firstProject.section.querySelectorAll(".kicker");
          this.firstProject.wrapper = this.firstProject.section.querySelector(".ghost-wrapper");
          this.firstProject.container = this.firstProject.section.querySelector(".ghost-container");
        }
        if(this.secondProject.section !== undefined) {
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

        gsap.to(this.firstProject.titles, {
          y: position -this.mouseOffset.y, 
          x: -this.mouseOffset.x, 
          ease: this.ease, 
          duration: this.animDuration});

        gsap.to(this.firstProject.kicker, {
          y: (position * 0.9) - (this.mouseOffset.y * 1.2), 
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

        gsap.to(this.secondProject.titles, {
          y: position2 -this.mouseOffset.y, 
          x: -this.mouseOffset.x,
          ease: this.ease, 
          duration: this.animDuration});

        gsap.to(this.secondProject.kicker, {
          y: (position2 * 0.9) - (this.mouseOffset.y * 1.2), 
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
    leave(el, done) {
      let projectTitles = el.querySelectorAll('.project-titles');
      let projectKickers = el.querySelectorAll('.kicker');
      let backgroundText = el.querySelectorAll('.background-text');
      console.log(el)
      gsap.to([projectTitles, projectKickers, backgroundText], {
        opacity: 0,
        ease: this.ease, 
        duration: 1,
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
    //this.loco();
  }
}
</script>

<style>

</style>
