<template>
  <div @mousemove="loco">
    <div class="background-text">
      <h1>
        Curated
        Projects
      </h1>
    </div>
    <div id="projects" @scroll="loco" data-scroll-container>
      <div class="dummy-project"></div>
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
      isMobileTablet: false,
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
    mobileAndTabletCheck() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    },
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
        /* let allProjects = document.querySelectorAll(".featured-project");
        allProjects.forEach(project => {
          project.classList.remove("second");
          project.classList.remove("first");
        }); */
        if(this.firstProject.section !== undefined) {
          /* this.firstProject.section.classList.add("first");
          this.firstProject.section.classList.remove("second"); */
          this.firstProject.titles = this.firstProject.section.querySelectorAll(".project-titles");
          this.firstProject.kicker = this.firstProject.section.querySelectorAll(".kicker");
          this.firstProject.wrapper = this.firstProject.section.querySelector(".ghost-wrapper");
          this.firstProject.container = this.firstProject.section.querySelector(".ghost-container");
        }
        if(this.secondProject.section !== undefined) {
          /* this.secondProject.section.classList.add("second");
          this.secondProject.section.classList.remove("first"); */
          this.secondProject.titles = this.secondProject.section.querySelectorAll(".project-titles");
          this.secondProject.kicker = this.secondProject.section.querySelectorAll(".kicker");
          this.secondProject.wrapper = this.secondProject.section.querySelector(".ghost-wrapper");
          this.secondProject.container = this.secondProject.section.querySelector(".ghost-container");
        }
      }

      // if mousemove then set new co-ordinates and offset
      if ((e.type === 'mousemove') && (this.isMobileTablet === false)) {
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
    appear: true,
    leave(el, done) {
    // make sure duration of this animation is > this.animDuration
      let projectNotClicked = el.querySelectorAll('#projects .featured-project:not(.project-clicked)');
      let projectTitles = el.querySelectorAll('.project-titles');
      let projectKickers = el.querySelectorAll('.kicker');
      let backgroundText = el.querySelectorAll('.background-text');
      gsap.to([projectTitles, projectKickers, backgroundText, projectNotClicked], {
        opacity: 0,
        ease: 'power4.out', 
        duration: 0.5,
        onComplete: done
      });
    },
    enter(el, done) {
    // make sure duration of this animation is > this.animDuration
      let dummyProject = el.querySelector('#projects .dummy-project');
      let updateScroll = () => {
        // access the update scroll action through the store
        console.log(this.$store)
      }
      gsap.from(dummyProject, {
        height: 100 + '%',
        ease: 'power4.out', 
        duration: 1,
        onUpdate: updateScroll,
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
    if(this.mobileAndTabletCheck() === true) {
      this.isMobileTablet = true;
    }
    window.addEventListener("resize", this.loco);
  }
}
</script>

<style>
</style>
