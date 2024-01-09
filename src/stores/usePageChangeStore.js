import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePageChangeStore = defineStore('PageNav', () => {
  const router = useRouter()
  const currentPage = ref(1)
  const showDetail = ref({});

  function toDetail(item) {
    showDetail.value = item
    router.push({
      name: 'Detailed'
    })
  }

  return {
    currentPage,
    showDetail,
    toDetail
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageChangeStore, import.meta.hot))
}
