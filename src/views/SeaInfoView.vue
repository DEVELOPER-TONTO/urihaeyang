<template>
  <div class="min-h-screen bg-gradient-to-br from-ocean-50 to-wave-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 헤더 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-wave-800 mb-4">
          해상 자료
        </h1>
        <p class="text-xl text-wave-600 max-w-3xl mx-auto">
          기상청 해양 기상 종합 관측 API를 통해 실시간 해상 기상 정보를 확인하세요.
        </p>
      </div>

      <!-- API 호출 컨트롤 -->
      <div class="card mb-8">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-wave-800 mb-2">해상 관측 데이터 조회</h2>
            <p class="text-sm text-wave-600">
              기상청 해양 기상 종합 관측소의 실시간 데이터를 조회합니다.
            </p>
          </div>
          <div class="flex space-x-3">
            <button 
              @click="fetchSeaData"
              :disabled="isLoading"
              class="btn-primary flex items-center space-x-2"
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
              <span>{{ isLoading ? '데이터 조회 중...' : '데이터 조회' }}</span>
            </button>
            <button 
              @click="clearData"
              class="btn-secondary"
            >
              데이터 지우기
            </button>
          </div>
        </div>
      </div>

      <!-- 로딩 상태 -->
      <div v-if="isLoading" class="card text-center py-12">
        <div class="w-12 h-12 border-4 border-ocean-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-wave-600">해상 관측 데이터를 조회하고 있습니다...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="card bg-red-50 border border-red-200">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-red-800">데이터 조회 실패</h3>
            <p class="text-red-600">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- 데이터 테이블 -->
      <div v-else-if="seaData.length > 0" class="card">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-wave-800">
            해상 관측 데이터 ({{ seaData.length }}개 관측소)
          </h2>
          <div class="text-sm text-wave-600">
            마지막 업데이트: {{ lastUpdated }}
          </div>
        </div>

        <!-- 모바일 대응을 위한 반응형 테이블 -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-wave-200">
                <th class="text-left py-3 px-4 font-semibold text-wave-700">관측소명</th>
                <th class="text-left py-3 px-4 font-semibold text-wave-700">풍향 (°)</th>
                <th class="text-left py-3 px-4 font-semibold text-wave-700">풍속 (m/s)</th>
                <th class="text-left py-3 px-4 font-semibold text-wave-700">해수면 온도 (°C)</th>
                <th class="text-left py-3 px-4 font-semibold text-wave-700">기온 (°C)</th>
                <th class="text-left py-3 px-4 font-semibold text-wave-700">해면기압 (hPa)</th>
                <th class="text-left py-3 px-4 font-semibold text-wave-700">상대습도 (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(data, index) in seaData" 
                :key="index"
                class="border-b border-wave-100 hover:bg-wave-50 transition-colors duration-200"
              >
                <td class="py-3 px-4 font-medium text-wave-800">{{ data.STN_KO || 'N/A' }}</td>
                <td class="py-3 px-4 text-wave-600">{{ formatValue(data.WH) }}</td>
                <td class="py-3 px-4 text-wave-600">{{ formatValue(data.WS) }}</td>
                <td class="py-3 px-4 text-wave-600">{{ formatValue(data.TW) }}</td>
                <td class="py-3 px-4 text-wave-600">{{ formatValue(data.TA) }}</td>
                <td class="py-3 px-4 text-wave-600">{{ formatValue(data.PA) }}</td>
                <td class="py-3 px-4 text-wave-600">{{ formatValue(data.HM) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 데이터 요약 정보 -->
        <div class="mt-6 pt-6 border-t border-wave-200">
          <h3 class="text-lg font-semibold text-wave-800 mb-4">데이터 요약</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-ocean-50 rounded-lg p-4">
              <h4 class="text-sm font-medium text-ocean-800 mb-2">평균 해수면 온도</h4>
              <p class="text-2xl font-bold text-ocean-600">
                {{ calculateAverage('TW') }}°C
              </p>
            </div>
            <div class="bg-ocean-50 rounded-lg p-4">
              <h4 class="text-sm font-medium text-ocean-800 mb-2">평균 풍속</h4>
              <p class="text-2xl font-bold text-ocean-600">
                {{ calculateAverage('WS') }} m/s
              </p>
            </div>
            <div class="bg-ocean-50 rounded-lg p-4">
              <h4 class="text-sm font-medium text-ocean-800 mb-2">평균 기압</h4>
              <p class="text-2xl font-bold text-ocean-600">
                {{ calculateAverage('PA') }} hPa
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 빈 상태 -->
      <div v-else class="card text-center py-12">
        <div class="w-16 h-16 bg-wave-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-wave-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-wave-700 mb-2">데이터가 없습니다</h3>
        <p class="text-wave-600 mb-4">위의 '데이터 조회' 버튼을 클릭하여 해상 관측 데이터를 불러오세요.</p>
      </div>

      <!-- API 정보 -->
      <div class="mt-8 card bg-wave-50">
        <h3 class="text-lg font-semibold text-wave-800 mb-4">API 정보</h3>
        <div class="space-y-3 text-sm">
          <div class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
            <span class="font-medium text-wave-700 min-w-0 md:w-32">API 엔드포인트:</span>
            <code class="bg-white px-2 py-1 rounded text-xs break-all">
              https://apihub.kma.go.kr/api/typ01/url/sea_obs.php
            </code>
          </div>
          <div class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
            <span class="font-medium text-wave-700 min-w-0 md:w-32">제공 기관:</span>
            <span class="text-wave-600">기상청</span>
          </div>
          <div class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
            <span class="font-medium text-wave-700 min-w-0 md:w-32">업데이트 주기:</span>
            <span class="text-wave-600">실시간 (10분 간격)</span>
          </div>
          <div class="flex flex-col md:flex-row md:items-start space-y-1 md:space-y-0 md:space-x-4">
            <span class="font-medium text-wave-700 min-w-0 md:w-32">제공 데이터:</span>
            <div class="text-wave-600">
              <p>• 관측소명 (STN_KO)</p>
              <p>• 풍향 (WH), 풍속 (WS)</p>
              <p>• 해수면 온도 (TW), 기온 (TA)</p>
              <p>• 해면기압 (PA), 상대습도 (HM)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

interface SeaObservationData {
  STN_KO?: string  // 관측소명
  WH?: number      // 풍향
  WS?: number      // 풍속
  TW?: number      // 해수면 온도
  TA?: number      // 기온
  PA?: number      // 해면기압
  HM?: number      // 상대습도
}

const isLoading = ref(false)
const error = ref('')
const seaData = ref<SeaObservationData[]>([])
const lastUpdated = ref('')

// API 호출 함수
const fetchSeaData = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    // 기상청 해양 기상 종합 관측 API 호출
    const response = await axios.get('https://apihub.kma.go.kr/api/typ01/url/sea_obs.php', {
      params: {
        tm: new Date().toISOString().slice(0, 10).replace(/-/g, '') + new Date().toISOString().slice(11, 16).replace(':', ''),
        stn: 0,
        help: 1,
        authKey: 'iaVHnTfZQlulR5032dJbtQ'
      },
      timeout: 10000 // 10초 타임아웃
    })

    console.log('API 응답:', response.data)
    
    // 응답 데이터 처리
    if (response.data && Array.isArray(response.data)) {
      seaData.value = response.data
      lastUpdated.value = new Date().toLocaleString('ko-KR')
    } else if (response.data && response.data.item && Array.isArray(response.data.item)) {
      seaData.value = response.data.item
      lastUpdated.value = new Date().toLocaleString('ko-KR')
    } else {
      // API 응답 구조가 예상과 다를 경우 샘플 데이터 사용
      console.warn('API 응답 구조가 예상과 다릅니다. 샘플 데이터를 사용합니다.')
      seaData.value = getSampleData()
      lastUpdated.value = new Date().toLocaleString('ko-KR') + ' (샘플 데이터)'
    }
    
  } catch (err: any) {
    console.error('API 호출 실패:', err)
    
    // CORS 에러나 네트워크 에러의 경우 샘플 데이터 사용
    if (err.code === 'ERR_NETWORK' || err.message.includes('CORS')) {
      console.warn('CORS 또는 네트워크 에러로 인해 샘플 데이터를 사용합니다.')
      seaData.value = getSampleData()
      lastUpdated.value = new Date().toLocaleString('ko-KR') + ' (샘플 데이터)'
      error.value = ''
    } else {
      error.value = `데이터 조회 중 오류가 발생했습니다: ${err.message}`
    }
  } finally {
    isLoading.value = false
  }
}

// 샘플 데이터 생성 함수
const getSampleData = (): SeaObservationData[] => {
  return [
    {
      STN_KO: '인천항',
      WH: 180,
      WS: 3.2,
      TW: 15.2,
      TA: 18.5,
      PA: 1013.2,
      HM: 65
    },
    {
      STN_KO: '부산항',
      WH: 220,
      WS: 4.1,
      TW: 18.7,
      TA: 22.1,
      PA: 1012.8,
      HM: 78
    },
    {
      STN_KO: '제주항',
      WH: 160,
      WS: 5.3,
      TW: 20.1,
      TA: 24.3,
      PA: 1010.5,
      HM: 82
    },
    {
      STN_KO: '울산항',
      WH: 200,
      WS: 3.8,
      TW: 17.9,
      TA: 20.7,
      PA: 1011.9,
      HM: 70
    },
    {
      STN_KO: '여수항',
      WH: 190,
      WS: 2.9,
      TW: 19.2,
      TA: 21.8,
      PA: 1012.3,
      HM: 75
    },
    {
      STN_KO: '포항항',
      WH: 170,
      WS: 4.5,
      TW: 16.8,
      TA: 19.4,
      PA: 1013.7,
      HM: 68
    }
  ]
}

// 데이터 지우기
const clearData = () => {
  seaData.value = []
  error.value = ''
  lastUpdated.value = ''
}

// 값 포맷팅 함수
const formatValue = (value: any): string => {
  if (value === null || value === undefined || value === '') {
    return 'N/A'
  }
  if (typeof value === 'number') {
    return value.toFixed(1)
  }
  return String(value)
}

// 평균 계산 함수
const calculateAverage = (field: keyof SeaObservationData): string => {
  const values = seaData.value
    .map(item => item[field])
    .filter(value => value !== null && value !== undefined && value !== '')
    .map(value => Number(value))
  
  if (values.length === 0) return 'N/A'
  
  const average = values.reduce((sum, value) => sum + value, 0) / values.length
  return average.toFixed(1)
}
</script>
