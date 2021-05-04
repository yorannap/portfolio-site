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
          height: null
        }
      }
    },
    mutations: {
      updateClickedProject(state, projectValues) {
        console.log('yes')
        state.clickedProject = projectValues;
      }
    },
    actions: {
      updateClickedProject(context, projectName) {
        // fallback
        if (typeof projectName !== "string") {
          return
        }

        let projectEl = document.querySelector(`#projects .${projectName}`)
        let ghostContainer = projectEl.querySelector('.ghost-container')

        // SIZE
        let width = ghostContainer.getBoundingClientRect().width;
        let height = ghostContainer.getBoundingClientRect().height;

        // ANGLE
        let angle = 0; 
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
        } 

        let projectValues = {
          rotation: angle,
          x: null,
          y: null,
          width: width,
          height: height
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