import Vuex from 'vuex'

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