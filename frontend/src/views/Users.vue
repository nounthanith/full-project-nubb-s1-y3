<template>
  <div class="max-w-6xl mx-auto px-6 py-2">
    
    <header class="flex justify-between items-center mb-12">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Users</h1>
        <p class="text-gray-500 text-sm mt-1">Manage your team members and roles.</p>
      </div>
      <BaseBtn type="primary" :rounded="true" size="sm" class="hover:-translate-y-1 transition-transform">
        <span class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add User
        </span>
      </BaseBtn>
    </header>

    <div v-if="loading" class="text-center py-20 text-gray-400 animate-pulse uppercase tracking-widest text-xs">
      Syncing Database...
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      <div 
        v-for="(user, index) in users" 
        :key="user.id" 
        class="bg-white border border-gray-200 p-3 rounded-2xl hover:border-[#ff1493]/30 hover:shadow-xl hover:shadow-[#ff1493]/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2"
        :style="{ 'animation-delay': `${index * 50}ms` }"
      >
        <div class="flex items-start justify-between mb-4">
            <div>
                <h2 class="text-lg font-bold text-gray-900 leading-tight"><span class="text-gray-400 font-semibold text-sm">My Name is: </span>{{ user.name }}</h2>
                <p class="text-gray-400 text-sm mb-6">{{ user.email }}</p>
            </div>
          <span v-if="user.role" :class="roleStyle(user.role)">
            {{ user.role }}
          </span>
        </div>

        

        <div class="flex gap-2 justify-end">
          <BaseBtn variant="warning" size="sm">
            Edit
          </BaseBtn>
          <BaseBtn variant="danger" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </BaseBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/api'
import BaseBtn from '../components/BaseBtn.vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)

const roleStyle = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-red-500 text-white text-xs font-bold px-1 py-1 rounded-md uppercase tracking-wider'
    case 'user':
      return 'bg-blue-500 text-white text-xs font-bold px-1 py-1 rounded-md uppercase tracking-wider'
    default:
      return 'bg-gray-500 text-white text-xs font-bold px-1 py-1 rounded-md uppercase tracking-wider'
  }
}

const getUsers = async () => {
  loading.value = true
  error.value = null

  try {
    const res = await api.get('/api/users')
    users.value = res.data.data
  } catch (err) {
    error.value = err.message || 'Failed to load users'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getUsers()
})
</script>
