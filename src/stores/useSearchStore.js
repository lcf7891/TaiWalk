import { ref } from 'vue'
import { defineStore, acceptHMRUpdate, storeToRefs } from 'pinia'
import { useGetDataStore } from './useGetDataStore'

export const useSearchStore = defineStore('searchData', () => {
  // 載入初始資料
  const getAPI = useGetDataStore()
  const { ScenicSpotData, ActivityData, RestaurantData } = storeToRefs(getAPI)
  // 存放搜尋結果
  const SearchResult = ref(false)
  // 清除資料
  function ResetData() {
    SearchResult.value = false
    // SearchResult.value = [];
    // while (SearchResult.value.length) {
    //   SearchResult.value.pop()
    // }
  }
  // 判斷適用的資料
  function chooseData(type) {
    let tempData = []
    switch (type) {
      case 'ScenicSpot':
        tempData = ScenicSpotData.value
        break
      case 'Activity':
        tempData = ActivityData.value
        break
      case 'Restaurant':
        tempData = RestaurantData.value
        break
      default:
        console.error('choose', type)
        break
    }
    return tempData
  }
  // 日期篩選
  function checkEventTime(data, time) {
    const timestamp = (date) => +new Date(date)
    const tempData = []
    data.forEach(item => {
      const dataTime = timestamp(item.EndTime)
      const userTime = timestamp(time)
      if (dataTime > userTime) {
        tempData.push(item)
      }
    })
    return tempData
  }
  // 搜尋資料
  function SearchInfo(user) {
    // 解構輸入資料
    const { pageStatus, county, keyWord } = user
    // 選擇資料
    let useData = []
    if (pageStatus === 'home') {
      useData = chooseData(user.select)
    } else {
      let dataAry = []
      // 活動資料增加日期篩選
      if (pageStatus === 'Activity') {
        const tempAry = chooseData(pageStatus)
        dataAry = checkEventTime(tempAry, user.date)
      } else {
        dataAry = chooseData(pageStatus)
      }
      // 判斷選擇的城市，取出對應的資料
      switch (county) {
        case 'all':
          useData = dataAry
          break
        default:
          dataAry.forEach(item => {
            if (item.City === county) {
              useData.push(item)
            }
          })
          break
      }
    }
    // 篩選資料
    const searchData = (data, keys) => {
      const tempData = []
      data.forEach(item => {
        const content = Object.values(item).join('')
        keys.forEach(key => {
          if (content.includes(key)) {
            tempData.push(item)
          }
          // 篩選地址
          // const address = String(item.Address).includes(key)
          // 篩選城市
          // const city = String(item.City).includes(key)
          // 篩選名稱
          // const name = String(item.Name).includes(key)
          // 篩選類別
          // const classList = String(item.Class).includes(key)
          // if (address || city || name || classList) {
          //   tempData.push(item)
          // }
        })
      })
      SearchResult.value = tempData
    }
    // 將關鍵字轉陣列並去除陣列空值
    const keyAry = String(keyWord).split(' ').filter(Boolean)
    // 關鍵字有資料時進入篩選
    if (keyAry.length) {
      searchData(useData, keyAry)
    } else {
      SearchResult.value = useData
    }
  }
  // 搜尋類別
  function SearchClass(option, type) {
    const data = chooseData(type)
    SearchResult.value = data.filter(item => String(item.Class).includes(option))
  }
  return {
    SearchResult,
    ResetData,
    SearchInfo,
    SearchClass,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}
