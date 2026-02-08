<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 border-b-pink-300">
    <div class="max-w-full mx-auto h-full px-2 flex items-center justify-between">

      <div class="flex items-center gap-4">
        <button @click="$emit('toggleSidebar')"
          class="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-4">
        <!-- <BaseBtn type="ghost" size="sm">Help</BaseBtn> -->
        <LogBtn/>
      </div>
    </div>
  </nav>
</template>

<script setup>
import LogBtn from '../views/auth/LogBtn.vue';


defineEmits(['toggleSidebar'])

 
</script>