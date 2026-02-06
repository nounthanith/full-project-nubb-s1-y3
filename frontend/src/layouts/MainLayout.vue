<template>
  <div class="min-h-screen bg-[#fafafa] font-sans">
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <div 
      :class="[
        'transition-all duration-300 ease-in-out min-h-screen flex flex-col',
        isSidebarOpen ? 'lg:pl-72' : 'pl-0'
      ]"
    >
      <Navbar @toggleSidebar="isSidebarOpen = !isSidebarOpen" />
      
      <main class="p-5">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'

const isSidebarOpen = ref(true)
</script>