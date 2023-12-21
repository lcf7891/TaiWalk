import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useZipCodeStore = defineStore('ZipCode', () => {
  const cityName = ref([
    '基隆市',
    '臺北市',
    '新北市',
    '桃園縣',
    '新竹市',
    '新竹縣',
    '苗栗縣',
    '臺中市',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義市',
    '嘉義縣',
    '臺南市',
    '高雄市',
    '屏東縣',
    '臺東縣',
    '花蓮縣',
    '宜蘭縣',
    '澎湖縣',
    '金門縣',
    '連江縣',
  ])

  return {
    cityName,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useZipCodeStore, import.meta.hot))
}
