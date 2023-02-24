import { RouteRecordRaw } from 'vue-router'
import { First } from '../components/Welcome/First'
import { Four } from '../components/Welcome/Four'
import { Second } from '../components/Welcome/Second'
import { Third } from '../components/Welcome/Third'
import { ItemList } from '../components/item/ItemList'
import { ItemCreate } from '../components/item/ItemCreate'
import { CreateTag } from '../components/tag/CreateTag'
import { EditTag } from '../components/tag/EditTag'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    beforeEnter: (to, from, next) => {
      window.localStorage.getItem('skipFeatures') === 'yes' ? next('/items') : next()
    },
    component: () => import('../views/Welcome'),
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: 'Welcome1', component: First },
      { path: '2', name: 'Welcome2', component: Second },
      { path: '3', name: 'Welcome3', component: Third },
      { path: '4', name: 'Welcome4', component: Four }
    ]
  },
  {
    path: '/items',
    component: () => import('../views/ItemPage'),
    children: [
      { path: '', component: ItemList },
      { path: 'create', component: ItemCreate }
    ]
  },
  {
    path: '/tags',
    component: () => import('../views/TagPage'),
    children: [
      { path: 'create', component: CreateTag },
      { path: ':id/edit', component: EditTag }
    ]
  },
  {
    path: '/sign_in',
    component: () => import('../views/SignInPage')
  },
  {
    path: '/statistics',
    component: () => import('../views/StatisticsPage')
  },
  {
    path: '/export',
    component: () => import('../shared/ComingSoon')
  },
  {
    path: '/notify',
    component: () => import('../shared/ComingSoon')
  }
]
