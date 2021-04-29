<template>
  <div @mousemove="loco">
    <header>
      <div class="logo container">
        <p>yorannap</p>
      </div>
    </header>
    <div @scroll="loco" id="projects" data-scroll-container>
      <div class="featured-project" v-for="projects in projectNo" :key="projects">
        <div class="project-title">
          <p class="kicker" data-scroll data-scroll-speed="2">Graphic design</p>
          <h2 class="project-image-title-1" data-scroll data-scroll-speed="3">Wellington Posters</h2>
        </div>
        <div class="project-image-title-2" style="clip-path: inset(110px 0 0 0);">
          <h2>Wellington Posters</h2>
        </div>
        <button class="wrapper">
          <div class="project-image">
            <div></div>
          </div>
        </button>
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
      projectNo: [1, 1, 1, 1]
    };
  },
  methods: {
    loco(e) {
      this.lmS.update();
      //console.log(this.lmS.el.firstChild.firstChild);
      //console.log(this.lmS.el.firstChild.firstChild.offsetTop);
      //console.log(this.lmS.el.firstChild.firstChild.getBoundingClientRect());
      //console.log(this.lmS.el.firstChild.firstChild.getBoundingClientRect().top);
      let imageText = document.querySelector('.project-image-title-1');
      let projectContainer = document.querySelector('.featured-project').getBoundingClientRect().top;
      let imageText2 = document.querySelector('.project-image-title-2').getBoundingClientRect().top;
      let imageLocation = imageText.getBoundingClientRect().top
      //let imageLocation = imageText.offsetTop;
      let imageCords = Math.round(imageLocation)
      imageText.style.top = imageCords;

      let windowHeight = window.innerHeight;
      function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
      }
      if (e != undefined) {
        let remapX = map_range(e.clientX, 0, windowHeight, -30, 30);
        let remapY = map_range(e.clientY, 0, windowHeight, -30, 30);
        gsap.to("button.wrapper", {x: remapX, y: remapY, ease: "Out", duration: 1});
        gsap.to("button.wrapper div", {x: -remapX/10, y: -remapY/10, ease: "Out", duration: 0.5});
      }
      gsap.to(".project-image-title-2 h2", {y: imageCords - projectContainer, ease: "InOut", duration: 0.2});
      // gsap.to(".project-image", {rotate: remap, ease: "InOut", duration: 0.07});
      // gsap.to(".project-image-title-2", {rotate: -remap, ease: "InOut", duration: 0.1});
    }
  },
  mounted() {
    this.lmS = new this.locomotiveScroll({
      el: document.querySelector("#projects"),
      smooth: true
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

.project-image {
  width: 100%;
  height: 100%;
}

.project-image div {
  background: url('~assets/wellington.jpg');
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;
}

.kicker, .project-title {
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

.project-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  width: 100%;
  line-height: 1em;
}

#projects .featured-project:first-child {
  margin-top: 50vh;
}

button.wrapper {
  margin-top: 100px;
  font-size: 80px;
  position: absolute;
  padding: 0;
  left: 50%;
  max-width: 600px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: pointer;
  transform: translateX(-50%);
  z-index: 1;
  border: 10px solid white;
  border-radius: 20px;
  overflow: hidden;
}

.project-image-title-1 {
  margin-top: 0.5em;
}

.project-image-title-2 {
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  max-width: 600px;
  width: 100%;
  height: 100%;
  color: rgb(245, 206, 78);
  position: absolute;
  text-align: center;
  line-height: 1;
  z-index: 2;
}
</style>
