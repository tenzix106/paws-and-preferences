<template>
  <div class="min-h-screen bg-cover bg-center bg-fixed" :style="{ backgroundImage: `url(${catBackground})` }">
    <div class="min-h-screen bg-white/40 backdrop-blur-sm">
      <div class="container mx-auto px-4 py-8 max-w-md">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          Paws & Preferences
        </h1>
        <p class="text-gray-600 text-sm">Find your favourite kitty!</p>
        <div v-if="!showResults" class="mt-3">
          <div class="inline-block bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 text-center font-medium text-gray-700">
            <div class="text-sm">{{ currentIndex + 1 }} / {{ totalCats }}</div>
            <div class="text-xs text-gray-600 mt-0.5">{{ totalCats - currentIndex - 1 }} remaining</div>
          </div>
        </div>
      </header>
      

      <SwipeCards 
        v-if="!showResults" 
        :key="componentKey"
        @finished="handleFinished"
        @progress="handleProgress"
      />
      
      <ResultsView 
        v-else 
        :likes="likes" 
        :dislikes="dislikes"
        @restart="handleRestart"
      />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SwipeCards from './components/SwipeCards.vue'
import ResultsView from './components/ResultsView.vue'
import catBackground from './assets/cat-background.jpg'

const showResults = ref(false)
const likes = ref(0)
const dislikes = ref(0)
const currentIndex = ref(0)
const totalCats = ref(15)
const componentKey = ref(0)

const handleProgress = (progress) => {
  currentIndex.value = progress.currentIndex
  totalCats.value = progress.totalCats
}

const handleFinished = (results) => {
  likes.value = results.likes
  dislikes.value = results.dislikes
  showResults.value = true
}

const handleRestart = () => {
  showResults.value = false
  likes.value = 0
  dislikes.value = 0
  currentIndex.value = 0
  componentKey.value++ // Force remount to get new cat images
}
</script>
