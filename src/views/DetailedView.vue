<script setup>
import { storeToRefs } from 'pinia'
import { usePageChangeStore } from '../stores/usePageChangeStore'

const pageState = usePageChangeStore()
const { showData } = storeToRefs(pageState)
console.log(showData.value)
</script>

<template>
  <div>
    detailed
  </div>
</template>

<style lang="scss" scoped>

</style>
