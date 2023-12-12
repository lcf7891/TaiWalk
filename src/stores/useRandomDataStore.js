import { defineStore, acceptHMRUpdate } from 'pinia'

export const useRandomDataStore = defineStore('randomData', () => {
  // 生成隨機數
  function randomNum(scope) {
    return Math.floor(Math.random() * scope) + 1
  }
  // 生成隨機數陣列
  function getRandomNumbers(max, Qty) {
    let randomInt = randomNum(max)
    const tempAry = []
    for (let i = 0; i < Qty; i += 1) {
      tempAry.push(randomInt)
      while (tempAry.includes(randomInt)) {
        randomInt = randomNum(max)
      }
    }
    return tempAry
  }
  // 剔除指定日期資料
  function RemoveSpecifiedDate(originData) {
    const nowTime = new Date().toISOString().split('T')[0];
    const newData = [];
    originData.forEach((item) => {
      const endTime = item.EndTime.split('T')[0];
      if (endTime > nowTime) {
        newData.push(item);
      }
    });
    return newData;
  }
  // 剔除無圖片資料
  function FilterNoPictures(originData) {
    const newData = []
    originData.forEach((item) => {
      if (Object.hasOwn(item.Picture, 'PictureUrl1')) {
        newData.push(item)
      }
    });
    return newData
  }
  // 生成指定數量隨機資料陣列
  function ExtractRandomData(dataAry, Qty) {
    const numAry = getRandomNumbers(dataAry.length, Qty)
    const tempAry = []
    dataAry.forEach((item, idx) => {
      if (numAry.includes(idx)) {
        tempAry.push(item)
      }
    });
    return tempAry
  }

  return {
    RemoveSpecifiedDate,
    FilterNoPictures,
    ExtractRandomData,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRandomDataStore, import.meta.hot))
}
