<template>
  <div class="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-blue">
    <div class="container mx-auto px-4 py-8 max-w-md">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          🐾 Paws & Preferences
        </h1>
        <p class="text-gray-600 text-sm">Find your favorite kitty!</p>
      </header>

      <SwipeCards 
        v-if="!showResults" 
        @finished="handleFinished"
      />
      
      <ResultsView 
        v-else 
        :likes="likes" 
        :dislikes="dislikes"
        @restart="handleRestart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SwipeCards from './components/SwipeCards.vue'
import ResultsView from './components/ResultsView.vue'

const showResults = ref(false)
const likes = ref(0)
const dislikes = ref(0)

const handleFinished = (results) => {
  likes.value = results.likes
  dislikes.value = results.dislikes
  showResults.value = true
}

const handleRestart = () => {
  showResults.value = false
  likes.value = 0
  dislikes.value = 0
}
</script>
