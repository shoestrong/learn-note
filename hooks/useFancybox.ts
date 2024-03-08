import { onMounted, onBeforeUnmount } from 'vue'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import * as pkg from '@fancyapps/ui'

const { Fancybox } = pkg

export default function useFancybox() {
  onMounted(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {
      mainClass: 'custom-fancybox',
      // closeButton: false,
      // Carousel: {
      //   Navigation: false,
      // },
      // Slideshow: false,
      // Thumbs: false,
      // Toolbar: false,
      // Fullscreen: {
      //   autoStart: false,
      // },
      // groupAttr: 'aa',
      // groupAll: false
    })
  })

  onBeforeUnmount(() => Fancybox.close())
}