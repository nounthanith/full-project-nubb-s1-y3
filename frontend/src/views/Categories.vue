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
                class="group flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-gray-100 p-4 sm:p-5 rounded-2xl hover:border-[#ff1493]/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-[#ff1493]/5 animate-in fade-in slide-in-from-bottom-2"
                :style="{ 'animation-delay': `${index * 50}ms` }">

                <div class="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <div
                        class="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gray-50 flex items-center justify-center text-[#ff1493] font-black group-hover:bg-[#ff1493] group-hover:text-white transition-all duration-500 text-[10px]">
                        #{{ index + 1 }}
                    </div>

                    <div class="min-w-0 flex-1">
                        <h3
                            class="font-bold text-gray-900 leading-tight group-hover:text-[#ff1493] transition-colors truncate">
                            {{ cat.name }}
                        </h3>
                        <p class="text-gray-400 text-xs mt-0.5 truncate max-w-[200px] sm:max-w-md italic font-medium">
                            {{ cat.description || 'No description provided' }}
                        </p>
                    </div>
                </div>

                <div
                    class="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 pt-3 sm:pt-0 border-t border-gray-50 sm:border-none justify-end">
                    <BaseBtn variant="ghost" size="sm" class="flex-1 sm:flex-none justify-center" :rounded="true"
                        @click="triggerEdit(cat)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span class="sm:hidden ml-2 text-[10px] uppercase font-bold">Edit</span>
                    </BaseBtn>

                    <BaseBtn variant="danger" size="sm" class="flex-1 sm:flex-none justify-center" :rounded="true"
                        @click="triggerDelete(cat)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span class="sm:hidden ml-2 text-[10px] uppercase font-bold">Delete</span>
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

        <BaseDialog :show="showEditCategory" @close="showEditCategory = false" @confirm="handleEditCategory"
            :confirmText="'Update'">
            <template #title>Edit Category</template>
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
const showEditCategory = ref(false);
const showDeleteConfirm = ref(false);
const selectedCategory = ref(null);

// Form State
const name = ref('');
const description = ref('');

// Helper to reset form
const resetForm = () => {
    name.value = '';
    description.value = '';
    selectedCategory.value = null;
};

const fetchCategories = async () => {
    loading.value = true;
    try {
        const res = await api.get('/api/categories');
        categories.value = res.data.data || res.data;
    } catch (err: any) {
        toast.error('Failed to load categories');
    } finally {
        loading.value = false;
    }
};

const handleAddCategory = async () => {
    if (!name.value.trim()) return toast.error('Category name is required');

    try {
        const response = await api.post('/api/categories/create', {
            name: name.value,
            description: description.value,
        });
        await fetchCategories();
        showAddCategory.value = false;
        resetForm(); // Always clean up
        toast.success(response.data.message || 'Successfully created');
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Something went wrong');
    }
};

// NEW: Trigger Edit Logic
const triggerEdit = (cat: any) => {
    selectedCategory.value = cat;
    name.value = cat.name;
    description.value = cat.description;
    showEditCategory.value = true;
};

const handleEditCategory = async () => {
    if (!name.value.trim()) return toast.error('Category name is required');

    try {
        const response = await api.put(`/api/categories/${selectedCategory.value._id}`, {
            name: name.value,
            description: description.value,
        });

        await fetchCategories();
        showEditCategory.value = false;
        resetForm();
        toast.success(response.data.message || 'Successfully updated');
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Something went wrong');
    }
};

const triggerDelete = (cat: any) => {
    selectedCategory.value = cat;
    showDeleteConfirm.value = true;
};

const handleDelete = async () => {
    try {
        await api.delete(`/api/categories/${selectedCategory.value._id}`);
        toast.success('Category removed');
        showDeleteConfirm.value = false;
        fetchCategories();
        resetForm();
    } catch (err) {
        toast.error('Delete failed');
    }
};

onMounted(fetchCategories);
</script>