<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()

const displayName = ref('')

onMounted(() => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'))
  if (userTokens && userTokens.displayName) {
    displayName.value = userTokens.displayName
  }
})

const logout = () => {
  authStore.logout()
  localStorage.removeItem('userTokens')
  router.push('/sign-in')
}
</script>

<template>
  <header class="header">
    <h1>Добро пожаловать, {{ displayName }}</h1>
    <button @click="logout" class="form__submit-button sing-up">Выйти</button>
  </header>
  <main class="main">
    <div class="container welcome-container">
      <h1 class="welcome-title">Вы успешно вошли!</h1>
      <div class="content-left">
        <p>
          Добро пожаловать в наш уютный уголок, посвященный миру котиков! Здесь вы найдете множество
          интересных фактов и историй о наших пушистых друзьях.
        </p>
        <hr />
        <p>
          Мы рады поделиться с вами самой актуальной информацией о котиках. Надеемся, она принесет
          вам радость и улучшит ваш день!
        </p>
      </div>
      <div class="content-right">
        <p>
          В этом разделе мы собрали для вас разнообразные материалы: от забавных фотографий и видео
          до полезных статей о заботе о котиках.
        </p>
        <hr />
        <p>
          Если у вас есть любимые истории или фотографии своих котиков, которыми вы хотели бы
          поделиться, мы будем рады их увидеть!
        </p>
      </div>
    </div>
  </main>
  <footer class="footer"></footer>
</template>

<style scoped>
.welcome-title {
  color: var(--header-bg-color);
  animation: scaleIn 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  opacity: 0;
  transform: scale(0.5);
}
.content-right {
  width: 80%;
  margin: auto;
  text-align: justify;
  animation: slideInFromRight 2s ease-in-out;
}
.content-left {
  width: 80%;
  margin: auto;
  text-align: justify;
  animation: slideInFromLeft 2s ease-in-out;
}
hr {
  border: none;
  border-top: 3px solid #8c8c8c;
  margin: 20px 0;
}
p {
  color: rgb(79 79 79);
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
}
@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
