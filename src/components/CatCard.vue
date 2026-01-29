<template>
  <div 
    ref="cardRef"
    class="cat-card bg-white rounded-3xl shadow-2xl overflow-hidden w-full h-full cursor-grab active:cursor-grabbing"
    :class="{ 'is-swiping': isSwiping }"
    :style="cardStyle"
    @mousedown.prevent="startSwipe"
    @touchstart.prevent="startSwipe"
  >
    <!-- Image Container -->
    <div class="relative h-5/6 overflow-hidden pointer-events-none">
      <img 
        :src="cat.imageUrl" 
        :alt="`Cat ${cat.id}`"
        class="w-full h-full object-cover"
        draggable="false"
        @load="imageLoaded = true"
      />
      
      <!-- Loading State -->
      <div 
        v-if="!imageLoaded"
        class="absolute inset-0 bg-gradient-to-br from-pastel-purple to-pastel-pink animate-pulse flex items-center justify-center"
      >
        <div class="text-xl font-semibold text-white">Loading...</div>
      </div>

      <!-- Swipe Indicators -->
      <div 
        v-if="isTopCard && swipeDirection"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div 
          v-if="swipeDirection === 'right'"
          class="bg-green-500/90 text-white text-4xl font-bold px-8 py-4 rounded-2xl rotate-12 transform scale-110"
        >
          LIKE
        </div>
        <div 
          v-else-if="swipeDirection === 'left'"
          class="bg-red-500/90 text-white text-4xl font-bold px-8 py-4 rounded-2xl -rotate-12 transform scale-110"
        >
          NOPE
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div v-if="isTopCard" class="h-1/6 flex items-center justify-center gap-6 px-8 pointer-events-auto">
      <button 
        @click.stop.prevent="handleButtonSwipe('left')"
        class="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-3xl font-bold"
      >
        ×
      </button>
      <button 
        @click.stop.prevent="handleButtonSwipe('right')"
        class="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-3xl font-bold"
      >
        ♥
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  cat: {
    type: Object,
    required: true
  },
  isTopCard: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['swipe'])

const cardRef = ref(null)
const imageLoaded = ref(false)
const isSwiping = ref(false)
const startX = ref(0)
const startY = ref(0)
const currentX = ref(0)
const currentY = ref(0)
const swipeDirection = ref(null)

const cardStyle = computed(() => {
  if (!isSwiping.value) return {}
  
  const deltaX = currentX.value - startX.value
  const deltaY = currentY.value - startY.value
  const rotation = deltaX * 0.1
  
  return {
    transform: `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`,
    transition: 'none'
  }
})

const startSwipe = (e) => {
  if (!props.isTopCard) return
  
  isSwiping.value = true
  const touch = e.type === 'touchstart' ? e.touches[0] : e
  startX.value = touch.clientX
  startY.value = touch.clientY
  currentX.value = touch.clientX
  currentY.value = touch.clientY
  
  document.addEventListener('mousemove', onSwipeMove, { passive: false })
  document.addEventListener('mouseup', onSwipeEnd, { passive: false })
  document.addEventListener('touchmove', onSwipeMove, { passive: false })
  document.addEventListener('touchend', onSwipeEnd, { passive: false })
}

const onSwipeMove = (e) => {
  if (!isSwiping.value) return
  
  e.preventDefault()
  const touch = e.type === 'touchmove' ? e.touches[0] : e
  currentX.value = touch.clientX
  currentY.value = touch.clientY
  
  const deltaX = currentX.value - startX.value
  
  if (Math.abs(deltaX) > 50) {
    swipeDirection.value = deltaX > 0 ? 'right' : 'left'
  } else {
    swipeDirection.value = null
  }
}

const onSwipeEnd = () => {
  if (!isSwiping.value) return
  
  const deltaX = currentX.value - startX.value
  const threshold = 100
  
  if (Math.abs(deltaX) > threshold) {
    const direction = deltaX > 0 ? 'right' : 'left'
    animateSwipeOut(direction)
  } else {
    resetCard()
  }
  
  cleanup()
}

const animateSwipeOut = (direction) => {
  const card = cardRef.value
  if (!card) return
  
  const moveX = direction === 'right' ? 1000 : -1000
  card.style.transform = `translateX(${moveX}px) rotate(${moveX * 0.1}deg)`
  card.style.transition = 'transform 0.3s ease-out'
  
  setTimeout(() => {
    emit('swipe', direction)
  }, 300)
}

const resetCard = () => {
  const card = cardRef.value
  if (!card) return
  
  card.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  card.style.transform = 'translate(0, 0) rotate(0deg)'
  
  setTimeout(() => {
    swipeDirection.value = null
    isSwiping.value = false
  }, 100)
}

const handleButtonSwipe = (direction) => {
  animateSwipeOut(direction)
}

const cleanup = () => {
  document.removeEventListener('mousemove', onSwipeMove)
  document.removeEventListener('mouseup', onSwipeEnd)
  document.removeEventListener('touchmove', onSwipeMove)
  document.removeEventListener('touchend', onSwipeEnd)
}

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.cat-card {
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  will-change: transform;
}

.cat-card.is-swiping {
  cursor: grabbing !important;
}
</style>
