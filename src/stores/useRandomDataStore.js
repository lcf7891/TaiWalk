import { defineStore, acceptHMRUpdate } from 'pinia'

export const useRandomDataStore = defineStore('randomData', () => {
  function randomNum(scope) {
    return Math.floor(Math.random() * scope) + 1
  }

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

  function FilterNoPictures(originData) {
    const newData = originData.filter(item => {
      if (Object.keys(item.Picture).length > 0) {
        return item
      }
    })
    return newData
  }

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
