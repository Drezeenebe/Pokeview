import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'

const routes = [
    {
        //Ruta principal
        path: '/',
        component: Home,
        //Componente hijo para la vista, necesario para el router-view
        children: [
            {
                path: '/details/:id',
                component: Details
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router