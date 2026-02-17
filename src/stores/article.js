import api from "@/api/http";
import { defineStore } from "pinia";
import { reactive, ref } from "vue"


export const useArticleStore = defineStore('article', () => {
    let articles = ref([]);
    let ownArticle = ref([]);
    let pagination = reactive({
        "currentPage": 0,
        "itemPerPage": 0,
        "totalItems": 0,
        "totalPages": 0,
        "hasPreviousPage": true,
        "hasNextPage": true
    })

    async function fetchArticles({search = "", sortBy='createdAt',sortDir='desc'} = {}) {
        let res = await api.get('/articles',{
            params : {
                search,
                sortBy,
                sortDir,

            }
        })
        articles.value = res.data.data.items
    }

    async function fetchOwnArticle(page , perpage) {
        try {
            let res = await api.get(`/articles/own/?search=&_page=${page}&_per_page=${perpage}`)
            ownArticle.value = res.data.data.items
            Object.assign(pagination, res.data.data.meta)
        }
        catch (err) {
            console.log(err);
        }

    }


    return { articles, ownArticle, fetchArticles, fetchOwnArticle , pagination }

})

