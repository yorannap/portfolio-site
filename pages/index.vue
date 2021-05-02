<template>
  <div @mousemove="loco">
    <header>
      <div class="logo container">
        <p>yorannap</p>
      </div>
    </header>
    <div @scroll="loco" id="projects" data-scroll-container>
      <div class="featured-project" data-scroll :data-scroll-section="projects" v-for="projects in projectNo" :key="projects">
        <p class="kicker" data-scroll>Graphic design</p>
        <div class="project-header">
          <h2 class="project-title-1 project-titles" data-scroll>Wellington Posters</h2>
        </div>
        <div class="ghost-container">
          <div class="project-image"></div>
          <div class="ghost-wrapper">
            <h2 class="project-title-2 project-titles" data-scroll>Wellington Posters</h2>
          </div>
        </div>
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
export default {
  data() {
    return {
      lmS: null,
      projectNo: ['project-1', 'project-2', 'project-3', 'project-4', 'project-5'],
      mouseOffset: {
        x: 0,
        y: 0
      },
      windowHeight: null,
      windowWidth: null,
      currentProject: null,
      projectChange: true,
      firstProject: {
        section: null,
        titles: null,
        wrapper: null,
        container: null
      },
      secondProject: {
        section: null,
        titles: null,
        wrapper: null,
        container: null
      }
    };
  },
  methods: {
    loco(e) {
      this.lmS.update();
      let animDuration = 2;
      let titleOffsetY = 700;
      let ease = "out";

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
        this.firstProject.titles = this.firstProject.section.querySelectorAll(".project-titles");
        this.secondProject.titles = this.secondProject.section.querySelectorAll(".project-titles");
  
        this.firstProject.wrapper = this.firstProject.section.querySelector(".ghost-wrapper");
        this.secondProject.wrapper = this.secondProject.section.querySelector(".ghost-wrapper");
  
        this.firstProject.container = this.firstProject.section.querySelector(".ghost-container");
        this.secondProject.container = this.secondProject.section.querySelector(".ghost-container");
      }

      // if mousemove then set new co-ordinates and offset
      if (e.type === 'mousemove') {
        let mouseLocationX = e.clientX;
        let mouseLocationY = e.clientY;
        this.mouseOffset.x = this.mapRange(mouseLocationX, 0, this.windowHeight, -10, 10);
        this.mouseOffset.y = this.mapRange(mouseLocationY, 0, this.windowWidth, -10, 10);
      }

      if(this.firstProject.section) {
        let rotate = this.mapRange(this.firstProject.titles[0].getBoundingClientRect().y, 0, window.innerHeight, -10, 10);
        let position = this.mapRange(this.firstProject.titles[0].getBoundingClientRect().y - titleOffsetY, 0, window.innerHeight, -30, 30);

        gsap.to(this.firstProject.titles, {
          y: position -this.mouseOffset.y, 
          x: -this.mouseOffset.x, 
          ease: ease, 
          duration: animDuration});
        gsap.to(this.firstProject.wrapper, {
          y: -this.mouseOffset.y, 
          x: -this.mouseOffset.x, 
          rotate: -rotate, 
          ease: ease, 
          duration: animDuration});
        gsap.to(this.firstProject.container, {
          y: this.mouseOffset.y, 
          x: this.mouseOffset.x,
          rotate: rotate, 
          ease: ease, 
          duration: animDuration / 1.2});
      }

      if(this.secondProject.section) {
        let rotate2 = this.mapRange(this.secondProject.titles[0].getBoundingClientRect().y, 0, window.innerHeight, -10, 10);
        let position2 = this.mapRange(this.secondProject.titles[0].getBoundingClientRect().y - titleOffsetY, 0, window.innerHeight, -30, 30);

        gsap.to(this.secondProject.titles, {
          y: position2 -this.mouseOffset.y, 
          x: -this.mouseOffset.x,
          ease: ease, 
          duration: animDuration});
        gsap.to(this.secondProject.wrapper, {
          y: -this.mouseOffset.y, 
          x: -this.mouseOffset.x,
          rotate: -rotate2, 
          ease: ease, 
          duration: animDuration});
        gsap.to(this.secondProject.container, {
          y: this.mouseOffset.y, 
          x: this.mouseOffset.x,
          rotate: rotate2, 
          ease: ease, 
          duration: animDuration / 1.2});
      }
    },
    mapRange(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }
  },
  mounted() {
    this.lmS = new this.locomotiveScroll({
      el: document.querySelector("#projects"),
      smooth: true,
      repeat: true
    });
    //this.loco();
  }
}
</script>

<style>
header .logo p {
  font-weight: 700;
  display: inline-block;
}

body {
  background-color: #fffbf5;
  font-family: sofia-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  overscroll-behavior: none;
}

h2 {
  font-family: warnock-pro-display, serif;
  font-weight: 700;
  font-style: normal;
  font-size: 80px;
  line-height: 1em;
}

.container {
  max-width: 1320px;
  margin: auto;
  width: 94%;
}

header {
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 80px;
}

.background-text h1 {
  text-transform: uppercase;
  font-weight: 700;
  color: #473126;
  opacity: 0.03;
  width: 100vw;
  height: 100vh;
  text-align: center;
  position: fixed;
  top: 0;
  font-size: 230px!important;
  line-height: 0.85em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: -1;
}

#projects {
  z-index: 5;
  left: 3%;
  width: 94%;
  overflow: scroll;
  height: 100vh;
  margin: auto;
  position: absolute;
}

.kicker, .project-header {
  text-align: center;
}

.featured-project {
  position: relative;
  width: 100%;
  height: 100%;
}

.kicker {
  font-weight: 700;
  margin-bottom: 1em;
  text-transform: lowercase;
  position: absolute;
  width: 100%;
}

.project-header {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  width: 100%;
  line-height: 1em;
}

.project-image-container,
.ghost-container, 
.ghost-wrapper, 
.project-header {
  max-width: 500px;
  max-height: 350px;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.project-image {
  background: url('~assets/wellington.jpg');
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;
}

.ghost-container {
  /* clip-path: inset(110px 0 0 0); */
  z-index: 2;
  border: 10px solid white;
  border-radius: 20px;
  box-sizing: content-box;
  overflow: hidden;
}

.project-title-1,
.project-title-2 {
  cursor: default;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.project-title-2 {
  width: 100%;
  color: rgb(245, 206, 78);
  position: absolute;
  text-align: center;
  line-height: 1;
  z-index: 2;
}

/* [data-scroll-section] {
    border: 1px solid red;
} */
</style>
