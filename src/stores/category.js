import api from "@/api/http";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
export const useCategoryStore = defineStore('category' , () =>{
    //state management
    let categories = ref([]);
    let pagination = reactive({
            "currentPage": 0,
            "itemPerPage": 0,
            "totalItems": 0,
            "totalPages": 0,
            "hasPreviousPage": true,
            "hasNextPage": true
        })
    //action
    async function fetchCategory(page =1, perpage=100){
        let res = await api.get(`/categories?_page=${page}&_per_page=${perpage}&sortBy=createdAt`)
        categories.value = res.data.data.items;
        Object.assign(pagination , res.data.data.meta)
    }
    
    //return
    return {categories , fetchCategory , pagination}
})