import { RouteRecordRaw } from "vue-router";
import { Welcome } from "../views/Welcome";
import { First } from "../components/Welcome/First";
import { Four } from "../components/Welcome/Four";
import { Second } from "../components/Welcome/Second";
import { Third } from "../components/Welcome/Third";
import { StartPage } from "../views/StartPage";
import { ItemPage } from "../views/ItemPage";
import { ItemList } from "../components/item/ItemList";
import { ItemCreate } from "../components/item/ItemCreate";
import { TagPage } from "../views/TagPage";
import { CreateTag } from "../components/tag/CreateTag";
import { EditTag } from "../components/tag/EditTag";
import { SignInPage } from "../views/SignInPage";
import { StatisticsPage } from "../views/StatisticsPage";
import { http } from "../shared/Http";

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    beforeEnter: (to, from, next) => {
      window.localStorage.getItem('skipFeatures') === 'yes' ? next('/start') : next()
    },
    component: Welcome,
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: 'Welcome1', component: First },
      { path: '2', name: 'Welcome2', component: Second },
      { path: '3', name: 'Welcome3', component: Third },
      { path: '4', name: 'Welcome4', component: Four },
    ]
  },
  { path: '/start', component: StartPage },
  {
    path: '/items', component: ItemPage,
    beforeEnter: async (to, from, next) => {
      await http.get('/me').catch(() => {
        console.log('未登录')
        next('/sign_in?return_to=' + encodeURIComponent(to.fullPath))
      })
      next()
    },
    children: [
      { path: '', component: ItemList },
      { path: 'create', component: ItemCreate },
    ]
  },
  {
    path: '/tags', component: TagPage,
    children: [
      { path: 'create', component: CreateTag },
      { path: ':id/edit', component: EditTag },
    ]
  },
  {
    path: '/sign_in', component: SignInPage
  },
  {
    path: '/statistics', component: StatisticsPage
  }
]