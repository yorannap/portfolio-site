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
      elementProps: {
        firstProjectTitle1: {
          location: null
        },
        secondProjectTitle1: {
          location: null
        },
        firstImage: {
          location: null
        },
        secondImage: {
          location: null
        }
      }
    };
  },
  methods: {
    loco(e) {
      this.lmS.update();
      let animDuration = 2;
      let titleOffsetY = 500;
      let ease = "power2.out";
      let mouseX;
      let mouseY;

      let firstProject = document.querySelectorAll(".featured-project.is-inview")[0];
      let secondProject = document.querySelectorAll(".featured-project.is-inview")[1];

      let firstTitles = firstProject.querySelectorAll(".project-titles");
      let secondTitles = secondProject.querySelectorAll(".project-titles");

      let firstGhostWrapper = firstProject.querySelector(".ghost-wrapper");
      let firstGhostContainer = firstProject.querySelector(".ghost-container");

      let secondGhostWrapper = secondProject.querySelector(".ghost-wrapper");
      let secondGhostContainer = secondProject.querySelector(".ghost-container");

      if (e != undefined) {
        mouseX = map_range(e.clientX, 0, window.innerWidth, -30, 30);
        mouseY = map_range(e.clientY, 0, window.innerHeight, -30, 30);
        // console.log(mouseX, mouseY)
      }

      if(firstProject) {
        let rotate = map_range(firstTitles[0].getBoundingClientRect().y, 0, window.innerHeight, -10, 10);
        let position = map_range(firstTitles[0].getBoundingClientRect().y - titleOffsetY, 0, window.innerHeight, -50, 50);

        gsap.to(firstTitles, {y: position + mouseY, x: mouseX, ease: ease, duration: animDuration});
        gsap.to(firstGhostWrapper, {rotate: -rotate, ease: ease, duration: animDuration});
        gsap.to(firstGhostContainer, {y: mouseY, x: mouseX, rotate: rotate, ease: ease, duration: animDuration});
      }

      if(secondTitles) {
        let rotate2 = map_range(secondTitles[0].getBoundingClientRect().y, 0, window.innerHeight, -10, 10);
        let position2 = map_range(secondTitles[0].getBoundingClientRect().y - titleOffsetY, 0, window.innerHeight, -50, 50);

        gsap.to(secondTitles, {y: position2, ease: ease, duration: animDuration});
        gsap.to(secondGhostWrapper, {rotate: -rotate2, ease: ease, duration: animDuration});
        gsap.to(secondGhostContainer, {rotate: rotate2, ease: ease, duration: animDuration});
      }

      function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
      }
      /* if(secondProjectTitle1) {
        secondProjectTitle1.style.border = "1px solid orange"
        this.elementProps.secondProjectTitle1.location = secondProjectTitle1 ? secondProjectTitle1.getBoundingClientRect() : null;
        gsap.to(secondProjectTitle2, {y: this.elementProps.secondProjectTitle1.location.y - projectContainer2s - 189, ease: "InOut", duration: 0.2});
      } */



      /* let imageText = document.querySelector('.project-title-1');
      let projectContainer = document.querySelector('.featured-project').getBoundingClientRect().top;
      let imageText2 = document.querySelector('.project-title-2').getBoundingClientRect().top;
      let imageLocation = imageText.getBoundingClientRect().top */
      //let imageLocation = imageText.offsetTop;
      /* let imageCords = Math.round(imageLocation) */
      /* imageText.style.top = imageCords; */
      

      /* if (e != undefined) {
        let remapX = map_range(e.clientX, 0, windowHeight, -30, 30);
        let remapY = map_range(e.clientY, 0, windowHeight, -30, 30);
        //gsap.to("button.wrapper", {x: remapX, y: remapY, ease: "Out", duration: 1});
        //gsap.to("button.wrapper div", {x: -remapX/10, y: -remapY/10, ease: "Out", duration: 0.5});
      } */
    }
  },
  mounted() {
    this.lmS = new this.locomotiveScroll({
      el: document.querySelector("#projects"),
      smooth: true,
      repeat: true
    });
    this.loco();
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
  margin-top: 0.5em;
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
