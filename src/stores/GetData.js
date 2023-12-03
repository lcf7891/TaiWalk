import { defineStore } from 'pinia'

export const useGetDataStore = defineStore('getData', {
  state: () => ({
    scenicSpot: [],
    activity: [],
    restaurant: [],
  }),
  getters: {},
  actions: {

  }
})


// https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot