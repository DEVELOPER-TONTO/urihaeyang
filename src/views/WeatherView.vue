<template>
  <div class="min-h-screen bg-gradient-to-br from-ocean-50 to-wave-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 헤더 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-wave-800 mb-4">
          전국 날씨
        </h1>
        <p class="text-xl text-wave-600 max-w-3xl mx-auto">
          대한민국 전국의 실시간 기상 정보를 확인하세요. 
          해양 관측소와 육상 기상 관측소의 데이터를 통합하여 제공합니다.
        </p>
      </div>

      <!-- 날씨 정보 카드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-wave-500 mb-1">현재 온도</p>
              <p class="text-2xl font-bold text-ocean-600">{{ currentWeather.temperature }}°C</p>
            </div>
            <div class="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-ocean-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-wave-500 mb-1">풍속</p>
              <p class="text-2xl font-bold text-ocean-600">{{ currentWeather.windSpeed }} m/s</p>
            </div>
            <div class="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-wave-500 mb-1">습도</p>
              <p class="text-2xl font-bold text-ocean-600">{{ currentWeather.humidity }}%</p>
            </div>
            <div class="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-ocean-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-wave-500 mb-1">기압</p>
              <p class="text-2xl font-bold text-ocean-600">{{ currentWeather.pressure }} hPa</p>
            </div>
            <div class="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-ocean-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 지도 컨테이너 -->
      <div class="card">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-wave-800">전국 기상 지도</h2>
          <button 
            @click="refreshWeatherData"
            :disabled="isLoading"
            class="btn-secondary flex items-center space-x-2"
          >
            <svg 
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'animate-spin': isLoading }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ isLoading ? '업데이트 중...' : '데이터 새로고침' }}</span>
          </button>
        </div>

        <!-- 지도 -->
        <div class="relative">
          <div 
            id="map" 
            class="w-full h-96 rounded-lg border border-wave-200"
          ></div>
          
          <!-- 지도 로딩 오버레이 -->
          <div 
            v-if="isLoading"
            class="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center"
          >
            <div class="text-center">
              <div class="w-8 h-8 border-4 border-ocean-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p class="text-wave-600">지도를 불러오는 중...</p>
            </div>
          </div>
        </div>

        <!-- 지도 범례 -->
        <div class="mt-4 p-4 bg-wave-50 rounded-lg">
          <h3 class="text-sm font-semibold text-wave-700 mb-2">범례</h3>
          <div class="flex flex-wrap gap-4 text-xs text-wave-600">
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>해양 관측소</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>육상 관측소</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>주의보 발표 지역</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 지역별 날씨 정보 -->
      <div class="mt-8">
        <h2 class="text-2xl font-bold text-wave-800 mb-6">지역별 날씨 현황</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="region in regionalWeather" 
            :key="region.name"
            class="card hover:shadow-xl transition-shadow duration-300"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-wave-800">{{ region.name }}</h3>
              <div class="text-right">
                <p class="text-2xl font-bold text-ocean-600">{{ region.temperature }}°C</p>
                <p class="text-sm text-wave-500">{{ region.condition }}</p>
              </div>
            </div>
            
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-wave-600">풍속</span>
                <span class="font-medium">{{ region.windSpeed }} m/s</span>
              </div>
              <div class="flex justify-between">
                <span class="text-wave-600">습도</span>
                <span class="font-medium">{{ region.humidity }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-wave-600">기압</span>
                <span class="font-medium">{{ region.pressure }} hPa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'

// Leaflet CSS는 이미 index.html에서 로드됨

interface WeatherData {
  temperature: number
  windSpeed: number
  humidity: number
  pressure: number
  condition: string
}

interface RegionalWeather extends WeatherData {
  name: string
}

const isLoading = ref(false)
const map = ref<L.Map | null>(null)

// 현재 날씨 데이터 (실제로는 API에서 가져와야 함)
const currentWeather = ref<WeatherData>({
  temperature: 18,
  windSpeed: 3.2,
  humidity: 65,
  pressure: 1013,
  condition: '맑음'
})

// 지역별 날씨 데이터
const regionalWeather = ref<RegionalWeather[]>([
  {
    name: '서울',
    temperature: 18,
    windSpeed: 2.5,
    humidity: 65,
    pressure: 1013,
    condition: '맑음'
  },
  {
    name: '부산',
    temperature: 22,
    windSpeed: 4.1,
    humidity: 78,
    pressure: 1012,
    condition: '구름많음'
  },
  {
    name: '제주',
    temperature: 24,
    windSpeed: 5.3,
    humidity: 82,
    pressure: 1010,
    condition: '흐림'
  },
  {
    name: '울산',
    temperature: 20,
    windSpeed: 3.8,
    humidity: 70,
    pressure: 1011,
    condition: '맑음'
  },
  {
    name: '인천',
    temperature: 17,
    windSpeed: 3.2,
    humidity: 68,
    pressure: 1014,
    condition: '맑음'
  },
  {
    name: '목포',
    temperature: 21,
    windSpeed: 2.9,
    humidity: 75,
    pressure: 1012,
    condition: '구름많음'
  }
])

// 지도 초기화
const initMap = () => {
  if (map.value) {
    map.value.remove()
  }

  // Leaflet 아이콘 설정 (TypeScript에서 필요한 설정)
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })

  // 지도 생성 (한국 중심)
  map.value = L.map('map').setView([36.5, 127.5], 7)

  // OpenStreetMap 타일 레이어 추가
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map.value)

  // 해양 관측소 마커 추가
  const marineStations = [
    { lat: 37.5665, lng: 126.9780, name: '인천항' },
    { lat: 35.1796, lng: 129.0756, name: '부산항' },
    { lat: 33.4996, lng: 126.5312, name: '제주항' },
    { lat: 35.5384, lng: 129.3114, name: '울산항' },
    { lat: 34.7604, lng: 127.6622, name: '여수항' },
    { lat: 36.0190, lng: 129.3435, name: '포항항' }
  ]

  marineStations.forEach(station => {
    const blueIcon = new L.DivIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    })

    L.marker([station.lat, station.lng], { icon: blueIcon })
      .addTo(map.value!)
      .bindPopup(`<b>${station.name}</b><br>해양 관측소`)
  })

  // 육상 관측소 마커 추가
  const landStations = [
    { lat: 37.5665, lng: 126.9780, name: '서울' },
    { lat: 35.1796, lng: 129.0756, name: '부산' },
    { lat: 35.8714, lng: 128.6014, name: '대구' },
    { lat: 36.3504, lng: 127.3845, name: '대전' },
    { lat: 35.1595, lng: 126.8526, name: '광주' },
    { lat: 36.0190, lng: 129.3435, name: '울산' }
  ]

  landStations.forEach(station => {
    const greenIcon = new L.DivIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #10b981; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    })

    L.marker([station.lat, station.lng], { icon: greenIcon })
      .addTo(map.value!)
      .bindPopup(`<b>${station.name}</b><br>육상 관측소`)
  })
}

