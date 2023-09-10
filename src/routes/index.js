import { createRouter, createWebHistory } from "vue-router";
import MainLayout from '../layouts/MainLayout/MainLayout.vue';
import OrdersMoveLayout from '../layouts/OrdersMoveLayout/OrdersMoveLayout.vue';

import { ROUTES_NAME } from "../constants/routesName";

export const router = createRouter({
    history: createWebHistory(),
    strict: true,
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: ROUTES_NAME.MAIN,
                    component: () => import('../pages/MainPage.vue')
                },
                {
                    path: 'cities',
                    name: ROUTES_NAME.CITIES,
                    component: () => import('../pages/CitiesPage.vue')
                },
                {
                    path: 'orders-move',
                    name: 'OrdersMove',
                    component: OrdersMoveLayout,
                    children: [
                        {
                            path: 'accept',
                            name: ROUTES_NAME.ORDERS_MOVE_ACCEPT,
                            component: () => import('../pages/OrdersMove/Accept/AcceptPage.vue')
                        },
                        {
                            path: 'exstradition',
                            name: ROUTES_NAME.ORDERS_MOVE_EXTRADITION,
                            component: () => import('../pages/OrdersMove/Extradition/ExtraditionPage.vue')
                        }
                    ]
                },
                {
                    path: 'orders/:id',
                    name: ROUTES_NAME.ORDER,
                    component: () => import('../pages/OrderPage.vue')
                }
            ]
        }
    ]
})