// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Vuetify styles & core
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Icons (Material Design Icons)
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' 

const customTheme = {
  dark: false,
  colors: {
    primary: '#ff4f5a',
    secondary: '#144e70',
    accent: '#f0de7d',
    info: '#2a93d1',
    background: '#eff5fa',
  },
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
})

createApp(App).use(vuetify).mount('#app')
