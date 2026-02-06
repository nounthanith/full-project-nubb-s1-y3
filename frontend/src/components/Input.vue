<template>
  <div class="w-full space-y-1.5">
    <label 
      v-if="label" 
      class="block text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1"
    >
      {{ label }}
    </label>

    <div class="relative group">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl px-4 py-3.5 
               outline-none transition-all duration-300
               placeholder:text-gray-300
               focus:bg-white focus:border-[#ff1493] focus:ring-4 focus:ring-[#ff1493]/10"
      />
      
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#ff1493] 
                  transition-all duration-500 group-focus-within:w-1/2 opacity-50"></div>
    </div>

    <p v-if="error" class="text-[10px] text-red-500 font-bold uppercase tracking-tight ml-1 animate-in fade-in slide-in-from-top-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  error: String
})

defineEmits(['update:modelValue'])
</script>