import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes : [
    {path: '/',component: login},
    {path: '/index',component: () => import('../views/index.vue'),
      children : [
        {path: '/index/admin_home',component: () => import('../views/admin_home.vue')},
        {path: '/index/admin_order-management',component: () => import('../views/admin_order-management.vue'),meta:['订单管理']},
        {path: '/index/admin_product-list',component: () => import('../views/admin_product-list.vue'),meta:['商品管理','商品列表']},
        {path: '/index/admin_add-product',component: () => import('../views/admin_add-product.vue'),meta:['商品管理','添加商品']},
        {path: '/index/admin_alter-product/:id',component: () => import('../views/admin_alter-product.vue'),meta:['修改商品']},
        {path: '/index/admin_store',component: () => import('../views/admin_store.vue'),meta:['店铺管理']},
        {path: '/index/admin_Account-list',component: () => import('../views/admin_Account-list.vue'),meta:['账号管理','账号列表']},
        {path: '/index/admin_add-user',component: () => import('../views/admin_add-user.vue'),meta:['账号管理','添加账号']},
        {path: '/index/admin_alter-user/:id',component: () => import('../views/admin_alter-user.vue'),meta:['修改账号']},
        {path: '/index/admin_change-pwd',component: () => import('../views/admin_change-pwd.vue'),meta:['账号管理','修改密码']},
        {path: '/index/admin_product-statistics',component: () => import('../views/admin_product-statistics.vue'),meta:['销售统计','商品统计']},
        {path: '/index/admin_orders-statistics',component: () => import('../views/admin_orders-statistics.vue'),meta:['销售统计','订单统计']},
        {path: '/index/user_info',component: () => import('../views/user_info.vue'),meta:['管理员信息']},
      ]
    },
  ]
})