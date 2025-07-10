import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    directives,
    components: {
      ...components,
      ...labsComponents,
    },
    locale: {
      locale: 'pt-BR',
    },
    date: {
      locale: {
        en: 'pt-BR',
      },
    },
  },
  )
  nuxtApp.vueApp.use(vuetify)
})