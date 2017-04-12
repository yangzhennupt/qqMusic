import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import topList from '../components/topList.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
    	path:'/topList',
    	name:'topList',
    	component:topList
    }
  ]
})
