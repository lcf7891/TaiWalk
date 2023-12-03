<script setup>
// import { ref, watchEffect } from 'vue'
// import { RouterLink, useRoute } from 'vue-router'
import Breadcrumb from '@/components/breadcrumb.vue'

// const route = useRoute()
// const breadcrumb = ref([
//   {
//     title: '首頁',
//     path: '/'
//   }
// ])

// watchEffect(() => {
//   route.matched.forEach(item => {
//     if(item.meta.title && item.meta.path) {
//       breadcrumb.value.push(item.meta)
//     }
//   })
// })
</script>

<template>
  <Breadcrumb>
    <!-- <ul class="flex">
      <li v-for="item in breadcrumb" :key="item.title">
        <RouterLink class="md:text-base text-xs text-quinary" :to="item.path">{{ item.title }}</RouterLink>
        <span class="mx-2">/</span>
      </li>
    </ul> -->
  </Breadcrumb> 
</template>
