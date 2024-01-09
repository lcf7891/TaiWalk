import { ref } from 'vue'
import { defineStore, acceptHMRUpdate, storeToRefs } from 'pinia'
import { useGetDataStore } from './useGetDataStore'

export const useSearchStore = defineStore('searchData', () => {
  // 載入初始資料
  const { ScenicSpotData, ActivityData, RestaurantData } = storeToRefs(useGetDataStore())

  const SearchResult = ref([])
  // 清除資料
  function ResetData() {
    while (SearchResult.value.length) {
      SearchResult.value.pop()
    }
  }
  // 篩選資料
  function SearchData(data, keys) {
    const tempAry = []
    if (keys.length > 1) {
      console.log(keys.length)
    } else {    
      data.forEach((item) => {
        // const content = Object.values(item).join('')
        keys.forEach((key) => {
          // const result = content.includes(key)
          // if (result) {
          //   tempAry.push(item)
          // }
          // 篩選地址
          const address = new String(item.Address).includes(key)
          // 篩選城市
          const city = new String(item.City).includes(key)
          // 篩選名稱
          const name = new String(item.Name).includes(key)
          if (address || city || name) {
            tempAry.push(item)
          }
        })
      })
    }
    SearchResult.value = tempAry
  }
  // 判斷搜尋的資料
  function SearchInfo(user) {
    // 處理關鍵字
    const keyAry = String(user.keyWord).trim().split(' ')
    // 依照選擇執行搜尋類別
    const option = user.select
    if (option === 'scenicSpot') {
      SearchData(ScenicSpotData.value, keyAry)
    } else if (option === 'activity') {
      SearchData(ActivityData.value, keyAry)
    } else if (option === 'restaurant') {
      SearchData(RestaurantData.value, keyAry)
    }
  }

  return {
    SearchResult,
    ResetData,
    SearchData,
    SearchInfo,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}
