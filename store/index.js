import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state() {
      return {
        clickedProject: {
          rotation: null,
          x: null,
          y: null,
          width: null,
          height: null,
          rectWidth: null,
          rectHeight: null
        }
      }
    },
    mutations: {
      updateClickedProject(state, projectValues) {
        state.clickedProject = projectValues;
      }
    },
    actions: {
      updateClickedProject(context, {projectName, rotation, scale}) {
        // fallback
        if (typeof projectName !== "string") {
          return
        }
        
        let projectEl = document.querySelector(`#projects .${projectName}`)
        let ghostContainer = projectEl.querySelector('.ghost-container')
        projectEl.classList.add('project-clicked');
        // SIZE
        /* let obj2 = window.getComputedStyle(ghostContainer, null);
        let objScale = obj2.getPropertyValue('transform'); */
        /* let scaleFactorX = ghostContainer.getBoundingClientRect().width / ghostContainer.offsetWidth;
        let scaleFactorY = ghostContainer.getBoundingClientRect().height / ghostContainer.offsetHeight; */
        /* console.log(ghostContainer)
        console.log(scaleFactor) */

        let rectWidth = ghostContainer.getBoundingClientRect().width;
        let rectHeight = ghostContainer.getBoundingClientRect().height;

        let width = ghostContainer.offsetWidth * scale;
        let height = ghostContainer.offsetHeight * scale;
        console.log('current width:', width)
        console.log('new width:', ghostContainer.offsetWidth * scale)
        
        // create a new div element
        /* let newDiv = document.createElement("div");
        newDiv.style.height = '20px';
        newDiv.style.width = '20px';
        newDiv.style.backgroundColor = 'red';
        newDiv.style.position = 'absolute';
        ghostContainer.appendChild(newDiv); */
        
        // ANGLE
        /* let angle = 0; 
        let obj = window.getComputedStyle(ghostContainer, null);
        let matrix = obj.getPropertyValue('-webkit-transform') || 
          obj.getPropertyValue('-moz-transform') ||
          obj.getPropertyValue('-ms-transform') ||
          obj.getPropertyValue('-o-transform') ||
          obj.getPropertyValue('transform');

        if (matrix !== 'none') {
          let values = matrix.split('(')[1].split(')')[0].split(',');
          let a = values[0];
          let b = values[1];
          angle = Math.atan2(b, a) * (180/Math.PI);
        }  */

        // POSITION
        //console.log(ghostContainer.getBoundingClientRect())
        let x = ghostContainer.getBoundingClientRect().x;
        let y = ghostContainer.getBoundingClientRect().y;
        
        let projectValues = {
          rotation: rotation,
          x: x,
          y: y,
          width: width,
          height: height,
          rectWidth: rectWidth,
          rectHeight: rectHeight
        }
        context.commit('updateClickedProject', projectValues);
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