import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: "AIzaSyBBSjRPo5q0tagEfg9626JGAOs-9zCDZYE",
  authDomain: "authentication-7da09.firebaseapp.com",
  projectId: "authentication-7da09",
  storageBucket: "authentication-7da09.appspot.com",
  messagingSenderId: "239515893499",
  appId: "1:239515893499:web:984982223508fab0b07a5e"
}

initializeApp(firebaseConfig)
export const auth = getAuth();
export const db = getFirestore()


const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')


