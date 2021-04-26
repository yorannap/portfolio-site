<template>
  <div>
    <header>
      <div class="logo container">
        <p>yorannap</p>
      </div>
    </header>
    <div id="projects">
      <div class="featured-project">
        <p class="kicker">Graphic design</p>
        <h2 class="project-title">Wellington Posters</h2>
        <div class="project-image">
          <img src="../static/wellington.jpg" alt="Wellington Posters" />
        </div>
      </div>
      <div class="featured-project">
        <p class="kicker">Graphic design</p>
        <h2 class="project-title">Wellington Posters</h2>
        <div class="project-image">
          <img src="../static/wellington.jpg" alt="Wellington Posters" />
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

export default {
  data() {
    return {
      lmS: null
    };
  },
  mounted() {
    this.lmS = new this.locomotiveScroll({
      el: document.querySelector("#projects"),
      smooth: true
    });
      console.log(this.lmS);
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
  width: 94%;
  overflow: scroll;
  height: 100vh;
  margin: auto;
}

.project-image {
  width: 550px;
  height: 400px;
  overflow: hidden;
  margin: auto;
  border-radius: 15px;
  border: 7px solid #fff;
}

.kicker, .project-title {
  text-align: center;
}

.kicker {
  font-weight: 700;
  margin-bottom: 1em;
  text-transform: lowercase;
}

.project-title {
  font-family: warnock-pro-display, serif;
  font-weight: 700;
  font-style: normal;
  font-size: 80px;
  max-width: 600px;
  line-height: 1em;
  margin: auto;
}

.project-image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
