<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import MainLayout from './layouts/MainLayout.vue';
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <MainLayout v-if="route.name !== 'Login'">
    <RouterView />
  </MainLayout>
  <RouterView v-else />
  <Toaster position="top-right" /> <!-- can add richColors prop for colored toasts -->
</template>
