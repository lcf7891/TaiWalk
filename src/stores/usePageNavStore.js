import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePageNavStore = defineStore('PageNav', () => {
  const currentPage = ref(1)

  return {
    currentPage,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageNavStore, import.meta.hot))
}
