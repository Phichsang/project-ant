<template>
  <Navbar />

  <div class="d-flex">
    <Sidebar />

    <div class="flex-grow-1 d-flex justify-content-center align-items-center bg-light" style="min-height:100vh;">
      
      <div class="card shadow-lg border-0 p-4 text-center" style="width:400px; border-radius:20px;">

        <!-- VIEW MODE -->
        <div v-if="!isEditing">

          <img 
            :src="ProfileStore.profile?.avatar" 
            class="rounded-circle shadow mb-3"
            style="width:120px;height:120px;object-fit:cover;"
          />

          <h4 class="fw-bold">
            {{ ProfileStore.profile?.firstName }} {{ ProfileStore.profile?.lastName }}
          </h4>

          <p class="text-muted">{{ ProfileStore.profile?.email }}</p>

          <button class="btn btn-primary rounded-pill px-4"
            @click="startEdit">
            Edit Profile
          </button>
        </div>

        <!-- EDIT MODE -->
        <div v-else>

          <img 
            :src="previewImage || ProfileStore.profile?.avatar" 
            class="rounded-circle shadow mb-3"
            style="width:120px;height:120px;object-fit:cover;"
          />

          <input type="file" class="form-control mb-3" @change="handleImageChange" accept="image/*" />
          <input v-model="form.firstName" class="form-control mb-2" placeholder="First Name" />
          <input v-model="form.lastName" class="form-control mb-2" placeholder="Last Name" />
          <input v-model="form.email" class="form-control mb-3" placeholder="Email" />

          <button class="btn btn-success me-2" @click="saveProfile"> Save </button>
          <button class="btn btn-secondary" @click="cancelEdit"> Cancel </button>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { userProfileStore } from '@/stores/profile'
import { ref, reactive, onMounted } from 'vue'

const ProfileStore = userProfileStore()

const isEditing = ref(false)
const previewImage = ref(null)
const selectedFile = ref(null)

const form = reactive({
  firstName: '',
  lastName: '',
  email: ''
})

onMounted(async () => {
  await ProfileStore.fetchProfile()
})

const startEdit = () => {
  form.firstName = ProfileStore.profile?.firstName
  form.lastName = ProfileStore.profile?.lastName
  form.email = ProfileStore.profile?.email
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  previewImage.value = null
  selectedFile.value = null
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    previewImage.value = URL.createObjectURL(file)
  }
}

const saveProfile = async () => {

  await ProfileStore.updateName(
    form.firstName,
    form.lastName
  )
  if (selectedFile.value) {
    const formData = new FormData()
    formData.append('avatar', selectedFile.value)

    await ProfileStore.updateProfile(formData)
  }
  await ProfileStore.fetchProfile()

  cancelEdit()
}


</script>
