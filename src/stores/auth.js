import { ref } from 'vue'
import { defineStore } from 'pinia'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axiosApiInstance from '@/api';
import { auth } from '../main';

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;
const provider = new GoogleAuthProvider();

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    displayName: "",
    token: "",
    refreshToken: "",
  })
  const error = ref("")
  const loader = ref(false)
  const authenticate = async (payload, type) => {
    const stringUrl = type === "signup" ? "signUp" : "signInWithPassword";
    error.value = "";
    loader.value = true;
    try {
      let response = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true
      });
      userInfo.value = {
        displayName: response.data.displayName,
        token: response.data.idToken,
        refreshToken: response.data.refreshToken,
      }
      localStorage.setItem("userTokens", JSON.stringify({ userToken: userInfo.value.token, userRefreshToken: userInfo.value.refreshToken, displayName: userInfo.value.displayName }))
    } catch (err) {
      switch (err.response.data.error.message) {
        case "EMAIL_EXISTS":
          error.value = "Такой email уже зарегистрирован"
          break;
        case "OPERATION_NOT_ALLOWED":
          error.value = "Операция не разрешена"
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          error.value = "Слишком много попыток, попробуйте позже"
          break;
        case "INVALID_EMAIL":
          error.value = "Некорректный email"
          break;
        case "EMAIL_NOT_FOUND":
          error.value = "Такая почта не зарегистрирована"
          break;
        case "INVALID_PASSWORD":
          error.value = "Неверный пароль"
          break;
        case "USER_DISABLED":
          error.value = "Вы заблокированы"
          break;
        case "INVALID_LOGIN_CREDENTIALS":
          error.value = "Неверный логин или пароль"
          break;
        default:
          error.value = "Ошибка"
          break;
      }
      throw error.value;
    } finally {
      loader.value = false;
    }
  }
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      userInfo.value = {
        displayName: user.displayName,
        token: user.accessToken,
        refreshToken: user.refreshToken,
      }
      localStorage.setItem("userTokens", JSON.stringify({ userToken: userInfo.value.token, userRefreshToken: userInfo.value.refreshToken, displayName: userInfo.value.displayName }))
    } catch (error) {
      console.error(error);
    }
  }
  const logout = () => {
    userInfo.value = {
      displayName: "",
      token: "",
      refreshToken: "",
    }
  }
  return { authenticate, userInfo, error, loader, logout, googleSignIn }
})
