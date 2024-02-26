import { onMounted, onBeforeUnmount } from 'vue'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import * as pkg from '@fancyapps/ui'

const { Fancybox } = pkg

export default function useFancybox() {
  onMounted(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {
      mainClass: 'custom-fancybox'
    })
  })

  onBeforeUnmount(() => Fancybox.close())
}