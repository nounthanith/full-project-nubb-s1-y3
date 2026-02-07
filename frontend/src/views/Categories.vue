<template>
    <div class="">

        <header class="flex justify-between items-center sm:items-center gap-4 mb-4">
            <div class="animate-in fade-in slide-in-from-left-4 duration-700">
                <h1 class="text-xl font-black text-gray-900 tracking-tighter uppercase">
                    Categories <span class="text-[#ff1493]">.</span>
                </h1>
                <p class="text-gray-400 text-sm font-medium tracking-wide">
                    Total Members: {{ categories.length }}
                </p>
            </div>

            <BaseBtn @click="showAddCategory = true" variant="secondary" :rounded="false" size="sm">
                <span class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="3">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add New
                </span>
            </BaseBtn>
        </header>

        <div v-if="loading" class="flex flex-col items-center justify-center py-32 space-y-4">
            <div class="w-8 h-8 border-4 border-gray-100 border-t-[#ff1493] rounded-full animate-spin"></div>
            <p class="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Syncing Data</p>
        </div>

        <div v-else-if="categories.length === 0"
            class="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 animate-in zoom-in-95 duration-500">
            <div class="text-gray-300 mb-4 flex justify-center">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
            </div>
            <p class="text-gray-400 font-bold uppercase text-xs tracking-widest">Your shelf is empty</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-3">
            <div v-for="(cat, index) in categories" :key="cat._id"
                class="group flex items-center justify-between bg-white border border-gray-100 p-5 rounded-2xl hover:border-[#ff1493]/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-[#ff1493]/5 animate-in fade-in slide-in-from-bottom-2"
                :style="{ 'animation-delay': `${index * 50}ms` }">
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#ff1493] font-black group-hover:bg-[#ff1493] group-hover:text-white transition-all duration-500 text-[10px]">
                        #{{ index + 1 }}
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-900 leading-tight group-hover:text-[#ff1493] transition-colors">
                            {{ cat.name }}</h3>
                        <p class="text-gray-400 text-xs mt-0.5 truncate max-w-50 sm:max-w-md italic font-medium">
                            {{ cat.description || 'No description provided' }}
                        </p>
                    </div>
                </div>

                <div class="flex gap-1">
                    <BaseBtn variant="warning" size="sm" :rounded="false">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </BaseBtn>
                    <BaseBtn variant="danger" size="sm" :rounded="false" @click="triggerDelete(cat)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </BaseBtn>
                </div>
            </div>
        </div>

        <BaseDialog :show="showAddCategory" @close="showAddCategory = false" @confirm="handleAddCategory">
            <template #title>New Category</template>
            <div class="space-y-5 py-4">
                <Input v-model="name" type="text" label="Display Name*" placeholder="e.g. Luxury Goods" />
                <Input v-model="description" type="text" label="Short Description"
                    placeholder="Describe the purpose of this group..." />
            </div>
        </BaseDialog>

        <BaseDialog :show="showDeleteConfirm" @close="showDeleteConfirm = false" @confirm="handleDelete">
            <template #title>Delete Category</template>
            <p class="text-gray-500 text-sm py-2 font-medium">
                Are you sure you want to delete <span class="text-[#ff1493] font-bold">{{ selectedCategory?.name
                    }}</span>? This
                cannot be undone.
            </p>
        </BaseDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/api';
import BaseBtn from '../components/BaseBtn.vue';
import BaseDialog from '../components/Dialog.vue';
import Input from '../components/Input.vue';
import { toast } from 'vue-sonner';

// State
const categories = ref([]);
const loading = ref(false);
const showAddCategory = ref(false);
const showDeleteConfirm = ref(false);
const selectedCategory = ref(null);

// Form State
const name = ref('');
const description = ref('');

const fetchCategories = async () => {
    loading.value = true;
    try {
        const res = await api.get('/api/categories');
        // Adjust this line based on your backend response structure
        categories.value = res.data.data || res.data;
    } catch (err: any) {
        toast.error('Failed to load categories');
    } finally {
        loading.value = false;
    }
};

const handleAddCategory = async () => {
    if (!name.value.trim()) {
        return toast.error('Category name is required');
    }

    try {
        const response = await api.post('/api/categories/create', {
            name: name.value,
            description: description.value,
        });

        await fetchCategories();
        name.value = '';
        description.value = '';
        showAddCategory.value = false;

        toast.success(response.data.message || 'Successfully created');
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Something went wrong');
    }
};

const triggerDelete = (cat) => {
    selectedCategory.value = cat;
    showDeleteConfirm.value = true;
};

const handleDelete = async () => {
    try {
        await api.delete(`/api/categories/${selectedCategory.value._id}`);
        toast.success('Category removed');
        showDeleteConfirm.value = false;
        fetchCategories();
    } catch (err) {
        toast.error('Delete failed');
    }
};

onMounted(fetchCategories);
</script>