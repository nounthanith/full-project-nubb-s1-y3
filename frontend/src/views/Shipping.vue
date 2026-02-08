<template>
    <div class="">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div class="space-y-1">
                <h1 class="text-xl font-black text-gray-900 tracking-tight uppercase">
                    Deliveries<span class="text-[#ff1493]">.</span>
                </h1>
                <p class="text-gray-500 font-medium tracking-wide text-sm">Logistics Management Dashboard</p>
            </div>

            <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div class="relative w-full sm:w-72">
                    <input v-model="search" @input="fetchShippings" type="text" placeholder="Search shipments..."
                        class="w-full pl-11 pr-4 py-3 bg-gray-100/50 border-none rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-[#ff1493]/10 transition-all placeholder:text-gray-400" />
                    <svg class="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <BaseBtn @click="showForm = true" variant="secondary" :rounded="false" size="sm">
                <span class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="3">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add New
                </span>
            </BaseBtn>
            </div>
        </header>

        <div v-if="loading" class="flex flex-col items-center justify-center py-32 space-y-4">
            <div class="w-12 h-12 border-2 border-gray-100 border-t-[#ff1493] rounded-full animate-spin"></div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Syncing Data</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-6">
            <div v-for="(item, index) in shippings" :key="item._id"
                class="bg-white rounded-[2.5rem] p-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-700 group border border-transparent hover:border-gray-100">

                <div class="flex flex-col lg:flex-row lg:items-center p-6 lg:p-8 gap-8">

                    <div class="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:w-40">
                        <div class="space-y-1">
                            <span
                                class="text-[10px] font-black uppercase text-gray-300 tracking-widest block">Tracking</span>
                            <p class="font-mono font-bold text-gray-900 text-sm tracking-tighter">{{ item.trackingNumber
                                }}</p>
                        </div>
                        <div :class="statusClass(item.status)"
                            class="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mt-0 lg:mt-4">
                            {{ item.status }}
                        </div>
                    </div>

                    <div
                        class="flex-1 grid grid-cols-1 md:grid-cols-7 items-center gap-6 py-6 lg:py-0 border-y lg:border-y-0 lg:border-x border-gray-50 px-0 lg:px-10">
                        <div class="md:col-span-3">
                            <span
                                class="text-[9px] font-black text-[#ff1493] uppercase tracking-widest mb-2 block">Origin</span>
                            <h4 class="text-base font-bold text-gray-900 mb-1">{{ item.sender.name }}</h4>
                            <p class="text-xs text-gray-400 font-medium">{{ item.sender.phone }}</p>
                            <p class="text-[11px] text-gray-300 italic truncate mt-1">{{ item.sender.address }}</p>
                        </div>

                        <div class="hidden md:flex md:col-span-1 justify-center">
                            <div
                                class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#ff1493]/5 transition-colors">
                                <svg class="w-4 h-4 text-gray-300 group-hover:text-[#ff1493] transition-colors"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>

                        <div class="md:col-span-3 text-left md:text-right">
                            <span
                                class="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-2 block">Destination</span>
                            <h4 class="text-base font-bold text-gray-900 mb-1">{{ item.recipient.name }}</h4>
                            <p class="text-xs text-gray-400 font-medium">{{ item.recipient.phone }}</p>
                            <p class="text-[11px] text-gray-300 italic truncate mt-1">{{ item.recipient.address }}</p>
                        </div>
                    </div>

                    <div class="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:w-32 gap-4">
                        <div class="text-left lg:text-right">
                            <span
                                class="text-[9px] font-black text-gray-300 uppercase tracking-widest block">Cost</span>
                            <p class="text-xl font-black text-gray-900">${{ item.shippingCost }}</p>
                        </div>
                        <div class="flex gap-2">
                            <button @click="openEditModal(item)"
                                class="p-3 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-2xl transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button @click="confirmDelete(item)"
                                class="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <BaseDialog :show="showForm" @close="showForm = false" @confirm="saveShipping"
            :confirmText="isEditing ? 'Update Shipment' : 'Create Order'">
            <template #title>
                <span class="text-xl font-black tracking-tight text-gray-900">
                    {{ isEditing ? 'Edit Shipment' : 'New Order' }}
                </span>
            </template>

            <div class="space-y-8 py-6 max-h-[75vh] overflow-y-auto px-1 custom-scrollbar">
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <Selection v-model="form.category" :roles="categories" label="Category"
                            placeholder="Select a category" />
                    </div>
                    <Input v-model="form.weight" @input="updateShippingCost" type="number" label="Weight (kg)" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <h3 class="text-[10px] font-black text-[#ff1493] uppercase tracking-[0.2em] mb-4">Pickup Info
                        </h3>
                        <Input v-model="form.sender.name" label="Name" />
                        <Selection v-model="form.sender.address" :roles="addresses" label="Address"
                            placeholder="Select an address" />
                        <Input v-model="form.sender.phone" label="Phone" />
                    </div>

                    <div class="space-y-4">
                        <h3 class="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4">Delivery Info
                        </h3>
                        <Input v-model="form.recipient.name" label="Name" />
                        <Selection v-model="form.recipient.address" :roles="addresses" label="Address"
                            placeholder="Select an address" />
                        <Input v-model="form.recipient.phone" label="Phone" />
                        <!-- <Input v-model="form.recipient.address" label="Address" /> -->
                    </div>
                </div>

                <div class="pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                    <Input v-model="form.shippingCost" type="number" label="Total Price ($)" readonly />
                    <div v-if="isEditing" class="space-y-1">
                        <Selection v-model="form.status" :roles="['Pending', 'In Transit', 'Delivered']" label="Status"
                            placeholder="Select a status" />
                    </div>
                </div>
            </div>
        </BaseDialog>

        <BaseDialog :show="showDeleteConfirm" @close="showDeleteConfirm = false" @confirm="handleDelete" 
            confirmText="Delete" title="Delete Confirmation">
            Are you sure you want to delete shipping with tracking number 
            <span class="text-[#ff1493] font-bold">{{ selectedShipping?.trackingNumber }}</span>? 
            This action cannot be undone.
        </BaseDialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../api/api';
