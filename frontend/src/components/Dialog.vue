<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="show" 
        class="fixed inset-0 z-100 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="$emit('close')"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div 
            v-if="show"
            class="bg-white w-full max-w-md rounded-3xl shadow-2xl shadow-[#ff1493]/10 overflow-hidden border border-gray-100"
          >
            <div class="px-8 pt-8 pb-4 flex justify-between items-center">
              <h3 class="text-xl font-black tracking-tight text-gray-900">
                <slot name="title">Confirm Action</slot>
              </h3>
              <button 
                @click="$emit('close')"
                class="text-gray-400 hover:text-[#ff1493] transition-colors p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="px-8 py-2 text-gray-500 font-medium">
              <slot>Are you sure you want to perform this action?</slot>
            </div>

            <div class="p-8 flex gap-3">
              <BaseBtn 
                variant="ghost" 
                size="sm" 
                class="flex-1 bg-gray-50!" 
                @click="$emit('close')"
              >
                Cancel
              </BaseBtn>
              <BaseBtn 
                variant="primary" 
                size="sm" 
                class="flex-1 shadow-lg shadow-[#ff1493]/20"
                @click="$emit('confirm')"
              >
                Confirm
              </BaseBtn>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import BaseBtn from './BaseBtn.vue';

defineProps({
  show: { type: Boolean, default: false }
})
defineEmits(['close', 'confirm'])
</script>