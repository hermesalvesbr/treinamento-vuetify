import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#1565c0',
            'primary-darken-1': '#0d47a1',
            secondary: '#424242',
            accent: '#2196f3',
            error: '#d32f2f',
            info: '#0288d1',
            success: '#388e3c',
            warning: '#f57c00',
            surface: '#ffffff',
            background: '#fafafa'
          }
        }
      }
    },
    defaults: {
      VBtn: {
        variant: 'text'
      },
      VCard: {
        variant: 'elevated'
      },
      VTextField: {
        variant: 'outlined'
      },
      VSelect: {
        variant: 'outlined'
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})