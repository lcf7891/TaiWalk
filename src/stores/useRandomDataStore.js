import { defineStore, acceptHMRUpdate } from 'pinia'

export const useRandomDataStore = defineStore('randomData', () => {
  // 產生隨機數
  function randomNum(scope) {
    return Math.floor(Math.random() * scope) + 1
  }
  // 產生指定數組的隨機陣列
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
  // 篩選有圖片資料
  function FilterNoPictures(originData) {
    const newData = originData.filter(item => {
      if (Object.keys(item.Picture).length > 0) {
        return item
      }
    })
    return newData
  }
  // 從指定數據取出與隨機數陣列對應的資料
  function ExtractRandomData(dataAry, Qty) {
    const numAry = getRandomNumbers(dataAry.length, Qty)
    const filterData = []
    dataAry.filter((item, idx) => {
      numAry.forEach(numItem => {
        if (numItem === idx) {
          filterData.push(item)
        }
      })
    })
    return filterData
  }

  return {
    FilterNoPictures,
    ExtractRandomData,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRandomDataStore, import.meta.hot))
}
