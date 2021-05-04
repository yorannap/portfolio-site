import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  TheHeader: () => import('../../components/TheHeader.vue' /* webpackChunkName: "components/the-header" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
