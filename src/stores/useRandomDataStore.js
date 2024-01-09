import { defineStore, acceptHMRUpdate } from 'pinia'

export const useRandomDataStore = defineStore('randomData', () => {
  // 剔除無圖片資料
  function FilterNoPictures(data) {
    const newData = []
    data.forEach((item) => {
      if (item.Pictures.length) {
        newData.push(item)
      }
    });
    return newData
  }
  // 生成隨機數
  function randomNum(scope) {
    return Math.floor(Math.random() * scope) + 1
  }
  // 生成隨機數陣列
  function getRandomNumbers(max, QTY) {
    let randomInt = randomNum(max)
    const tempAry = []
    for (let i = 0; i < QTY; i += 1) {
      tempAry.push(randomInt)
      while (tempAry.includes(randomInt)) {
        randomInt = randomNum(max)
      }
    }
    return tempAry
  }
  // 生成指定數量隨機資料陣列
  function ExtractRandomData(data, QTY) {
    const numAry = getRandomNumbers(data.length, QTY)
    const tempAry = []
    data.forEach((item, idx) => {
      if (numAry.includes(idx)) {
        tempAry.push(item)
      }
    });
    return tempAry
  }

  return {
    FilterNoPictures,
    ExtractRandomData,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRandomDataStore, import.meta.hot))
}
