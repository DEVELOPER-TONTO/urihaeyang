<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-ocean-50 to-wave-100">
    <Header />
    <main class="pt-16">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
