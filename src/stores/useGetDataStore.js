import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

export const useGetDataStore = defineStore('getData', () => {
  // 建立一個有預設 URL 的 axios
  const axiosTDX = axios.create({
    baseURL: 'https://tdx.transportdata.tw/api/basic/v2/Tourism/'
  })
  // 景點資料
  const ScenicSpotData = ref([])
  // 活動資料
  const ActivityData = ref([])
  // 餐飲資料
  const RestaurantData = ref([])
  // 圖片資訊
  function PictureObjToAry(data) {
    const resAry = []
    // 排除沒有 PictureUrl1 的資料
    if (Object.hasOwn(data.Picture, 'PictureUrl1')) {
      // 將物件的 value 取出成陣列
      const valAry = Object.values(data.Picture)
      // 篩選圖片格式
      const imgAry = []
      valAry.forEach((val, idx) => {
        // 取出附檔名
        const extensionKey = val.split('.').reverse()[0]
        // 建立檢查的格式
        const imgFormat = /(jpe?g|png|gif|svg)/
        // 判斷圖片格式
        if (imgFormat.test(extensionKey)) {
          imgAry.push({
            // idx 紀錄原始陣列索引
            idx,
            url: val,
          })
        }
      })
      // 配對圖片網址與描述，建立一個新陣列
      imgAry.forEach((item) => {
        // 使用圖片原始位置推算對應的描述位置
        const descIdx = item.idx + 1
        const obj = {
          PictureUrl: item.url,
          PictureDescription: valAry[descIdx],
        }
        resAry.push(obj)
      })
    }
    return resAry
  }
  // 類別處理
  function ClassObjToAry(data) {
    // 取出物件的 key
    const keyAry = Object.keys(data)
    // 從取出的 key 篩選出 Class
    const classAry = keyAry.filter((item) => item.match(/Class/))
    // 宣告暫存陣列
    const tempAry = []
    // 存放 key 陣列有資料時執行
    if (classAry.length) {
      // 依序把資料套用 key 放入暫存的陣列
      classAry.forEach((item) => {
        tempAry.push(data[item])
      })
    }
    // 將陣列相同的內容篩除並回傳
    return tempAry.filter((el, idx, ary) => ary.indexOf(el) === idx)
  }
  // 城市資訊
  function CheckCityObjects(data) {
    let resStr = ''
    // 找出缺少 City 項目的物件
    if (!Object.hasOwn(data, 'City')) {
      // 排除沒有 Address 的資料
      if (Object.hasOwn(data, 'Address')) {
        // 從 Address 取得 City 資訊將字串分割成陣列
        // 選擇要留下的片段重新組成字串
        resStr = data.Address.split('').slice(0, 3).reduce((acc, cur) => acc + cur)
      }
    }
    return resStr
  }
  // 彙整詳細資訊
  function IntegrateDescription(data) {
    let desc = data.Description
    const detail = data.DescriptionDetail
    let resStr = ''
    if (desc === '無') {
      desc = undefined
    }
    if (desc === detail) {
      resStr = desc
    } else if (desc !== undefined && desc !== detail && detail !== undefined) {
      resStr = desc + detail
    } else if (detail === undefined) {
      resStr = desc
    } else {
      resStr = detail
    }
    return resStr
  }
  // 篩選過時日期
  function DeletePastDates(data) {
    const nowTime = new Date().toISOString().split('T')[0]
    const newData = []
    data.forEach((item) => {
      const endTime = item.EndTime.split('T')[0]
      if (new Date(endTime) > new Date(nowTime)) {
        newData.push(item)
      }
    })
    return newData
  }
  // 格式化時間
  function TimeFormat(data) {
    return data.split('T')[0].split('-').join('/')
  }
  // 處理資料
  function OrganizeInfo(oldArray, isType) {
    let filterData = []
    if (isType === 'Activity') {
      filterData = DeletePastDates(oldArray)
    } else {
      filterData = oldArray
    }
    const newArray = []
    filterData.forEach((obj) => {
      const tempItem = {
        Type: isType,
        Phone: obj.Phone,
        Address: obj.Address,
        Position: obj.Position,
        OpenTime: obj.OpenTime,
        ID: obj[`${isType}ID`],
        Name: obj[`${isType}Name`],
        Website: obj.WebsiteUrl || obj.Location,
        City: obj.City || CheckCityObjects(obj),
        Class: ClassObjToAry(obj),
        Description: IntegrateDescription(obj),
        Pictures: PictureObjToAry(obj),
      }
      if (isType === 'ScenicSpot') {
        tempItem.Remarks = obj.Remarks
        tempItem.TicketInfo = obj.TicketInfo
      } else if (isType === 'Activity') {
        tempItem.StartTime = TimeFormat(obj.StartTime)
        tempItem.EndTime = TimeFormat(obj.EndTime)
      }
      newArray.push(tempItem)
    })
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
      console.log(`錯誤反饋資訊：`, error)
    }
  }
  // 取得動態圖片路徑
  function GetImgUrl(url) {
    return new URL(`../assets/images/${url}`, import.meta.url).href
  }

  return {
    ScenicSpotData,
    ActivityData,
    RestaurantData,
    GetData,
    GetImgUrl,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGetDataStore, import.meta.hot))
}
