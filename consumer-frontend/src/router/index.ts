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
                path: "cart/checkout",
                name: "CartCheckout",
                component: () => import(/* webpackChunkName: "index" */ '../pages/Checkout.vue'),
            },
            {
                path: "payment/:id",
                name: "Payment",
                component: () => import(/* webpackChunkName: "index" */ '../pages/Payment.vue'),
            },
            {
                path: "payment/result",
                name: "PaymentResult",
                component: () => import(/* webpackChunkName: "index" */ '../pages/PaymentResult.vue'),
            },
            {
                path: "order",
                name: "Order",
                redirect: {
                    name: "OrderIdentity"
                },
                component: () => import(/* webpackChunkName: "order" */ '../pages/order/Index.vue'),
                children: [
                    {
                        path: "",
                        name: "OrderIdentity",
                        component: () => import(/* webpackChunkName: "order" */ '../pages/order/Identity.vue'),
                    },
                    {
                        path: "queryResult",
                        name: "OrderQueryResult",
                        component: () => import(/* webpackChunkName: "order" */ '../pages/order/QueryResult.vue'),
                    },
                ],
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