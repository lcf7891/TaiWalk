<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="set-end">
    <NavBar />

    <main class="container mx-auto md:pb-12 pb-6 px-4 mb-auto">
      <RouterView />
    </main>
  </div>
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
  .set-end {
    flex-grow: 1;
  }
</style>