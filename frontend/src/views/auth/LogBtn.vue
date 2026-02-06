<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BaseBtn from '../../components/BaseBtn.vue';
import BaseDialog from '../../components/Dialog.vue';

const router = useRouter();
const token = ref(null);
const showLogoutConfirm = ref(false); // Toggle for the dialog

onMounted(() => {
  token.value = localStorage.getItem("token");
});

// This opens the dialog first
const triggerLogout = () => {
  showLogoutConfirm.value = true;
};

// This actually clears the session
const confirmLogout = () => {
  localStorage.removeItem("token");
  token.value = null;
  showLogoutConfirm.value = false;
  router.push('/login'); 
};
</script>

<template>
  <div class="flex items-center gap-4">
    
    <BaseBtn 
      v-if="token" 
      type="ghost" 
      size="sm" 
      :rounded="true"
      @click="triggerLogout"
    >
      <div class="flex items-center gap-2 uppercase tracking-tighter text-[10px] font-black">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </div>
    </BaseBtn>

    <BaseDialog 
      :show="showLogoutConfirm" 
      @close="showLogoutConfirm = false"
      @confirm="confirmLogout"
    >
      <template #title>Logout?</template>
      <div class="py-2">
        <p class="text-sm text-gray-500 font-medium">
          Are you sure? You want to logout?
        </p>
      </div>
    </BaseDialog>

    <slot></slot>
  </div>
</template>