import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表板', icon: 'dashboard' }
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect:'/nodeResource',
    children: [{
      path: 'nodeResource',
      name: 'nodeResource',
      component: () => import('@/views/table_nodeRes/index'),
      meta: { title: '节点资源', icon: 'table' }
    }]
  },

  {
    path: '/table_nodeAll/:id',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'table_nodeAll',
        component: () => import('@/views/table_nodeAll/index.vue'),
        meta: { title: '节点详情', icon: 'table'}
      }
    ],
    hidden: true
  },

  /*{
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'form',
        component: () => import('@/views/form/index'),
        meta: { title: '创建任务', icon: 'form' }
      }
    ]
  },*/

  {
    path: '/table_taskSets',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'taskSets',
        component: () => import('@/views/table_taskSets/index'),
        meta: { title: '任务集合', icon: 'table' }
      }
    ]
  },
  
  {
    path: '/table_taskSet/:id',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'table_taskSet',
        component: () => import('@/views/table_taskSet/index.vue'),
        meta: { title: '集合详情', icon: 'table'}
      }
    ],
    hidden: true
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'submitTask',
        name: 'form',
        component: () => import('@/views/form/submitTask'),
        meta: { title: '创建任务', icon: 'form' }
      }
    ]
  },

  {
    path: '/result',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'result',
        component: () => import('@/views/result/index'),
        meta: { title: '结果查询', icon: 'search' }
      }
    ]
  },
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
