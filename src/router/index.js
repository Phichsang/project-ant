import { useAuthStore } from "@/stores/auth";
import ArticleView from "@/view/ArticleView.vue";
import CategoryView from "@/view/CategoryView.vue";
import CreateArticle from "@/view/CreateArticle.vue";
import DetailArticle from "@/view/DetailArticle.vue";
import EditArticle from "@/view/EditArticle.vue";
import HomeView from "@/view/HomeView.vue";
import LoginView from "@/view/LoginView.vue";
import ProfileView from "@/view/ProfileView.vue";
import RegisterView from "@/view/RegisterView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta : {require : true}
    },

    {
      path: "/login",
      name: "LoginView",
      component: LoginView,
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticleView,
      meta : {require : true}
    },
    {
      path : '/register',
      name : 'register',
      component: RegisterView ,
    },
    {
      path: '/createArticle',
      name: 'createArticle',
      component: CreateArticle,
      meta : {require : true}
    },
    {
      path : '/editArticle/:id',
      name : 'editArticle',
      component: EditArticle,
      meta : {require : true}
    },
    {
      path : '/article/:id',
      name : 'detailArticle',
      component: DetailArticle,
      meta : {require : true}
    },
    {
      path : '/category',
      name : 'category',
      component: CategoryView,
      meta : {require : true}
    },
    {
      path : '/profile',
      name : 'profile',
      component: ProfileView ,
      meta : {require : true}
    },
  ],
});

router.beforeEach((to , from) =>{
  let auth = useAuthStore()
  if(!auth.isLoggedin && to.meta.require){
    return{name : 'LoginView'}
  }
  return true;
})

export default router;
