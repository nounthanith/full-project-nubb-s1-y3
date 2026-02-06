<script setup lang="ts">
import Input from '../../components/Input.vue';
import BaseBtn from '../../components/BaseBtn.vue';
import { ref } from 'vue';
import api from '../../api/api';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

const router = useRouter();
const email = ref('admin@test.com');
const password = ref('123123');

const handleLogin = async () => {
    try {
        const response = await api.post('/api/users/login', {
            email: email.value,
            password: password.value
        });
        
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful!');
        router.push('/');
        
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Login failed');
    }
}
</script>

<template>
  <div class="min-h-[85vh] flex flex-col items-center justify-center px-6">
    
    <div class="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 class="text-4xl font-black tracking-tighter text-gray-900 uppercase">
        Welcome <span class="text-[#ff1493]">Back</span>
      </h1>
      <p class="text-gray-400 text-sm font-medium mt-2 tracking-wide">Enter your details to access your account</p>
    </div>

    <div class="w-full max-w-sm bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-2xl shadow-[#ff1493]/5 transition-all">
      <form @submit.prevent class="space-y-6">
        
        <Input 
          v-model="email"
          label="Email Address*" 
          type="email" 
          placeholder="helloworld@gmail.com"
        />

        <Input 
          v-model="password"
          label="Password*" 
          type="password" 
          placeholder="••••••••"
        />

        <div class="pt-2">
          <BaseBtn @click="handleLogin" type="primary" class="w-full rounded-2xl shadow-xl shadow-[#ff1493]/20 py-4">
            Sign In
          </BaseBtn>
        </div>

        <p class="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mt-6">
          New here? <a href="#" class="text-[#ff1493] hover:underline">Create Account</a>
        </p>
      </form>
    </div>

    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff1493]/5 blur-[120px] -z-10 rounded-full"></div>
  </div>
</template>