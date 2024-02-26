import DefaultTheme from 'vitepress/theme'
import './custom.css'

import Layout from './components/Layout.vue'

import Background from './components/Background.vue'
import SpotlightCursorText from './components/SpotlightCursorText.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Background', Background)
    app.component('SpotlightCursorText', SpotlightCursorText)
  }
}