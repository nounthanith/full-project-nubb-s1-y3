<template>
  <div class="max-w-7xl mx-auto">
    <header class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-xl font-black text-gray-900 tracking-tighter uppercase">
          Users <span class="text-[#ff1493]">.</span>
        </h1>
        <p class="text-gray-400 text-sm font-medium tracking-wide">
          Total Members: {{ users.length }}
        </p>
      </div>
      <BaseBtn @click="showAddUserModal = true" variant="secondary" size="sm">
        <span class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="3">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New
        </span>
      </BaseBtn>
    </header>

    <div v-if="loading" class="text-center text-gray-400 animate-pulse uppercase tracking-widest text-xs">
      Syncing Database...
    </div>

    <div v-else-if="users.length === 0"
      class="text-center text-gray-400 animate-pulse uppercase tracking-widest text-xs">
      No users found
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
      <div v-for="(user, index) in users" :key="user.id"
        class="group relative bg-white border border-gray-100 p-4 rounded-2xl hover:shadow-2xl hover:shadow-[#ff1493]/10 hover:border-[#ff1493]/30 transition-all duration-500 animate-in fade-in slide-in-from-bottom-3"
        :style="{ 'animation-delay': `${index * 40}ms` }">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">

          <div class="flex items-center gap-1.5 order-2 sm:order-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-300 shrink-0" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div class="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tight truncate">
              Joined {{ formatDate(user.createdAt) }}
            </div>
          </div>

          <span v-if="user.role" :class="roleStyle(user.role)"
            class="order-1 sm:order-2 self-start sm:self-auto text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded-full border tracking-tighter whitespace-nowrap">
            {{ user.role }}
          </span>
        </div>

        <div class="space-y-1 mb-6">
          <h2
            class="text-base font-bold text-gray-900 leading-tight truncate group-hover:text-[#ff1493] transition-colors">
            {{ user.name }}
          </h2>

          <p class="text-gray-400 text-[11px] truncate">{{ user.email }}</p>

          <div class="inline-flex items-center mt-2 px-2 py-1 bg-green-50 rounded-lg border border-green-100">
            <span class="text-green-600 text-[10px] font-bold tracking-tight">
              ${{ user.salary?.toLocaleString() }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-3 border-t border-gray-50">
          <BaseBtn @click="openEditModal(user)" variant="ghost" size="sm" :rounded="true" class="w-full">
            Edit
          </BaseBtn>

          <BaseBtn @click="
            showDeleteModal = true;
          selectedUser = user;
          " variant="danger" size="sm" :rounded="true" class="py-1 px-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </BaseBtn>
        </div>
      </div>
    </div>
  </div>

  <BaseDialog :show="showDeleteModal" @close="showDeleteModal = false" @confirm="handleDelete">
    <template #title>Delete User</template>
    <p>
      Are you sure you want to remove
      <span class="text-[#ff1493] font-bold">{{ selectedUser?.name }}</span>? This action cannot be undone.
    </p>
  </BaseDialog>

  <BaseDialog :show="showAddUserModal" @close="showAddUserModal = false" @confirm="handleAddUser">
    <template #title>Add User</template>
    <Input v-model="name" type="text" label="Name" placeholder="Name" />
    <Input v-model="email" type="email" label="Email" placeholder="Email" />
    <Input v-model="password" type="password" label="Password" placeholder="Password" />
    <Input v-model="salary" type="number" label="Salary" placeholder="Salary" />
    <Selection v-model="role" :roles="roles" label="Role" placeholder="Select a role" />
  </BaseDialog>

  <BaseDialog :show="showEditUserModal" @close="showEditUserModal = false" @confirm="handleEditUser">
    <template #title>Edit User</template>
    <Input v-model="name" type="text" label="Name" placeholder="Name" />
    <Input v-model="email" type="email" label="Email" placeholder="Email" />
    <!-- <Input v-model="password" type="password" label="Password" placeholder="Password" /> -->
    <Input v-model="salary" type="number" label="Salary" placeholder="Salary" />
    <Selection v-model="role" :roles="roles" label="Role" placeholder="Select a role" />
  </BaseDialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/api";
import BaseBtn from "../components/BaseBtn.vue";
import BaseDialog from "../components/Dialog.vue";
import { toast } from "vue-sonner";
import Input from "../components/Input.vue";
import Selection from "../components/Selection.vue";

const users = ref([]);
const loading = ref(false);
const error = ref(null);
const showDeleteModal = ref(false);
const selectedUser = ref(null);
const showAddUserModal = ref(false);
const showEditUserModal = ref(false);

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("customer");
const salary = ref(0);
const roles = ref([
  "admin",
  "delivery",
  "manager",
  "inventory_manager",
  "customer",
]);

const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  // Returns something clean like "Oct 24, 2025"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const roleStyle = (role) => {
  switch (role) {
    case "admin":
      return "bg-red-500 text-white text-[8px] font-bold px-1 py-1 rounded-sm uppercase tracking-wider";
    case "customer":
      return "bg-blue-500 text-white text-[8px] font-bold px-1 py-1 rounded-sm uppercase tracking-wider";
    case "delivery":
      return "bg-green-500 text-white text-[8px] font-bold px-1 py-1 rounded-sm uppercase tracking-wider";
    case "manager":
      return "bg-yellow-500 text-white text-[8px] font-bold px-1 py-1 rounded-sm uppercase tracking-wider";
    case "inventory_manager":
      return "bg-purple-500 text-white text-[8px] font-bold px-1 py-1 rounded-sm uppercase tracking-wider";
    default:
      return "bg-gray-500 text-white text-xs font-bold px-1 py-1 rounded-md uppercase tracking-wider";
  }
};

const getUsers = async () => {
  loading.value = true;
  error.value = null;

  try {
    const res = await api.get("/api/users");
    users.value = res.data.data;
  } catch (err) {
    error.value = err.message || "Failed to load users";
  } finally {
    loading.value = false;
  }
};

const handleDelete = async () => {
  showDeleteModal.value = false;
  try {
    const res = await api.delete(`/api/users/${selectedUser.value._id}`);
    toast.success(res.data.message);
    getUsers();
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

const handleAddUser = async () => {
  showAddUserModal.value = false;
  try {
    const res = await api.post("/api/users/create", {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
      salary: salary.value,
    });
    toast.success(res.data.message);
    getUsers();
    // Clear form
    name.value = "";
    email.value = "";
    password.value = "";
    role.value = "customer";
    salary.value = 0;
  } catch (err) {
    toast.error(err.message);
  }
};

const openEditModal = (user) => {
  selectedUser.value = user;
  name.value = user.name;
  email.value = user.email;
  password.value = "";
  role.value = user.role;
  salary.value = user.salary;
  showEditUserModal.value = true;
};

const handleEditUser = async () => {
  showEditUserModal.value = false;
  try {
    const res = await api.put(`/api/users/${selectedUser.value._id}`, {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
      salary: salary.value,
    });
    toast.success(res.data.message);
    getUsers();
  } catch (err) {
    toast.error(err.message);
  }
};

onMounted(() => {
  getUsers();
});
</script>
