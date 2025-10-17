<template>
  <div class="min-h-screen">
    <!-- 히어로 섹션 - 캐러셀 -->
    <section class="relative h-screen overflow-hidden">
      <!-- 캐러셀 컨테이너 -->
      <div class="relative w-full h-full">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="absolute inset-0 transition-opacity duration-1000"
          :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
        >
          <div class="absolute inset-0 ocean-gradient opacity-90"></div>
          <div class="absolute inset-0 wave-pattern opacity-20"></div>
          <div class="relative z-10 h-full flex items-center justify-center">
            <div class="text-center text-white px-4">
              <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                {{ slide.title }}
              </h1>
              <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
                {{ slide.description }}
              </p>
              <router-link 
                :to="slide.link"
                class="inline-block bg-white text-ocean-600 px-8 py-3 rounded-lg font-semibold hover:bg-ocean-50 transition-colors duration-200 animate-fade-in-delay-2"
              >
                {{ slide.buttonText }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 캐러셀 네비게이션 -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button 
          v-for="(slide, index) in slides" 
          :key="index"
          @click="currentSlide = index"
          class="w-3 h-3 rounded-full transition-colors duration-200"
          :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
        ></button>
      </div>

      <!-- 자동 슬라이드 버튼 -->
      <button 
        @click="nextSlide"
        class="absolute right-8 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>

    <!-- 소개 섹션 -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-wave-800 mb-4">
            해양 정보 제공 시스템
          </h2>
          <p class="text-xl text-wave-600 max-w-3xl mx-auto">
            실시간 해양 기상 정보와 AI 기반 챗봇을 통해 안전하고 효율적인 해상 활동을 지원합니다.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="card text-center hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 ocean-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path :d="feature.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-wave-800 mb-3">{{ feature.title }}</h3>
            <p class="text-wave-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 장점 섹션 -->
    <section class="py-20 bg-wave-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-wave-800 mb-4">
            왜 우리해양을 선택해야 할까요?
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div v-for="(advantage, index) in advantages" :key="index" class="flex items-start mb-8">
              <div class="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg class="w-6 h-6 text-ocean-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-wave-800 mb-2">{{ advantage.title }}</h3>
                <p class="text-wave-600">{{ advantage.description }}</p>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <div class="ocean-gradient rounded-2xl p-8 text-white">
              <h3 class="text-2xl font-bold mb-4">실시간 데이터</h3>
              <p class="text-lg mb-6">기상청과 해양수산부의 최신 데이터를 실시간으로 제공합니다.</p>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center">
                  <div class="text-3xl font-bold">24/7</div>
                  <div class="text-sm opacity-90">실시간 모니터링</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold">99.9%</div>
                  <div class="text-sm opacity-90">서비스 가용성</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 문의하기 섹션 -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-wave-800 mb-4">
          문의하기
        </h2>
        <p class="text-xl text-wave-600 mb-12">
          궁금한 점이 있으시거나 서비스 이용에 도움이 필요하시면 언제든지 연락주세요.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="card text-center">
            <div class="w-12 h-12 ocean-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-wave-800 mb-2">이메일</h3>
            <p class="text-wave-600">info@urihayang.co.kr</p>
          </div>

          <div class="card text-center">
            <div class="w-12 h-12 ocean-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-wave-800 mb-2">전화</h3>
            <p class="text-wave-600">02-1234-5678</p>
          </div>

          <div class="card text-center">
            <div class="w-12 h-12 ocean-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-wave-800 mb-2">주소</h3>
            <p class="text-wave-600">서울특별시 해양구</p>
          </div>
        </div>

        <div class="card max-w-2xl mx-auto">
          <form @submit.prevent="submitContact" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-wave-700 mb-2">이름</label>
                <input 
                  v-model="contactForm.name"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-wave-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  placeholder="이름을 입력하세요"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-wave-700 mb-2">이메일</label>
                <input 
                  v-model="contactForm.email"
                  type="email" 
                  required
                  class="w-full px-4 py-3 border border-wave-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  placeholder="이메일을 입력하세요"
                >
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-wave-700 mb-2">제목</label>
              <input 
                v-model="contactForm.subject"
                type="text" 
                required
                class="w-full px-4 py-3 border border-wave-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                placeholder="제목을 입력하세요"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-wave-700 mb-2">메시지</label>
              <textarea 
                v-model="contactForm.message"
                required
                rows="4"
                class="w-full px-4 py-3 border border-wave-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                placeholder="메시지를 입력하세요"
              ></textarea>
            </div>
            <button 
              type="submit" 
              class="w-full btn-primary py-3 text-lg"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? '전송 중...' : '문의하기' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 캐러셀 데이터
const slides = ref([
  {
    title: '실시간 해양 정보',
    description: '전국 해역의 실시간 기상 정보와 해상 데이터를 제공합니다.',
    buttonText: '날씨 확인하기',
    link: '/weather'
  },
  {
    title: '해상 관측 자료',
    description: '기상청 해양 관측소의 최신 해상 기상 데이터를 확인하세요.',
    buttonText: '해상 자료 보기',
    link: '/seain'
  },
  {
    title: 'AI 챗봇 서비스',
    description: '해양 관련 궁금한 점을 AI 챗봇에게 물어보세요.',
    buttonText: '챗봇 시작하기',
    link: '/aichat'
  }
])

const currentSlide = ref(0)
let slideInterval: number | null = null

// 자동 슬라이드 기능
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const startSlideShow = () => {
  slideInterval = setInterval(nextSlide, 5000)
}

const stopSlideShow = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

// 기능 소개 데이터
const features = ref([
  {
    title: '실시간 날씨',
    description: '전국 해역의 실시간 기상 정보를 지도와 함께 확인할 수 있습니다.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  },
  {
    title: '해상 관측 데이터',
    description: '기상청 해양 관측소의 풍향, 풍속, 해수면 온도 등 상세 정보를 제공합니다.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  },
  {
    title: 'AI 챗봇',
    description: '해양 관련 질문에 즉시 답변하는 AI 챗봇 서비스를 제공합니다.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
  }
])

// 장점 데이터
const advantages = ref([
  {
    title: '실시간 데이터 제공',
    description: '기상청과 해양수산부의 최신 데이터를 실시간으로 업데이트하여 제공합니다.'
  },
  {
    title: '직관적인 사용자 인터페이스',
    description: '복잡한 해양 정보를 쉽게 이해할 수 있도록 직관적인 UI/UX를 제공합니다.'
  },
  {
    title: 'AI 기반 맞춤 서비스',
    description: 'ChatGPT API를 활용한 지능형 챗봇으로 개인화된 해양 정보를 제공합니다.'
  },
  {
    title: '모바일 최적화',
    description: '스마트폰과 태블릿에서도 편리하게 사용할 수 있도록 반응형 디자인을 적용했습니다.'
  }
])

// 문의하기 폼
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitContact = async () => {
  isSubmitting.value = true
  
  try {
    // 실제 구현에서는 API 호출
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.')
    
    // 폼 초기화
    contactForm.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  startSlideShow()
})

onUnmounted(() => {
  stopSlideShow()
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-delay {
  animation: fade-in 1s ease-out 0.2s both;
}

.animate-fade-in-delay-2 {
  animation: fade-in 1s ease-out 0.4s both;
}
</style>
