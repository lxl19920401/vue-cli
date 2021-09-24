import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home'
import about from '@/views/about'
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:home
        },
        {
            path:'/about',
            component:about
        }
    ]
})
export default router
