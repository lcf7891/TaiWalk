<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <NavBar />

  <main class="container mx-auto md:pb-12 pb-6 px-4 mb-auto">
    <RouterView />
  </main>
  
  <Footer />
</template>

<style>
  html, body, #app {
    height: 100%;
  }
  #app {
    display: flex;
    flex-direction: column;
  }
  main {
    flex-grow: 1;
  }
</style>