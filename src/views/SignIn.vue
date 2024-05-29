<script setup>
import { useAuthStore } from '@/stores/auth'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import TheLoader from '../components/TheLoader.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const authStore = useAuthStore()
const router = useRouter()

const state = reactive({
  name: '',
  password: ''
})

const signin = async () => {
  await authStore.authenticate({ email: state.email, password: state.password }, 'signin')
  router.push('/')
}

const signInWithGoogle = async () => {
  await authStore.googleSignIn()
  router.push('/')
}
</script>

<template>
  <header class="header">
    <h1 class="header__title">Форма Входа</h1>
    <button @click="router.push('/sign-up')" class="sing-up form__submit-button">
      Регистрация
    </button>
  </header>
  <main class="main">
    <div class="container">
      <div class="google-reg form">
        <p class="form_title">Войти с помощью Google</p>
        <button class="google-btn" @click="signInWithGoogle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" width="30" height="30">
            <path
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              fill="#ffffff"
            />
          </svg>
        </button>
      </div>
      <p class="default-text_bold">или</p>
      <form class="form form__login" @submit.prevent="signin">
        <p class="form_title">Вход по email/пароль</p>
        <label for="email" class="form__label">Email:</label>
        <input
          type="email"
          v-model="state.email"
          id="useremail"
          name="email"
          required
          class="form__input email-log"
        />
        <label for="password" class="form__label">Пароль:</label>
        <input
          type="password"
          v-model="state.password"
          id="password"
          name="password"
          required
          class="form__input password-log"
        />
        <the-loader v-if="authStore.loader"></the-loader>
        <error-message v-if="authStore.error">{{ authStore.error }}</error-message>
        <button v-if="!authStore.loader" type="submit" class="form__submit-button btnLogin">
          Войти
        </button>
      </form>
    </div>
  </main>

  <footer class="footer"></footer>
</template>
