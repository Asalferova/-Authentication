<script setup>
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem("userTokens"));
  if (tokens) {
    authStore.userInfo.token = tokens.userToken;
    authStore.userInfo.refreshToken = tokens.userRefreshToken;
  }
}
checkUser();
</script>

<template>
  <RouterView />
</template>
