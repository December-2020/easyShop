import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import store from '@/store/index'


Vue.use(VueRouter)

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import( '@/views/Category.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import( '@/views/Search.vue')
  },
  {
    path:'/details/:id',
    name:'Details',
    props:true,
    meta:{
      hideNav:true,
    },
    component:() => import('@/views/Details'),
  },
  {
    path:'/shop/:id',
    name:'Shop',
    props:true,
    component:() => import('@/views/Shop'),
  },
  {
    path:'/my',
    name:'My',
    meta:{
      login:true,
    },
    component:() => import('@/views/My'),
  },
  {
    path:'/cart',
    name:'Cart',
    meta:{
      login:true,
    },
    component:() => import('@/views/Cart'),
  },
  {
    path:'/login',
    name:"Login",
    meta:{
      hideNav:true,
    },
    component:()=>import('@/views/Login'),
  },
]

const router = new VueRouter({
  routes
});
router.beforeEach((to,from,next)=>{
  if(to.meta.login && !store.getters.tokens){
    next('/login');
  }
  // 继续放行
  next();
})

export default router
