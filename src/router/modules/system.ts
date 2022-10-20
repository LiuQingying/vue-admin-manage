/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const systemRouter = [{
    path: '/system',
    component: Layout,
    redirect: '/system/page',
    name: 'system',
    meta: {
        title: '系统管理',
        icon: 'ElementPlus'
    },
    children: [
        {
            path: 'page',
            component: () => import('@/views/system/page.vue'),
            name: 'page',
            meta: { title: '页面权限', icon: 'trend-charts',  roles:['other']  }
        },
        {
            path: 'user',
            component: () => import('@/views/system/user.vue'),
            name: 'user',
            meta: { title: '用户管理', roles: ['other'] , icon: 'MenuIcon'}
        },
        {
            path: 'role',
            component: () => import('@/views/system/role.vue'),
            name: 'role',
            meta: { title: '角色管理', roles: ['other'], icon: 'MenuIcon' }
        },
        {
            path: 'menu',
            component: () => import('@/views/system/menu.vue'),
            name: 'menu',
            meta: { title: '菜单管理', roles: ['other'] , icon: 'MenuIcon'}
        },
    ]
}]

export default systemRouter
