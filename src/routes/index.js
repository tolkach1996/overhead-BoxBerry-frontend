import { createRouter, createWebHistory } from "vue-router";
import MainLayout from '../layouts/MainLayout.vue';

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
                    name: 'Main',
                    component: () => import('../pages/MainPage.vue')
                },
                {
                    path: 'cities',
                    name: 'Cities',
                    component: () => import('../pages/CitiesPage.vue')
                },
                {
                    path: 'issue-orders',
                    name: 'IssueOrders',
                    component: () => import('../pages/IssueOrders/IssueOrdersPage.vue')
                }
            ]
        }
    ]
})