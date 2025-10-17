<template>
  <footer class="bg-wave-800 text-white mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 로고 및 설명 -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 ocean-gradient rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span class="text-xl font-bold">우리해양</span>
          </div>
          <p class="text-wave-300 mb-4 max-w-md">
            대한민국의 해양 환경과 기상 정보를 실시간으로 제공하여 
            안전하고 효율적인 해상 활동을 지원합니다.
          </p>
        </div>

        <!-- 서비스 정보 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">서비스</h3>
          <ul class="space-y-2">
            <li><router-link to="/weather" class="text-wave-300 hover:text-white transition-colors">전국 날씨</router-link></li>
            <li><router-link to="/seain" class="text-wave-300 hover:text-white transition-colors">해상 자료</router-link></li>
            <li><router-link to="/aichat" class="text-wave-300 hover:text-white transition-colors">AI 챗봇</router-link></li>
          </ul>
        </div>

        <!-- 연락처 정보 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">연락처</h3>
          <ul class="space-y-2 text-wave-300">
            <li>이메일: info@urihayang.co.kr</li>
            <li>전화: 02-1234-5678</li>
            <li>주소: 서울특별시 해양구</li>
          </ul>
        </div>
      </div>

      <!-- 하단 구분선 -->
      <div class="border-t border-wave-700 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-wave-400 text-sm">
            © 2024 우리해양. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-wave-400 hover:text-white transition-colors text-sm">개인정보처리방침</a>
            <a href="#" class="text-wave-400 hover:text-white transition-colors text-sm">이용약관</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer 컴포넌트
</script>