// 날씨 데이터 새로고침
const refreshWeatherData = async () => {
  isLoading.value = true
  
  try {
    // 실제 구현에서는 API 호출
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 랜덤하게 날씨 데이터 업데이트 (시뮬레이션)
    currentWeather.value = {
      temperature: Math.round(15 + Math.random() * 15),
      windSpeed: Math.round((1 + Math.random() * 8) * 10) / 10,
      humidity: Math.round(50 + Math.random() * 30),
      pressure: Math.round(1000 + Math.random() * 30),
      condition: ['맑음', '구름많음', '흐림', '비'][Math.floor(Math.random() * 4)]
    }

    // 지역별 데이터도 업데이트
    regionalWeather.value = regionalWeather.value.map(region => ({
      ...region,
      temperature: Math.round(15 + Math.random() * 15),
      windSpeed: Math.round((1 + Math.random() * 8) * 10) / 10,
      humidity: Math.round(50 + Math.random() * 30),
      pressure: Math.round(1000 + Math.random() * 30),
      condition: ['맑음', '구름많음', '흐림', '비'][Math.floor(Math.random() * 4)]
    }))

    // 지도 재초기화
    initMap()
    
  } catch (error) {
    console.error('날씨 데이터 업데이트 실패:', error)
    alert('날씨 데이터를 업데이트하는 중 오류가 발생했습니다.')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // 지도 초기화 (약간의 지연을 두어 DOM이 완전히 로드된 후 실행)
  setTimeout(() => {
    initMap()
  }, 100)
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
})
</script>

<style scoped>
.custom-div-icon {
  background: transparent !important;
  border: none !important;
}
</style>
