import Layout from '@/layout/index.vue'

const user = {
  path: '/users',
  component: Layout,
  name: 'Users',
  meta: {
    title: '用户信息',
    icon: 'user',
  },
  children: [
    // 子管理员
    {
      path: 'child-admin',
      component: () => import('@/views/index.vue'),
      name: 'ChildAdmin',
      meta: {
        title: '子管理员',
      },
      children: [
        {
          path: 'list',
          component: () => import('@/modules/aUser/views/eChildAdmin/list.vue'),
          name: 'ChildAdminList',
          meta: { title: '子管理员' },
        },
      ],
    },
  ],
}

export default user
