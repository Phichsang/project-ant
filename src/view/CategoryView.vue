<template>
  <div>
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <!-- Main Content -->
      <div class="flex-grow-1 content p-4" ">
        
        <div class=" d-flex justify-content-between align-items-center mb-2">
        <h1>Category Page</h1>
        <button class="btn btn-primary" @click="handleShowModal()">Add Category</button>
      </div>
      <BaseTable :columns="columns" :rows="categoryStore.categories">
        <template #action="{ row }">
          <button class="btn btn-outline-info me-2"@click="openModalUpdate(row.id)" ><i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-outline-danger me-2" @click="openModalDelete(row.id)"><i class="bi bi-trash"></i></button>
        </template>
      </BaseTable>
      <BasePagination :total-page="categoryStore.pagination.totalPages"
        :current-page="categoryStore.pagination.currentPage" @update:current-page="handleNextPage"></BasePagination>
      <BaseModal :showModal="showModal" >
        <template #header>
          <div class="p-3">
            <h1 class="modal-title fs-5 mb-3">Create New categories</h1>
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="name">
            </div>
          </div>
        </template>
        <template #footer>
          <button class="btn btn-info" @click="handleCloseModal">close </button>
          <button class="btn btn-primary " @click="handleCreateCategory">Add Category </button>
        </template>
      </BaseModal>
      <BaseModal :show-modal="CheckDelete">
        <template #header>
          <div class="p-3">
            <h1 class="modal-title fs-5 mb-3 text-center">Do you want to delete this category?</h1>
          </div>
        </template>
        <template #footer>
          <button class="btn btn-info text-white" @click="handleCloseModal">NO</button>
          <button class="btn btn-danger" @click="handleDelete">Yes</button>
        </template>
      </BaseModal>
      <BaseModal :show-modal="CheckUpdate">
        <template #header>
          <div class="p-3">
            <h1 class="modal-title fs-5 mb-3">Update categories</h1>
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="name">
            </div>
          </div>
        </template>
        <template #footer>
          <button class="btn btn-info" @click="handleCloseModal">close </button>
          <button class="btn btn-primary " @click="handleUpdate">Update Category </button>
        </template>
      </BaseModal>
    </div>
  </div>

  </div>
</template>

<script setup>
import api from '@/api/http';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import { useCategoryStore } from '@/stores/category';
import { notify } from '@/utils/toast';
import { onMounted, ref } from 'vue';


let categoryStore = useCategoryStore()
let perPage = ref(10)
onMounted(async () => {
  categoryStore.fetchCategory(1, perPage.value)
})
let columns = [
  {
    label: 'Name', key: 'name'
  }
]

function handleNextPage(page) {
  categoryStore.fetchCategory(page, perPage.value)
}

let showModal = ref(false)
let CheckDelete = ref(false)
function handleShowModal() {
  showModal.value = true
}
function handleCloseModal() {
  name.value=''
  showModal.value = false
  CheckDelete.value = false
  CheckUpdate.value = false
}
let name = ref('')
async function handleCreateCategory(){
  try{
    let res = await api.post('/categories' ,{
      name : name.value
    })    
    name.value = ''
    notify.success(res.data.message)
    await categoryStore.fetchCategory(categoryStore.pagination.currentPage,perPage.value)
    handleCloseModal()
  }
  catch(err){
    notify.error(err.response.data.message)
  }
}
let CategoryID = ref(null)
function openModalDelete(id)
{
  CategoryID.value = id
  CheckDelete.value = true
}

async function handleDelete(){
  try{
    let res = await api.delete(`/categories/${CategoryID.value}`)
    notify.success(res.data.message)
    await categoryStore.fetchCategory(categoryStore.pagination.currentPage,perPage.value)
    handleCloseModal()
  }
  catch(err){
    notify.error(err.response.data.message)
  }
}

let CheckUpdate = ref(false)

function openModalUpdate(id){
  CategoryID.value = id
  const categories = categoryStore.categories.find(data => data.id === id)
  if(categories){
    name.value = categories.name
  }
  CheckUpdate.value = true
}

async function handleUpdate(){
  try{
    let  res = await api.put(`/categories/${CategoryID.value}`,{
      name : name.value
    })

    notify.success(res.data.message)
    await categoryStore.fetchCategory(categoryStore.pagination.currentPage, perPage.value)
    name.value = ''
    handleCloseModal()

  }
  catch(err){
    notify.error(err.response.data.message)
  }
}

</script>

<style lang="scss" scoped></style>