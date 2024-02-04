import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useZipCodeStore = defineStore('ZipCode', () => {
  const cityName = ref([
    {
      enName: 'Keelung',
      ctName: '基隆市',
    },
    {
      enName: 'Taipei',
      ctName: '臺北市',
    },
    {
      enName: 'NewTaipei',
      ctName: '新北市',
    },
    {
      enName: 'Taoyuan',
      ctName: '桃園市',
    },
    {
      enName: 'Hsinchu',
      ctName: '新竹市',
    },
    {
      enName: 'HsinchuCounty',
      ctName: '新竹縣',
    },
    {
      enName: 'MiaoliCounty',
      ctName: '苗栗縣',
    },
    {
      enName: 'Taichung',
      ctName: '臺中市',
    },
    {
      enName: 'ChanghuaCounty',
      ctName: '彰化縣',
    },
    {
      enName: 'NantouCounty',
      ctName: '南投縣',
    },
    {
      enName: 'YunlinCounty',
      ctName: '雲林縣',
    },
    {
      enName: 'Chiayi',
      ctName: '嘉義市',
    },
    {
      enName: 'ChiayiCounty',
      ctName: '嘉義縣',
    },
    {
      enName: 'Tainan',
      ctName: '臺南市',
    },
    {
      enName: 'Kaohsiung',
      ctName: '高雄市',
    },
    {
      enName: 'PingtungCounty',
      ctName: '屏東縣',
    },
    {
      enName: 'TaitungCounty',
      ctName: '臺東縣',
    },
    {
      enName: 'HualienCounty',
      ctName: '花蓮縣',
    },
    {
      enName: 'YilanCounty',
      ctName: '宜蘭縣',
    },
    {
      enName: 'PenghuCounty',
      ctName: '澎湖縣',
    },
    {
      enName: 'KinmenCounty',
      ctName: '金門縣',
    },
    {
      enName: 'LienchiangCounty',
      ctName: '連江縣',
    },
  ])

  return {
    cityName,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useZipCodeStore, import.meta.hot))
}
