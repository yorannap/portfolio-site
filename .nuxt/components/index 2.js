import { wrapFunctional } from './utils'

export { default as TheHeader } from '../../components/TheHeader.vue'

export const LazyTheHeader = import('../../components/TheHeader.vue' /* webpackChunkName: "components/the-header" */).then(c => wrapFunctional(c.default || c))
