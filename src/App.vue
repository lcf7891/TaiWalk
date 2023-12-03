<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <main class="grow">
    <NavBar />

    <section class="container mx-auto md:pb-12 pb-6 px-4 mb-auto">
      <RouterView />
    </section>
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
</style>