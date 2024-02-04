import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePageChangeStore = defineStore('PageNav', () => {
  const router = useRouter()
  const showDetail = ref({})
  
  function toDetail(item) {
    showDetail.value = item
    router.push({
      path: `/detailed/map/${item.ID}`
    })
  }

  return {
    showDetail,
    toDetail,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageChangeStore, import.meta.hot))
}
