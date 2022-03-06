import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import HelloWorld from "@/components/HelloWorld.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Index",
        component: HelloWorld,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    linkExactActiveClass: "active",
    routes: routes
});

export default router;