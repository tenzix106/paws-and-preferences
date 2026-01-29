<template>
  <div class="bg-white rounded-3xl shadow-2xl p-8 text-center animate-fade-in">
    <div class="mb-6">
      <!-- <div class="text-6xl mb-4">🎉</div> -->
      <h2 class="text-3xl font-bold text-gray-800 mb-2">
        All Done!
      </h2>
      <p class="text-gray-600">Here's what you decided</p>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6">
        <div class="text-3xl font-bold text-green-700">{{ likes }}</div>
        <div class="text-sm text-green-600 font-medium">Liked</div>
      </div>
      
      <div class="bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-6">
        <div class="text-3xl font-bold text-red-700">{{ dislikes }}</div>
        <div class="text-sm text-red-600 font-medium">Disliked</div>
      </div>
    </div>

    <div class="mb-6 p-4 bg-pastel-yellow rounded-xl">
      <p class="text-gray-700 font-medium">
        {{ getMessage() }}
      </p>
    </div>

    <button 
      @click="$emit('restart')"
      class="w-full bg-gradient-to-r from-pastel-pink to-pastel-purple text-gray-800 font-semibold py-4 px-8 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
    >
      Try Again
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  likes: {
    type: Number,
    required: true
  },
  dislikes: {
    type: Number,
    required: true
  }
})

defineEmits(['restart'])

const getMessage = () => {
  const total = props.likes + props.dislikes
  const likePercentage = (props.likes / total) * 100

  if (likePercentage === 100) {
    return "You're a cat lover through and through!"
  } else if (likePercentage >= 80) {
    return "You really love most kitties!"
  } else if (likePercentage >= 60) {
    return "You're pretty picky, but you found some favorites!"
  } else if (likePercentage >= 40) {
    return "You have specific tastes in cats!"
  } else if (likePercentage >= 20) {
    return "Hard to please! Only the best cats for you!"
  } else if (likePercentage === 0) {
    return "Wow, tough crowd! Maybe you're more of a dog person?"
  } else {
    return "Very selective! You know what you like!"
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
