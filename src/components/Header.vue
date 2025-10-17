<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-ocean-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 로고 -->
        <div class="flex items-center space-x-3">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-10 h-10 ocean-gradient rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span class="text-xl font-bold text-ocean-800">우리해양</span>
          </router-link>
        </div>

        <!-- 네비게이션 메뉴 -->
        <nav class="hidden md:flex space-x-8">
          <router-link 
            to="/weather" 
            class="text-wave-700 hover:text-ocean-600 font-medium transition-colors duration-200"
            :class="{ 'text-ocean-600': $route.path === '/weather' }"
          >
            전국 날씨
          </router-link>
          <router-link 
            to="/seain" 
            class="text-wave-700 hover:text-ocean-600 font-medium transition-colors duration-200"
            :class="{ 'text-ocean-600': $route.path === '/seain' }"
          >
            해상 자료
          </router-link>
          <router-link 
            to="/aichat" 
            class="text-wave-700 hover:text-ocean-600 font-medium transition-colors duration-200"
            :class="{ 'text-ocean-600': $route.path === '/aichat' }"
          >
            AI 챗봇
          </router-link>
        </nav>

        <!-- 모바일 메뉴 버튼 -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="text-wave-700 hover:text-ocean-600 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 모바일 메뉴 -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-ocean-200 py-4">
        <nav class="flex flex-col space-y-4">
          <router-link 
            to="/weather" 
            @click="closeMobileMenu"
            class="text-wave-700 hover:text-ocean-600 font-medium transition-colors duration-200"
            :class="{ 'text-ocean-600': $route.path === '/weather' }"
          >
            전국 날씨
          </router-link>
          <router-link 
            to="/seain" 
            @click="closeMobileMenu"
            class="text-wave-700 hover:text-ocean-600 font-medium transition-colors duration-200"
            :class="{ 'text-ocean-600': $route.path === '/seain' }"
          >
            해상 자료
          </router-link>
          <router-link 
            to="/aichat" 
            @click="closeMobileMenu"
            class="text-wave-700 hover:text-ocean-600 font-medium transition-colors duration-200"
            :class="{ 'text-ocean-600': $route.path === '/aichat' }"
          >
            AI 챗봇
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
