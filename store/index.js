import Vuex from 'vuex';
import gsap from 'gsap';
import mainJson from '../assets/main.json';

const createStore = () => {
  return new Vuex.Store({
    state() {
      return {
        throttleWait: false,
        clickedProject: {
          rotation: 0,
          x: 50 + "%",
          y: 700,
          scale: 1,
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
        animActive: false,
        animDuration: 0.5,
        ease: 'inOut',
        projectChange: true,
        singleProject: {
          y: null,
          section: null,
          kicker: null,
          titles: null,
          summary: null,
          container: null
        },
        firstProject: {
          y: null,
          section: null,
          sectionPrev: null,
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
      definingClickedProject(state, projectValues) {
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
        state.secondProject.sectionPrev = state.secondProject.section;
        state.firstProject.sectionPrev = state.firstProject.section;
      },
      updateProjectSections(state, inViewProjectSections) {
        state.firstProject.section = inViewProjectSections[0];
        state.secondProject.section = inViewProjectSections[1];
      },
      updateProjectElements(state) {
        if(state.firstProject.section !== undefined) {
          state.firstProject.titles = state.firstProject.section.querySelectorAll(".project-titles");
          state.firstProject.kicker = state.firstProject.section.querySelectorAll(".kicker");
          state.firstProject.wrapper = state.firstProject.section.querySelector(".ghost-wrapper");
          state.firstProject.container = state.firstProject.section.querySelector(".ghost-container");
        }
        if(state.secondProject.section !== undefined) {
          state.secondProject.titles = state.secondProject.section.querySelectorAll(".project-titles");
          state.secondProject.kicker = state.secondProject.section.querySelectorAll(".kicker");
          state.secondProject.wrapper = state.secondProject.section.querySelector(".ghost-wrapper");
          state.secondProject.container = state.secondProject.section.querySelector(".ghost-container");
        }
      },
      updateSingleProjectElements(state) {
        state.singleProject.titles = document.querySelectorAll(".project-titles");
        state.singleProject.kicker = document.querySelectorAll(".kicker");
        state.singleProject.summary = document.querySelectorAll(".summary");
        state.singleProject.container = document.querySelectorAll(".ghost-container");
      },
      updateMouseOffset(state, [mouseOffsetX, mouseOffsetY]) {
        state.mouseOffset.x = mouseOffsetX;
        state.mouseOffset.y = mouseOffsetY;
      }
    },
    actions: {
      definingClickedProject(context, {projectSlug, rotation, scale}) {
        let projectEl = document.querySelector(`#projects .${projectSlug}`);
        let ghostContainer = projectEl.querySelector('.ghost-container');

        // sizing
        let width = ghostContainer.offsetWidth;
        let height = ghostContainer.offsetHeight;
        let rectWidth = ghostContainer.getBoundingClientRect().width;
        let rectHeight = ghostContainer.getBoundingClientRect().height;

        // positioning
        let x = ghostContainer.getBoundingClientRect().x;
        let y = ghostContainer.getBoundingClientRect().y;
        
        // defining properties
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
        context.commit('definingClickedProject', projectValues);
      },
      mobileAndTabletCheck(context) {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        context.commit('setIsMobileTablet', check)
      },
      locoSingle(context, e) {
        // map range utility function
        function mapRange(value, low1, high1, low2, high2) {
          return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        }

        // throttle function
        function throttle(callback, limit) {
          if (!context.state.throttleWait) {
            callback.call();
            context.state.throttleWait = true;
            setTimeout(function () {
              context.state.throttleWait = false;
            }, limit);
          }
        }
        
        // lock scroll on project click
        let projectsContainer = document.querySelector('#projects');
        if(context.state.animActive === false) {
          projectsContainer.style.overflowY = 'hidden';
          return;
        }
        else {
          throttle(animate, 10);
        }

        function animate(){
          // update locomotive scroll
          context.state.scroll.update();
          // define project elements to animate
          context.commit('updateSingleProjectElements')
          // if mousemove and not mobile or tablet then set new co-ordinates and offset
          if((e !== undefined) && (context.state.isMobileTablet === false)) {
            if (e.type === 'mousemove') {
              let mouseOffsetX = mapRange(e.clientX, 0, window.innerHeight, -10, 10);
              let mouseOffsetY = mapRange(e.clientY, 0, window.innerWidth, -10, 10);
              context.commit('updateMouseOffset', [mouseOffsetX, mouseOffsetY])
            }
          }
          else {
            context.commit('updateMouseOffset', [0, 0])
          }
          // animate project
          if(context.state.singleProject.section !== undefined) {
            gsap.to(context.state.singleProject.titles, {
              y: - context.state.mouseOffset.y, 
              x: - context.state.mouseOffset.x });

            gsap.to([context.state.singleProject.kicker, context.state.singleProject.summary], {
              y: - (context.state.mouseOffset.y * 0.8), 
              x: - context.state.mouseOffset.x * 0.8 });

            gsap.to(context.state.singleProject.container, {
              y: context.state.mouseOffset.y / 2, 
              x: context.state.mouseOffset.x / 2});
          }
        }
      },
      loco(context, e) {
        // map range utility function
        function mapRange(value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        }
        // throttle function
        function throttle(callback, limit) {
          if (!context.state.throttleWait) {
            callback.call();
            context.state.throttleWait = true;
            setTimeout(function () {
              context.state.throttleWait = false;
            }, limit);
          }
        }
        
        // lock scroll on project click
        let projectsContainer = document.querySelector('#projects');
        if(context.state.animActive === false) {
          projectsContainer.style.overflowY = 'hidden';
          return;
        }
        else {
          projectsContainer.style.overflowY = 'visible';
          throttle(animate, 10);
        }
        
        function animate() {
          // update locomotive scroll
          context.state.scroll.update();

          // select and update in view projects
          let inViewProjectSections = document.querySelectorAll(".featured-project.is-inview");
          context.commit('updateProjectSections', inViewProjectSections)

          // check for project change based on change in project sections
          if((context.state.secondProject.sectionPrev !== context.state.secondProject.section)
          || (context.state.firstProject.sectionPrev !== context.state.firstProject.section)) {
            context.commit('projectChange', true);
          }
          else if(context.state.projectChange !== false) {
            context.commit('projectChange', false);
          }
          
          // update project elements on project change
          if(context.state.projectChange) {
            context.commit('updateProjectElements')
          }
          
          // if mousemove and not mobile or tablet then set new co-ordinates and offset
          if((e !== undefined) && (context.state.isMobileTablet === false)) {
            if (e.type === 'mousemove') {
              let mouseOffsetX = mapRange(e.clientX, 0, window.innerHeight, -10, 10);
              let mouseOffsetY = mapRange(e.clientY, 0, window.innerWidth, -10, 10);
              context.commit('updateMouseOffset', [mouseOffsetX, mouseOffsetY])
            }
          }
          else {
            context.commit('updateMouseOffset', [0, 0])
          }
          
          // animate first project
          if(context.state.firstProject.section !== undefined) {
            context.state.firstProject.y = context.state.firstProject.section.getBoundingClientRect().y;

            // mapping limits
            let rotate = mapRange(context.state.firstProject.y, 0, window.innerHeight, -8, 10);
            let position = mapRange(context.state.firstProject.y, 0, window.innerHeight, -120, 100);
            let scale = mapRange(context.state.firstProject.y, 0, window.innerHeight / 2, 1, 1);
            
            // animating text
            gsap.to(context.state.firstProject.titles, {
              y: position - context.state.mouseOffset.y, 
              x: - context.state.mouseOffset.x });
    
            gsap.to(context.state.firstProject.kicker, {
              y: (position * 0.8) - (context.state.mouseOffset.y * 1.2), 
              x: - context.state.mouseOffset.x * 1.2 });
            
            // animating image inversed wrapper with alt text
            gsap.to(context.state.firstProject.wrapper, {
              y: - context.state.mouseOffset.y, 
              x: - context.state.mouseOffset.x, 
              rotate: - rotate, 
              scale: 1 / scale });
    
            gsap.to(context.state.firstProject.container, {
              y: context.state.mouseOffset.y, 
              x: context.state.mouseOffset.x,
              rotate: rotate,
              scale: scale });
          }
          
          // animate second project
          if(context.state.secondProject.section !== undefined) {
            context.state.secondProject.y = context.state.secondProject.section.getBoundingClientRect().y;

            // mapping limits
            let rotate2 = mapRange(context.state.secondProject.y, 0, window.innerHeight, -8, 10);
            let position2 = mapRange(context.state.secondProject.y, 0, window.innerHeight, -120, 100);
            let scale2 = mapRange(context.state.secondProject.y, 0, window.innerHeight / 2, 1, 0.85);
            
            // animating text
            gsap.to(context.state.secondProject.titles, {
              y: position2 - context.state.mouseOffset.y, 
              x: - context.state.mouseOffset.x });
    
            gsap.to(context.state.secondProject.kicker, {
              y: (position2 * 0.8) - (context.state.mouseOffset.y * 1.2), 
              x: -context.state.mouseOffset.x * 1.2 });
              
            // animating image inversed wrapper with alt text
            gsap.to(context.state.secondProject.wrapper, {
              y: - context.state.mouseOffset.y, 
              x: - context.state.mouseOffset.x,
              rotate: - rotate2, 
              scale: 1 / scale2 });
              
            gsap.to(context.state.secondProject.container, {
              y: context.state.mouseOffset.y, 
              x: context.state.mouseOffset.x,
              scale: scale2,
              rotate: rotate2 });
          }
        }
      },
      gsapDefaults(context) {
        gsap.defaults({
          ease: context.state.ease, 
          duration: context.state.animDuration
        });
      },
      init(context) {
        //context.dispatch('preloadImages');
        let scroll = new this._vm.locomotiveScroll({
          el: document.querySelector("body"),
          smooth: false,
          repeat: true,
        });
        context.commit('initScroll', scroll);
        context.dispatch('gsapDefaults');
        context.dispatch('mobileAndTabletCheck');
      }
    },
    getters: {
      clickedProject(state) {
        return state.clickedProject;
      },
      mainJson(state) {
        return mainJson
      }
    }
  })
}

export default createStore