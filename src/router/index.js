import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components'
import login from '@/components/login'
import help from '@/components/help'
import tujian from '@/components/tujian'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/tujian',
      name: 'tujian',
      component: tujian
    }
  ]
})
