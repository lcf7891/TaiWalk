import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePageChangeStore = defineStore('PageNav', () => {
  const currentPage = ref(1)
  const showDetail = ref({});

  function pageData(data) {
    showDetail.value = data;
    // 把物件 Picture 整合成 Pictures 陣列
    // 取出物件的 key
    const keyAry = Object.keys(data.Picture);
    // 取出物件的值
    const valAry = Object.values(data.Picture);
    // 整合後暫存的陣列
    const Pictures = [];
    // 初始索引值
    let idx = 0;
    // 整合成預期的物件
    for (let i = 0; i < keyAry.length / 2; i += 1) {
      const obj = {
        PictureUrl: valAry[idx],
        PictureDescription: valAry[idx + 1],
      };
      // 將完成的物件放入暫存陣列
      Pictures.push(obj);
      idx += 2;
    }
    // 將整合完的陣列資料加入物件裡
    showDetail.value.Pictures = Pictures;
  }
  return {
    currentPage,
    showDetail,
    pageData
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageChangeStore, import.meta.hot))
}