import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import MainLayout from "@/components/MainLayout.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "MainLayout",
        component: MainLayout,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import(/* webpackChunkName: "index" */ '../pages/Index.vue'),
            },
            {
                path: "cart",
                name: "Cart",
                component: () => import(/* webpackChunkName: "index" */ '../pages/Cart.vue'),
            },
            {
                path: "order",
                name: "Order",
                component: MainLayout,
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    linkExactActiveClass: "active-nav",
    routes: routes
});

export default router;