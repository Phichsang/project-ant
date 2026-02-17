import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import api from '@/api/http';

export const useAuthStore = defineStore('auth', () => {
  let user = ref(null);
  let token = ref(localStorage.getItem('token'));
  const isLoggedin = computed(() => !!token.value);

  async function register(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  ) {
    const res = await api.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    return res.data;
  }

  async function login(email, password) {
    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });
      console.log(res);
      user.value = res.data.data.user;
      token.value = res.data.data.token;
      localStorage.setItem('token', token.value);
    } catch (error) {
      throw error.response
    }
  }

  async function logout() {
    const res = await api.delete('/auth/logout');
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    console.log(res);
  }

  return { user, token, isLoggedin, login, logout, register };
});
