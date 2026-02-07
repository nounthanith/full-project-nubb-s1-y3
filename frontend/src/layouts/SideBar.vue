<template>
  <div 
    v-if="isOpen" 
    @click="$emit('close')" 
    class="fixed inset-0 bg-black/20 backdrop-blur-sm z-998 lg:hidden transition-opacity"
  ></div>

  <aside 
    :class="[
      'fixed top-0 left-0 h-full bg-white border-r border-pink-300 z-999 transition-all duration-300 ease-in-out w-72',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="h-20 flex items-center px-8 border-b border-gray-50">
      <div class="text-xl font-black tracking-tighter text-gray-900">
        <span class="text-[#ff1493]">Salu</span> <span class="bg-[#ff1493] text-white px-2 py-1 rounded">Hub</span>
      </div>
    </div>

    <nav class="p-4 space-y-2">
      <RouterLink 
        v-for="item in menuItems" 
        :key="item.path"
        :to="item.path"
        @click="closeOnMobile"
        class="flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all group"
        active-class="bg-[#ff1493]/10 text-[#ff1493]"
        inactive-class="text-gray-400 hover:bg-gray-50 hover:text-gray-900"
      >
        <component :is="item.icon" class="w-5 h-5" />
        {{ item.name }}
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])

const menuItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Users', path: '/users' },
  { name: 'Categories', path: '/categories' },
]

const closeOnMobile = () => {
  if (window.innerWidth < 1024) emit('close')
}
</script>