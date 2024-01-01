import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePageChangeStore = defineStore('PageNav', () => {
  const currentPage = ref(1)
  const showData = ref({})

  function DetermineStatus(state) {
    console.log('pinia', state)
    showData.value = state
  }
  return {
    currentPage,
    showData,
    DetermineStatus
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageChangeStore, import.meta.hot))
}
