<script setup>
import { ref } from 'vue'

const toggleMenu = ref(false)

function btnChange() {
  toggleMenu.value = !toggleMenu.value
}
</script>

<template>
  <header class="navbar">
    <router-link to="/">
      <img class="md:block hidden" src="@/assets/images/icon/Logo-desktop.svg" alt="desktop logo">
      <img class="md:hidden block" src="@/assets/images/icon/Logo-mobile.svg" alt="mobile logo">
    </router-link>
    <ul class="nav" :class="{'active': toggleMenu}">
      <li class="nav-brand">
        <router-link to="/">
          <img src="@/assets/images/icon/Logo-mobile.svg" alt="mobile logo">
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/scenicSpot">探索景點</router-link>
      </li>
      <li class="nav-item md:border-0 border-y border-light">
        <router-link class="nav-link" to="/activity">節慶活動</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/restaurant">品嚐美食</router-link>
      </li>
    </ul>
    <button class="btn-mobile" :class="{'active': toggleMenu}" type="button" @click="btnChange">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>
  <div class="nav-backdrop" v-show="toggleMenu"></div>
</template>
