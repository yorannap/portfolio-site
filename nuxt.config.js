export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // generate configs
  generate: {
    routes: function() {
      let mainJson = require('./assets/main.json')
      let routes = []
      mainJson.projects.forEach(project => {
        routes.push(`/projects/${project.slug}`)
      });
      return routes
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Yoran Nap ~ Portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" },
      { hid: 'description', name: 'description', content: "Kia ora, I'm Yoran Nap, a designer working from Wellington, Aotearoa/New Zealand." },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/qat8pbi.css' }
    ],
    script: [
      { src: 'https://www.googletagmanager.com/gtag/js?id=UA-134826839-1', defer: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/locomotiveScroll.js",
      mode: "client"
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/color-mode'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
