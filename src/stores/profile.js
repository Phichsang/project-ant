import { defineStore } from "pinia"
import { ref } from "vue"
import api from '@/api/http'

export const userProfileStore = defineStore('profile', () => {

  const profile = ref(null)
  const loading = ref(false)

 
  const fetchProfile = async () => {
    loading.value = true
    try {
      const res = await api.get('/auth/profile')
      profile.value = res.data.data
    } catch (error) {
      console.error('Failed to fetch profile', error)
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (formData) => {
    loading.value = true
    try {
      await api.post('/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.error('Failed to update profile', error)
    } finally {
      loading.value = false
    }
  }

 const updateName = async (firstName, lastName) => {
  loading.value = true
  try {
    const res = await api.put('/profile', 
      {
        firstName,
        lastName
      }
    )

    profile.value = res.data.data

  } catch (error) {
    console.error('Failed to update name', error.response?.data)
  } finally {
    loading.value = false
  }
}


  return {
    profile,
    loading,
    fetchProfile,
    updateProfile,
    updateName
  }
})
