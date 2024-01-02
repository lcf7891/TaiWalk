<script setup>
import { storeToRefs } from 'pinia'
import { usePageChangeStore } from '@/stores/usePageChangeStore'
import Carousel from '@/components/Carousel.vue'

const { showDetail } = storeToRefs(usePageChangeStore())
</script>

<template>
  <div class="md:mb-7 mb-4">
    <Carousel :showData="showDetail" />
  </div>
</template>
