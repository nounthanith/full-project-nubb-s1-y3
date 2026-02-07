<template>
  <div class="w-full space-y-1.5 text-left">
    <label 
      v-if="label" 
      class="block text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1"
    >
      {{ label }}
    </label>

    <div class="relative group">
      <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#ff1493] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        class="w-full appearance-none bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl px-4 py-3.5 
               outline-none transition-all duration-300 cursor-pointer
               focus:bg-white focus:border-[#ff1493] focus:ring-4 focus:ring-[#ff1493]/10"
      >
        <option value="" disabled selected>{{ placeholder || 'Select a role' }}</option>
        <option v-for="item in roles" :key="item._id || item" :value="item._id || item" class="bg-white text-gray-900">
          {{ item.name || item }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  roles: { type: Array, default: () => [] },
  placeholder: String
})

defineEmits(['update:modelValue'])
</script>