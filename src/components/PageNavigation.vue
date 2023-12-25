<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['dataList']);
console.log(props.dataList);
// 渲染的資料
const renderData = ref([]);
// 當前頁數
const currentPage = ref(1);

// 每頁資料量
const perPage = 20;
// 總頁數
const pageTotal = Math.ceil(props.dataList.length / perPage);
// 切割資料
function cutPages() {
  // 最大索引值
  const maxData = (currentPage.value * perPage);
  // 最小索引值
  const minData = maxData - perPage + 1;
  // 取得頁面資料
  props.dataList.forEach((item, idx) => {
    const runNum = idx + 1;
    if (runNum >= minData && runNum <= maxData) {
      // 儲存到渲染陣列
      renderData.value.push(item);
    }
  });
}
cutPages();
// 回上一頁
function pagePrev() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}
// 往下一頁
function pageNext() {
  if (currentPage.value < pageTotal) {
    currentPage.value += 1;
  }
}
// 切換目前頁碼
function pageChange(num) {
  currentPage.value = num;
}
// 監聽現在頁數控制 prev、next 啟用與鎖定的狀態
const prevState = ref(true);
const nextState = ref(false);
watch(currentPage, (newQ) => {
  if (newQ <= 1) {
    prevState.value = true;
  } else {
    prevState.value = false;
  }
  if (newQ >= pageTotal) {
    nextState.value = true;
  } else {
    nextState.value = false;
  }
  console.log('現在', currentPage.value);
});
console.log('初始', currentPage.value);
</script>

<template>
  <section class="md:pt-20 md:mb-28 py-16">
    <ul class="pagination">
      <li class="page-item">
        <button class="page-btn page-arrow page-prev"
                :class="{'page-disabled': prevState}"
                type="button" @click="pagePrev"></button>
      </li>
      <li class="page-item mx-1"
          v-for="item, idx in renderData"
          :key="item.ID">
        <button class="page-btn" type="button" @click="pageChange(idx+1)">
          {{ idx + 1 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-btn page-arrow page-next"
                :class="{'page-disabled': nextState}"
                type="button" @click="pageNext"></button>
      </li>
    </ul>
  </section>
</template>
