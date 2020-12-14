export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  mode: 'spa',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/style-resources',
  ],
  // styleResources: {
  //   sass: [],
  //   scss: ['~/assets/vars/_*.scss'], //praivate files
  //   less: [],
  //   stylus: []
  //  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    credentials: true,
  },
  publicRuntimeConfig: { //개발과 프로덕션 config 따로 설정해줄 수 있음. 노출되도 되는 것
    baseURL: process.env.BASE_URL || 'https://nuxtjs.org'
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: /@fullcalendar.*/
  },
}
