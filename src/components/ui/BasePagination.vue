<template>
  <nav aria-label="Page navigation example" v-if="totalPage > 1">
    <ul class="pagination">
      <li class="page-item" @click="prevPage"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item " :class="{active : currentPage === items}" v-for="items  in totalPage"@click="pageNumber(items)" >
        <a class="page-link" href="#">{{ items }}</a>
      </li>
      <li class="page-item" @click="nextPage"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue';


  let prop = defineProps({
    totalPage : {type : Number , default: 0},
    currentPage : {type : Number , default: 0},
  })

  let emit = defineEmits(['update:currentPage'])
  let currentpage = ref(prop.currentPage)

  function nextPage() {
    if(currentpage.value < prop.totalPage){
      let nextPage = currentpage.value + 1;
      emit('update:currentPage',nextPage)
    }

  }
  function prevPage() {
    if(currentpage.value > 1){
      let prevPage = currentpage.value - 1;
      emit('update:currentPage',prevPage)
    }
  }

  function pageNumber(page){
    emit('update:currentPage',page)
  }
  watch(()=> prop.currentPage , (newVal) => {
    currentpage.value = newVal
  })

  
  
</script>

<style lang="scss" scoped></style>