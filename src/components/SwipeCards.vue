<template>
  <div class="relative h-[600px] flex items-center justify-center">
    <!-- Card Stack -->
    <div class="relative w-full h-full">
      <div 
        v-for="(cat, index) in visibleCats" 
        :key="cat.id"
        class="absolute inset-0 transition-all duration-300"
        :style="getCardStyle(index)"
      >
        <CatCard 
          :cat="cat"
          :is-top-card="index === 0"
          @swipe="handleSwipe"
        />
      </div>
    </div>

    <!-- Progress Indicator -->
    <div class="absolute bottom-4 left-0 right-0 px-4">
      <div class="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-center text-sm font-medium text-gray-700">
        {{ currentIndex + 1 }} / {{ totalCats }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CatCard from './CatCard.vue'

const emit = defineEmits(['finished'])

const totalCats = 15
const cats = ref([])
const currentIndex = ref(0)
const likes = ref(0)
const dislikes = ref(0)

// Show up to 3 cards in the stack
const visibleCats = computed(() => {
  return cats.value.slice(currentIndex.value, currentIndex.value + 3)
})

const getCardStyle = (index) => {
  const offset = index * 4
  const scale = 1 - (index * 0.05)
  return {
    transform: `translateY(${offset}px) scale(${scale})`,
    zIndex: 10 - index,
    opacity: index === 0 ? 1 : 0.5
  }
}

const handleSwipe = (direction) => {
  if (direction === 'right') {
    likes.value++
  } else {
    dislikes.value++
  }

  currentIndex.value++

  if (currentIndex.value >= totalCats) {
    setTimeout(() => {
      emit('finished', { likes: likes.value, dislikes: dislikes.value })
    }, 300)
  }
}

onMounted(() => {
  // Generate cat data with Cataas API URLs
  cats.value = Array.from({ length: totalCats }, (_, i) => ({
    id: i,
    imageUrl: `https://cataas.com/cat?${i}`,
    timestamp: Date.now() + i
  }))
})
</script>
