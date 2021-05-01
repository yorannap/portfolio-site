<template>
  <div @mousemove="loco">
    <header>
      <div class="logo container">
        <p>yorannap</p>
      </div>
    </header>
    <div @scroll="loco" id="projects" data-scroll-container>
      <div class="featured-project" data-scroll :data-scroll-section="projects" v-for="projects in projectNo" :key="projects">
        <div class="project-header">
          <p class="kicker" data-scroll data-scroll-speed="2">Graphic design</p>
          <h2 class="project-title-1" data-scroll data-scroll-speed="3">Wellington Posters</h2>
        </div>
        <div class="ghost-container">
          <h2 class="project-title-2" data-scroll data-scroll-speed="3" data-scroll-delay="0.15">Wellington Posters</h2>
        </div>
        <div class="project-image-container">
          <div></div>
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

      let firstProjectTitle1 = document.querySelectorAll(".project-title-1.is-inview")[0];
      let secondProjectTitle1 = document.querySelectorAll(".project-title-1.is-inview")[1];
      let firstProjectTitle2 = document.querySelectorAll(".project-title-2.is-inview")[0];
      let secondProjectTitle2 = document.querySelectorAll(".project-title-2.is-inview")[1];

      //firstProjectTitle1.style.border = "1px solid green"

      //gsap.to(firstProjectTitle2, {y: this.elementProps.firstProjectTitle1.location.y, ease: "InOut", duration: 0.2});


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
      

      function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
      }
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

.project-image-container div {
  background: url('~assets/wellington.jpg');
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;
}

.kicker, .project-header {
  text-align: center;
}

.featured-project {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 25vh;
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
.ghost-container {
  max-width: 600px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
}

.project-image-container {
  border: 10px solid white;
  margin-top: 100px;
  z-index: 1;
}

.ghost-container {
  /* max-width: 700px!important; */
  clip-path: inset(110px 0 0 0);
  z-index: 2;
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
