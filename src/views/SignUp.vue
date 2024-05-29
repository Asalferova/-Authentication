<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { required, minLength, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import TheLoader from '../components/TheLoader.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const authStore = useAuthStore()
const router = useRouter()
const state = reactive({
  name: '',
  email: '',
  password: ''
})

const rules = {
  name: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) }
}

const v$ = useVuelidate(rules, state)

const signup = async () => {
  if (v$.value.$invalid) {
    v$.value.$touch()
    return
  }
  await authStore.authenticate(
    { email: state.email, password: state.password, displayName: state.name },
    'signup'
  )
  router.push('/')
}
const signInWithGoogle = async () => {
  await authStore.googleSignIn()
  router.push('/')
}
</script>
<template>
  <header class="header">
    <h1 class="header__title">Форма регистрации</h1>
    <button @click="router.push('/sign-in')" class="sing-up form__submit-button">Вход</button>
  </header>
  <main class="main">
    <div class="google-reg form">
      <p class="form_title">Регистрация с помощью Google</p>
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
    <form class="form" id="my-form" name="myForm" @submit.prevent="signup">
      <p class="form_title">Регистрация через email</p>
      <label class="form__label" for="name">
        Ваше имя*:
        <input
          type="text"
          v-model.trim="state.name"
          name="name"
          class="form__input form__input_type_username"
          id="name"
          placeholder="Илон Маск"
          autofocus
        />
        <error-message v-if="v$.name.$dirty && v$.name.$invalid">Имя обязательно</error-message>
      </label>

      <label class="form__label" for="pass">
        Пароль*:
        <input
          type="password"
          v-model.trim="state.password"
          name="pass"
          id="pass"
          class="form__input form__input_type_password"
          placeholder="123456"
        />
        <error-message v-if="v$.password.$dirty && v$.password.$invalid"
          >Пароль должен быть не менее 6 символов</error-message
        >
      </label>

      <label class="form__label" for="email">
        Почта*:
        <input
          type="email"
          v-model.trim="state.email"
          name="email"
          id="email"
          class="form__input form__input_type_email"
          placeholder="elon@musk.com"
        />
        <error-message v-if="v$.email.$dirty && v$.email.$invalid"
          >Некорректный адрес почты</error-message
        >
      </label>

      <label class="form__label" for="do">
        Чем любите заниматься?
        <select name="do" id="do" class="form__select">
          <option value="">Выберите</option>
          <option value="movie">Смотреть фильмы</option>
          <option value="read">Читать</option>
          <option value="sport">Заниматься спортом</option>
          <option value="other">Ничего из этого</option>
        </select>
      </label>

      <label class="form__label" for="loveCats">
        Я люблю котиков
        <input type="checkbox" name="loveCats" id="loveCats" class="form__checkbox" value="1" />
      </label>

      <label class="form__label" for="photo">
        Фото:
        <input
          type="file"
          accept="image/jpeg"
          name="photo"
          id="photo"
          class="form__input_type_file"
        />
      </label>
      <the-loader v-if="authStore.loader"></the-loader>
      <error-message v-if="authStore.error">{{
        authStore.error
      }}</error-message>
      <button v-if="!authStore.loader" type="submit" class="form__submit-button">
        Зарегистрироваться
      </button>
    </form>
  </main>
  <footer class="footer"></footer>
</template>
