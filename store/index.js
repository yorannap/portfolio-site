import Vuex from 'vuex';
import gsap from 'gsap';

const createStore = () => {
  return new Vuex.Store({
    state() {
      return {
        clickedProject: {
          rotation: null,
          x: 600,
          y: 1000,
          scale: null,
          width: null,
          height: null,
          rectWidth: null,
          rectHeight: null
        },
        scroll: null,
        isMobileTablet: false,
        mouseOffset: {
          x: 0,
          y: 0
        },
        animActive: true,
        animDuration: 0.5,
        ease: 'inOut',
        windowHeight: null,
        windowWidth: null,
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
          sectionPrev: null,
          titles: null,
          kicker: null,
          wrapper: null,
          container: null
        }
      }
    },
    mutations: {
      updateClickedProject(state, projectValues) {
        state.clickedProject = projectValues;
      },
      setIsMobileTablet(state, check) {
        state.isMobileTablet = check;
      },
      initScroll(state, scroll) {
        state.scroll = scroll;
      },
      projectChange(state, value) {
        state.projectChange = value;
      },
      updateWindowSizes(state) {
        state.windowHeight = window.innerHeight;
        state.windowWidth = window.innerWidth;
      }
    },
    actions: {
      updateClickedProject(context, {projectName, rotation, scale}) {
        let projectEl = document.querySelector(`#projects .${projectName}`);
        let ghostContainer = projectEl.querySelector('.ghost-container');

        // SIZING
        let width = ghostContainer.offsetWidth;
        let height = ghostContainer.offsetHeight;
        let rectWidth = ghostContainer.getBoundingClientRect().width;
        let rectHeight = ghostContainer.getBoundingClientRect().height;

        // POSITION
        let x = ghostContainer.getBoundingClientRect().x;
        let y = ghostContainer.getBoundingClientRect().y;
        
        let projectValues = {
          rotation: rotation,
          x: x,
          y: y,
          scale: scale,
          width: width,
          height: height,
          rectWidth: rectWidth,
          rectHeight: rectHeight
        }
        context.commit('updateClickedProject', projectValues);
      },
      mobileAndTabletCheck(context) {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        context.commit('setIsMobileTablet', check)
      },
      loco(context, e) {
        function mapRange(value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        }
        // lock scroll on project click
        if(context.state.animActive === false) {
          let projectsContainer = document.querySelector('#projects');
          projectsContainer.style.overflowY = 'hidden';
          return;
        }
        // update locomotive scroll
        context.state.scroll.update();

        let inViewProjects = document.querySelectorAll(".featured-project.is-inview");
        context.state.firstProject.section = inViewProjects[0];
        context.state.secondProject.section = inViewProjects[1];

        // check for project change based on existence of the 2nd project
        if(context.state.secondProject.sectionPrev !== context.state.secondProject.section) {
          context.state.secondProject.sectionPrev = context.state.secondProject.section;
          context.commit('projectChange', true);
        }
        else if(context.state.projectChange !== false) {
          context.commit('projectChange', false);
        }
        
        // reselect elements on project change
        if(context.state.projectChange) {
          /* let allProjects = document.querySelectorAll(".featured-project");
          allProjects.forEach(project => {
            project.classList.remove("second");
            project.classList.remove("first");
          }); */
          if(context.state.firstProject.section !== undefined) {
            /* context.state.firstProject.section.classList.add("first");
            context.state.firstProject.section.classList.remove("second"); */
            context.state.firstProject.titles = context.state.firstProject.section.querySelectorAll(".project-titles");
            context.state.firstProject.kicker = context.state.firstProject.section.querySelectorAll(".kicker");
            context.state.firstProject.wrapper = context.state.firstProject.section.querySelector(".ghost-wrapper");
            context.state.firstProject.container = context.state.firstProject.section.querySelector(".ghost-container");
          }
          if(context.state.secondProject.section !== undefined) {
            /* context.state.secondProject.section.classList.add("second");
            context.state.secondProject.section.classList.remove("first"); */
            context.state.secondProject.titles = context.state.secondProject.section.querySelectorAll(".project-titles");
            context.state.secondProject.kicker = context.state.secondProject.section.querySelectorAll(".kicker");
            context.state.secondProject.wrapper = context.state.secondProject.section.querySelector(".ghost-wrapper");
            context.state.secondProject.container = context.state.secondProject.section.querySelector(".ghost-container");
          }
        }
        
        // if mousemove then set new co-ordinates and offset
        if((e !== undefined) && (context.state.isMobileTablet === false)) {
          if (e.type === 'mousemove') {
            let mouseLocationX = e.clientX;
            let mouseLocationY = e.clientY;
            context.state.mouseOffset.x = mapRange(mouseLocationX, 0, context.state.windowHeight, -10, 10);
            context.state.mouseOffset.y = mapRange(mouseLocationY, 0, context.state.windowWidth, -10, 10);
          }
        }
        
        // animate first project
        if(context.state.firstProject.section !== undefined) {
          context.state.firstProject.y = context.state.firstProject.section.getBoundingClientRect().y;
          let rotate = mapRange(context.state.firstProject.y, 0, window.innerHeight, -10, 10);
          let position = mapRange(context.state.firstProject.y, 0, window.innerHeight, -120, 100);
          let scale = mapRange(context.state.firstProject.y, 0, window.innerHeight / 2, 1, 1);
          
          gsap.to(context.state.firstProject.titles, {
            y: position - context.state.mouseOffset.y, 
            x: -context.state.mouseOffset.x, 
            ease: context.state.ease, 
            duration: context.state.animDuration});
  
          gsap.to(context.state.firstProject.kicker, {
            y: (position * 0.8) - (context.state.mouseOffset.y * 1.2), 
            x: -context.state.mouseOffset.x * 1.2,
            ease: context.state.ease, 
            duration: context.state.animDuration});
  
          gsap.to(context.state.firstProject.wrapper, {
            y: -context.state.mouseOffset.y, 
            x: -context.state.mouseOffset.x, 
            rotate: -rotate, 
            scale: 1 / scale,
            ease: context.state.ease, 
            duration: context.state.animDuration});
  
          gsap.to(context.state.firstProject.container, {
            y: context.state.mouseOffset.y, 
            x: context.state.mouseOffset.x,
            rotate: rotate,
            scale: scale,
            ease: context.state.ease, 
            duration: context.state.animDuration});
        }
        
        // animate second project
        if(context.state.secondProject.section !== undefined) {
          context.state.secondProject.y = context.state.secondProject.section.getBoundingClientRect().y;
          let rotate2 = mapRange(context.state.secondProject.y, 0, window.innerHeight, -10, 10);
          let position2 = mapRange(context.state.secondProject.y, 0, window.innerHeight, -120, 100);
          let scale2 = mapRange(context.state.secondProject.y, 0, window.innerHeight / 2, 1, 0.85);
          /* scale2 = 0.8; */
          gsap.to(context.state.secondProject.titles, {
            y: position2 -context.state.mouseOffset.y, 
            x: -context.state.mouseOffset.x,
            ease: context.state.ease, 
            duration: context.state.animDuration});
  
          gsap.to(context.state.secondProject.kicker, {
            y: (position2 * 0.8) - (context.state.mouseOffset.y * 1.2), 
            x: -context.state.mouseOffset.x * 1.2,
            ease: context.state.ease, 
            duration: context.state.animDuration});
  
          gsap.to(context.state.secondProject.wrapper, {
            y: -context.state.mouseOffset.y, 
            x: -context.state.mouseOffset.x,
            rotate: -rotate2, 
            scale: 1 / scale2,
            ease: context.state.ease, 
            duration: context.state.animDuration});
            
          gsap.to(context.state.secondProject.container, {
            y: context.state.mouseOffset.y, 
            x: context.state.mouseOffset.x,
            scale: scale2,
            rotate: rotate2, 
            ease: context.state.ease, 
            duration: context.state.animDuration});
        }
      },
      initScroll(context) {
        let scroll = new this._vm.locomotiveScroll({
          el: document.querySelector("body"),
          smooth: false,
          repeat: true,
        });
        context.commit('initScroll', scroll);
        context.commit('updateWindowSizes')
        context.dispatch('mobileAndTabletCheck');
      }
    },
    getters: {
      clickedProject(state) {
        return state.clickedProject;
      }
    }
  })
}

export default createStore