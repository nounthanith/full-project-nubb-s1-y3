<template>
  <button 
    @click="$emit('click')"
    :class="[
      'inline-flex items-center justify-center font-bold transition-all duration-300 active:scale-95 uppercase tracking-widest',
      
      // --- Button Styles ---
      variant === 'primary' 
        ? 'bg-[#ff1493] text-white shadow-lg shadow-[#ff1493]/20 hover:bg-[#ff69b4] hover:shadow-[#ff1493]/40' 
        : '',
        
      variant === 'secondary' 
        ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-black/10' 
        : '',

      variant === 'outline' 
        ? 'bg-transparent border-2 border-[#ff1493] text-[#ff1493] hover:bg-[#ff1493] hover:text-white' 
        : '',

      variant === 'ghost' 
        ? 'bg-gray-100 text-gray-500 hover:text-[#ff1493] hover:bg-[#ff1493]/5' 
        : '',

      variant === 'danger' 
        ? 'bg-red-500 text-white hover:bg-red-600' 
        : '',
        variant === 'success' 
        ? 'bg-green-500 text-white hover:bg-green-600' 
        : '',
        variant === 'warning' 
        ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
        : '',

      // --- Shape Logic ---
      rounded ? 'rounded-full' : 'rounded-md',

      // --- Size Logic ---
      size === 'sm' ? 'px-4 py-2 text-[10px]' : 
      size === 'lg' ? 'px-6 py-4 text-base' : 'px-8 py-3 text-sm'
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  // primary, secondary, outline, ghost
  variant: { type: String, default: 'primary' },
  // sm, md, lg
  size: { type: String, default: 'md' },
  // true = pill, false = soft square
  rounded: { type: Boolean, default: false }
})
defineEmits(['click'])
</script>