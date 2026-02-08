<script setup>
import { onMounted, ref, computed } from 'vue';
import api from '../api/api';

const allUsers = ref(0);
const allCategories = ref(0);
const allShippings = ref(0);
const loading = ref(true);

const fetchAllStats = async () => {
    try {
        loading.value = true;
        const [usersRes, catsRes, shipRes] = await Promise.all([
            api.get("/api/users"),
            api.get("/api/categories"),
            api.get("/api/shipping")
        ]);

        allUsers.value = usersRes.data.data.length;
        allCategories.value = catsRes.data.data.length;
        allShippings.value = shipRes.data.data.length;
    } catch (error) {
        console.error("Dashboard Sync Error:", error);
    } finally {
        setTimeout(() => { loading.value = false; }, 300);
    }
}

const stats = computed(() => [
    { label: 'Total Users', value: allUsers.value, unit: 'People', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { label: 'Total Categories', value: allCategories.value, unit: 'Types', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { label: 'Total Shipments', value: allShippings.value, unit: 'Parcels', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' }
]);

onMounted(fetchAllStats);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div v-for="stat in stats" :key="stat.label" 
      class="group bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500">
      
      <div class="flex items-center justify-between mb-4">
        <span class="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
          {{ stat.label }}
        </span>
        <div class="p-2 bg-gray-50 rounded-xl group-hover:bg-[#ff1493]/10 group-hover:text-[#ff1493] transition-colors text-gray-300">
           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
           </svg>
        </div>
      </div>
      
      <div v-if="loading" class="space-y-2">
        <div class="h-10 w-20 bg-gray-50 animate-pulse rounded-2xl"></div>
      </div>
      
      <div v-else class="flex items-baseline gap-2">
        <h2 class="text-4xl font-black text-gray-900 tracking-tighter">
          {{ stat.value }}
        </h2>
        <span class="text-[11px] text-[#ff1493] font-bold uppercase tracking-widest">
          {{ stat.unit }}
        </span>
      </div>
    </div>
  </div>
</template>