import { toast } from 'vue-sonner';
import BaseBtn from '../components/BaseBtn.vue';
import BaseDialog from '../components/Dialog.vue';
import Input from '../components/Input.vue';
import Selection from '../components/Selection.vue';

const shippings = ref([]);
const categories = ref([]);
const loading = ref(false);
const showForm = ref(false);
const isEditing = ref(false);
const search = ref('');
const showDeleteConfirm = ref(false);
const selectedShipping = ref(null);

const addresses = ref([
    { name: 'Phnom Penh', capital: 'Autonomous Municipality' },
    { name: 'Battambang', capital: 'Battambang' },
    { name: 'Siem Reap', capital: 'Siem Reap' },
    { name: 'Banteay Meanchey', capital: 'Serei Saophoan' },
    { name: 'Kampong Cham', capital: 'Kampong Cham' },
    { name: 'Kampong Chhnang', capital: 'Kampong Chhnang' },
    { name: 'Kampong Speu', capital: 'Chbar Mon' },
    { name: 'Kampong Thom', capital: 'Steung Saen' },
    { name: 'Kampot', capital: 'Kampot' },
    { name: 'Kandal', capital: 'Ta Khmau' },
    { name: 'Kep', capital: 'Kep' },
    { name: 'Koh Kong', capital: 'Khemarak Phoumin' },
    { name: 'Kratie', capital: 'Kratie' },
    { name: 'Mondulkiri', capital: 'Senmonorom' },
    { name: 'Oddar Meanchey', capital: 'Samraong' },
    { name: 'Pailin', capital: 'Pailin' },
    { name: 'Preah Sihanouk', capital: 'Sihanoukville' },
    { name: 'Preah Vihear', capital: 'Preah Vihear' },
    { name: 'Pursat', capital: 'Pursat' },
    { name: 'Prey Veng', capital: 'Prey Veng' },
    { name: 'Ratanak Kiri', capital: 'Banlung' },
    { name: 'Ratanakiri', capital: 'Banlung' },
    { name: 'Stung Treng', capital: 'Stung Treng' },
    { name: 'Svay Rieng', capital: 'Svay Rieng' },
    { name: 'Takeo', capital: 'Doun Kaev' },
    { name: 'Tboung Khmum', capital: 'Suong' }
]);

const form = ref({
    category: '',
    sender: { name: '', phone: '', address: '', province: '' },
    recipient: { name: '', phone: '', address: '', province: '' },
    weight: 1,
    shippingCost: 0,
    status: 'Pending'
});

const calculateShippingCost = (weight) => {
    return weight * 0.25;
};

const updateShippingCost = () => {
    form.value.shippingCost = calculateShippingCost(form.value.weight);
};

const fetchShippings = async () => {
    loading.value = true;
    try {
        const res = await api.get('/api/shipping', { params: { search: search.value } });
        shippings.value = res.data.data;
    } catch (err) {
        toast.error("Network synchronization failed");
    } finally {
        loading.value = false;
    }
};

const fetchCategories = async () => {
    const res = await api.get('/api/categories');
    categories.value = res.data.data || res.data;
};

const saveShipping = async () => {
    try {
        if (isEditing.value) {
            await api.put(`/api/shipping/${form.value._id}`, form.value);
            toast.success("Shipment updated");
        } else {
            await api.post('/api/shipping/create', form.value);
            toast.success("New order created");
        }
        showForm.value = false;
        fetchShippings();
    } catch (err) {
        toast.error(err.response?.data?.message || "Check required fields");
    }
};

const openAddModal = () => {
    isEditing.value = false;
    const initialWeight = 1;
    form.value = {
        category: '',
        sender: { name: '', phone: '', address: '', province: '' },
        recipient: { name: '', phone: '', address: '', province: '' },
        weight: initialWeight, 
        shippingCost: calculateShippingCost(initialWeight), 
        status: 'Pending'
    };
    showForm.value = true;
};

const openEditModal = (item) => {
    isEditing.value = true;
    form.value = JSON.parse(JSON.stringify(item));
    showForm.value = true;
};

const confirmDelete = (item) => {
    selectedShipping.value = item;
    showDeleteConfirm.value = true;
};

const handleDelete = async () => {
    try {
        await api.delete(`/api/shipping/${selectedShipping.value._id}`);
        toast.success("Shipping deleted successfully");
        showDeleteConfirm.value = false;
        selectedShipping.value = null;
        fetchShippings();
    } catch (err) {
        toast.error(err.response?.data?.message || "Delete failed");
    }
};

const statusClass = (status) => {
    const base = "border border-transparent";
    if (status === 'Delivered') return `${base} bg-green-50 text-green-600`;
    if (status === 'In Transit') return `${base} bg-blue-50 text-blue-600`;
    return `${base} bg-amber-50 text-amber-600`;
};

onMounted(() => {
    fetchShippings();
    fetchCategories();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #f1f1f1;
    border-radius: 10px;
}
</style>