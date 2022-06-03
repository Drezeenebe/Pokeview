import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'

const routes =[
    {
        path:'/',
        component: Home
    },
    {
        path: '/details/:id',
        component: Details
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router