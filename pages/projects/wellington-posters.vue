<template>
  <div @mousemove="loco">
    <div @scroll="loco" id="projects" class="single" data-scroll-container>
      <div class="featured-project" data-scroll :data-scroll-section="project.id"> 
        <p class="kicker" data-scroll>{{project.kicker}}</p>
          <div class="project-header">
            <h2 class="project-title-1 project-titles" data-scroll>{{ project.title }}</h2>
          </div>
          <div class="ghost-container">
            <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }"></div>
            <div class="ghost-wrapper">
              <h2 class="project-title-2 project-titles" :style="{color: `${project.textColour}`}" data-scroll>{{ project.title }}</h2>
            </div>
          </div>
      </div>
      <div class="project-content">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias vitae quos molestias exercitationem adipisci fugiat eaque doloremque blanditiis. Cupiditate doloribus reprehenderit minus exercitationem voluptatum perferendis dignissimos saepe. Deserunt, odit asperiores!</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias vitae quos molestias exercitationem adipisci fugiat eaque doloremque blanditiis. Cupiditate doloribus reprehenderit minus exercitationem voluptatum perferendis dignissimos saepe. Deserunt, odit asperiores!</p>
        <img :src="project.image" />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias vitae quos molestias exercitationem adipisci fugiat eaque doloremque blanditiis. Cupiditate doloribus reprehenderit minus exercitationem voluptatum perferendis dignissimos saepe. Deserunt, odit asperiores!</p>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import imageWellington from '~/assets/wellington.jpg'

export default {
  data() {
    return {
      lmS: null,
      project: {
        id: 'project-1',
        kicker: 'graphic design',
        title: 'Wellington Posters',
        link: '/projects/wellington-posters',
        image: imageWellington,
        textColour: '#f5ce4e'
      },
      mouseOffset: {
        x: 0,
        y: 0
      },
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
    }
  },
  methods: {
    loco(e) {
      // update locomotive
      this.lmS.update();
      /* let animDuration = 0.5;
      let ease = "inOut";

      // set state
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      this.firstProject.section = document.querySelectorAll(".featured-project.is-inview")[0];

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
          ease: ease, 
          duration: animDuration});

        gsap.to(this.firstProject.kicker, {
          y: (position * 0.9) - (this.mouseOffset.y * 1.2), 
          x: -this.mouseOffset.x * 1.2,
          ease: ease, 
          duration: animDuration});

        gsap.to(this.firstProject.wrapper, {
          y: -this.mouseOffset.y, 
          x: -this.mouseOffset.x, 
          rotate: -rotate, 
          scale: 1 / scale,
          ease: ease, 
          duration: animDuration});

        gsap.to(this.firstProject.container, {
          y: this.mouseOffset.y, 
          x: this.mouseOffset.x,
          rotate: rotate, 
          scale: scale,
          ease: ease, 
          duration: animDuration});
      } */
    },
    mapRange(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }
  },
  transition: {
    name: 'project',
    mode: 'out-in',
    css: false,
    appear: true,
    enter(el, done) {
      let ghostContainer = el.querySelectorAll('.ghost-container');
      let projectTitles = el.querySelectorAll('.project-titles');
      let projectKickers = el.querySelectorAll('.kicker');
      let projectContent = el.querySelectorAll('.project-content');
      gsap.from(ghostContainer, {
        rotate: this.$store.getters.clickedProject.rotation,
        width: this.$store.getters.clickedProject.width,
        height: this.$store.getters.clickedProject.height,
        scale: this.$store.getters.clickedProject.scale,
        left: this.$store.getters.clickedProject.x + (this.$store.getters.clickedProject.rectWidth / 2),
        top: this.$store.getters.clickedProject.y + (this.$store.getters.clickedProject.rectHeight / 2),
        ease: "power4.inOut",
        duration: 1
      });
      gsap.from([projectTitles, projectKickers, projectContent], {
        opacity: 0,
        ease: "out", 
        duration: 1,
        delay: 0.75,
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

<style scoped>
#projects.single .ghost-container, 
#projects.single .ghost-wrapper, 
#projects.single .project-header {
  width: 800px;
  max-width: 1000px;
}

.featured-project {
  height: 90%;
}

.project-content p {
  margin-bottom: 1em;
}

.project-content {
  max-width: 700px;
  width: 90%;
  margin: auto;
}
</style>