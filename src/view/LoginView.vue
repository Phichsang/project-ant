<template>
  <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card shadow-sm border-0">
            <div class="card-body p-5">
              <h2 class="fw-bold mb-4 text-center">Login</h2>

              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="emailInput" class="form-label">Email address</label>
                  <input v-model="email" type="text" class="form-control" id="emailInput"
                    placeholder="name@example.com">
                  <p v-if="error.email" class="text-danger small mt-1">{{ error.email }}</p>
                </div>

                <div class="mb-3">
                  <label for="passwordInput" class="form-label">Password</label>
                  <input v-model="password" type="text" class="form-control" id="passwordInput"
                    placeholder="Enter your password">
                  <p v-if="error.password" class="text-danger small mt-1">{{ error.password }}</p>
                </div>

                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="rememberMe">
                    <label class="form-check-label" for="rememberMe">Remember me</label>
                  </div>
                  <a href="#" class="text-decoration-none small">Forgot password?</a>
                </div>

                <div class="d-grid">
                  <button type="submit" :disabled="isLoading" class="btn btn-primary btn-lg">
                    <div v-if="isLoading " class="spinner-border text-info" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <div v-else>
                      Sign In
                    </div>
                  </button>
                </div>

                <p class="text-center mt-4 mb-0">Don't have an account?
                  <router-link to="/register" class="text-decoration-none">Sign Up</router-link>
                </p>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { notify } from "@/utils/toast";
import { isEmail, required, validation } from "@/utils/validation";
import { reactive, ref } from "vue";
import { toast } from "vue3-toastify";
let email = ref("");
let password = ref("");
let auth = useAuthStore();

let error = reactive({
  email: "",
  password: ""
})
let isLoading = ref(false)
function validate() {
  error.email = validation(email.value, [
    (v) => required(v, 'This field is required'),
    (v) => isEmail(v, 'Email is wrong format')
  ])
  error.password = required(password.value, "Password is required");
  return !error.email && !error.password;
}


async function handleLogin() {
  if (!validate()) return
  isLoading.value = true
  try {
    await auth.login(email.value, password.value);
    notify.sucess("login successfull!! " , '/')
  }
  catch (err) {
    notify.error(err.data.message)
    isLoading.value = false
  }
  
}
</script>

<style scoped></style>
