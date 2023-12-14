import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

export const useGetDataStore = defineStore('getData', () => {
  // 建立一個有預設 URL 的 axios
  const axiosTDX = axios.create({
    baseURL: 'https://tdx.transportdata.tw/api/basic/v2/Tourism/'
  })

  const ScenicSpotData = ref([])  // 景點資料
  const ActivityData = ref([])  // 活動資料
  const RestaurantData = ref([])  // 餐飲資料

  // 整理資料
  function OrganizeInfo(oldArray, isType) {
    const newArray = oldArray
    oldArray.forEach((item, idx) => {
      // 建立一致的 ID 與 Name
      newArray[idx].ID = item.ScenicSpotID || item.ActivityID || item.RestaurantID
      newArray[idx].Name = item.ScenicSpotName || item.ActivityName || item.RestaurantName
      // 排除沒有 Address 的資料
      if (Object.hasOwn(item, 'Address')) {
        if (!item.City) { // 找出缺少 City 資訊的物件
          // 用 Address 建立 City
          newArray[idx].City = item.Address // 從 Address 取得 City 資訊
            .split('') // 字串分割成陣列
            .slice(0, 3) // 選擇要留下的片段
            .reduce((acc, cur) => acc + cur); // 重新組成字串
        }
      }
    });
    // 儲存整理後的資料
    if (isType === 'ScenicSpot') {
      ScenicSpotData.value = newArray
    } else if (isType === 'Activity') {
      ActivityData.value = newArray
    } else if (isType === 'Restaurant') {
      RestaurantData.value = newArray
    }
  }
  
  // 取得 API 資料
  async function GetData(isType) {
    try {
      const response = await axiosTDX.get(isType)
      OrganizeInfo(response.data, isType)
    } catch (error) {
      console.log(`錯誤資訊 ${error.response.status}：`, error)
    }
  }

  return {
    ScenicSpotData,
    ActivityData,
    RestaurantData,
    OrganizeInfo,
    GetData,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGetDataStore, import.meta.hot))
}
