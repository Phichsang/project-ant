<template>
    <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
        <!-- Toast Notification -->
        <div v-if="showToast" class="toast-container">
            <div class="toast-custom toast-success">
                <div class="d-flex align-items-center">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    <span>{{ toastMessage }}</span>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-5">
                    <div class="card shadow-sm border-0">
                        <div class="card-body p-5">
                            <h2 class="fw-bold mb-4 text-center">Create Account</h2>
                            <form @submit.prevent="handleRegister">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">First Name</label>
                                        <input v-model="form.firstName" type="text" class="form-control" required />
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Last Name</label>
                                        <input v-model="form.lastName" type="text" class="form-control" required />
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input v-model="form.email" type="email" class="form-control" required />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <input v-model="form.password" type="text" class="form-control" required />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Confirm Password</label>
                                    <input v-model="form.confirmPassword" type="text" class="form-control" required />
                                </div>

                                <div v-if="error" class="alert alert-danger">
                                    {{ error }}
                                </div>

                                <div class="d-grid">
                                    <button class="btn btn-primary btn-lg" type="submit">
                                        Sign Up
                                    </button>
                                </div>

                                <p class="text-center mt-4 mb-0">
                                    Already have an account?
                                    <router-link to="/login">Sign In</router-link>
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
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const auth = useAuthStore();

const error = ref("");
const showToast = ref(false);
const toastMessage = ref("");

const form = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
});

function showSuccessToast(message) {
    toastMessage.value = message;
    showToast.value = true;
}

async function handleRegister() {
    error.value = "";

    if (form.password !== form.confirmPassword) {
        error.value = "Passwords do not match!";
        return;
    }

    const res = await auth.register(
        form.firstName,
        form.lastName,
        form.email,
        form.password,
        form.confirmPassword,
    );

    if (res && res.result === true) {
        showSuccessToast("Register Successfully");
        router.push("/login");
    } else {
        error.value = res.message || "Register failed!";
    }
}
</script>

<style scoped>
.card {
    border-radius: 12px;
}

.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
}

.toast-custom {
    background-color: #28a745;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
    animation: slideIn 0.3s ease-out;
    font-weight: 500;
}

.toast-custom i {
    font-size: 1.25rem;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
