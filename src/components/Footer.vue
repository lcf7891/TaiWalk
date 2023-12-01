<script setup>
import { ref } from 'vue'

const isYear = ref(new Date().getFullYear())
</script>

<template>
  <footer class="text-center bg-quaternary py-5">
    <p class="text-sm text-white">
      Copyright &copy; {{ isYear }} 台灣走走ㆍTai Walk
    </p>
  </footer>
</template>
