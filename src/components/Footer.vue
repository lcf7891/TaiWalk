<script setup>
import { ref } from 'vue'

const isYear = ref(new Date().getFullYear())
const design = ref('https://www.figma.com/file/5HQAZ2bunGNKma2fwU0aNZ/The-F2E-3rd---Week1-%E5%8F%B0%E7%81%A3%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E%E5%B0%8E%E8%A6%BD?node-id=0%3A1&mode=dev')
const codeWriter = ref(([]+!{})[~+[]*~+[]] + ([]+!{})[~+[]+~+[]*~!+[]+~+[]*~+[]] + ([]+!{})[~+[]+~+[]*~!+[]+~+[]*~+[]] + ([]+{})[~+[]*~+[]+~+[]*~+[]+~+[]*~!+[]]+'n')
</script>

<template>
  <footer class="text-center bg-quaternary py-5">
    <p class="text-sm text-white">
      Copyright &copy; {{ isYear }} 
      台灣走走ㆍTai Walk <br class="md:hidden inline-block">
      Design：<a class="hover:text-line" :href="design" target="_blank" rel="noreferrer noopener">早餐</a> / 
      Layout：<a class="hover:text-line" href="#">{{ codeWriter }}</a>
    </p>
  </footer>
</template>
