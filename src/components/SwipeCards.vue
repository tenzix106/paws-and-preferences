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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CatCard from './CatCard.vue'

const emit = defineEmits(['finished', 'progress'])

const totalCats = 15
const cats = ref([])
const currentIndex = ref(0)
const likes = ref(0)
const dislikes = ref(0)

// Show up to 3 cards in the stack
const visibleCats = computed(() => {
  return cats.value.slice(currentIndex.value, currentIndex.value + 10)
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
  } else {
    emit('progress', { currentIndex: currentIndex.value, totalCats: totalCats })
  }
}

onMounted(() => {
  // Generate cat data with Cataas API URLs with unique timestamp to get new images
  const timestamp = Date.now()
  cats.value = Array.from({ length: totalCats }, (_, i) => ({
    id: i,
    imageUrl: `https://cataas.com/cat?t=${timestamp}&i=${i}`,
    timestamp: timestamp + i
  }))
  emit('progress', { currentIndex: currentIndex.value, totalCats: totalCats })
})
</script>
