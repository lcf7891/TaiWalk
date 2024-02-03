<script setup>
import { ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const breadcrumb = ref([
  {
    title: '首頁',
    path: '/'
  }
])

watchEffect(() => {
  route.matched.forEach(item => {
    if(item.meta.title && item.meta.path) {
      breadcrumb.value.push(item.meta)
    }
  })
})
</script>

<template>
  <header class="md:pt-9 pt-2 md:mb-8 mb-4">
    <ul class="flex">
      <li v-for="item in breadcrumb" :key="item.title">
        <RouterLink class="md:text-base text-xs text-quinary hover:text-primary" :to="item.path">{{ item.title }}</RouterLink>
        <span class="text-primary mx-2">/</span>
      </li>
      <slot></slot>
    </ul>
  </header>
</template>

<style lang="postcss" scoped>
  li:nth-last-child(1) a {
    @apply text-quinary;
  }
  li:nth-last-child(1) span {
    @apply hidden;
  }
</style>