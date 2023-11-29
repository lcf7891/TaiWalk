<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <NavBar />
  
  <main class="container px-4 mx-auto">
    <RouterView />
  </main>
  
  <Footer />
</template>
