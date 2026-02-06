<template>
    <header>
        <center>
            <h1 class="text-white bg-black p-1">Navbar</h1>
        </center>
    </header>
  <nav class="flex justify-between items-center p-2 border-b">
    <div>Logo</div>
    <div class="flex gap-2">
        <RouterLink class="hover:text-[hotpink] transition-all duration-300" active-class="text-[hotpink]" v-for="item in navItems" :key="item.name" :to="item.path">
            {{ item.name }}
        </RouterLink>
    </div>
    <div>
        <BaseBtn variant="primary" size="sm">Login</BaseBtn>
    </div>
  </nav>

  <slot />
</template>

<script setup>
import BaseBtn from '../components/BaseBtn.vue';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'User', path: '/users' }
]
</script>