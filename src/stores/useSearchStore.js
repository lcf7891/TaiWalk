import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSearchStore = defineStore('searchData', () => {
  const searchResult = ref([])
  // 搜尋資訊
  function SearchInfo(data, keys) {
    const tempData = []
    data.forEach(item => {
      keys.forEach(key => {
        // 比對 address, city, name 與關鍵字相符的為 true
        const address = String(item.Address).match(key)
        const city = String(item.City).match(key)
        const name = String(item.Name).match(key)
        // 比對項目為 true 放入陣列
        if (address || city || name) {
          tempData.push(item)
        }
      })
    })
    searchResult.value = tempData
    console.log(searchResult.value)
  }
  
  return {
    searchResult,
    SearchInfo,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}
