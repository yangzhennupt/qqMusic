import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import qHeader from '../components/qHeader.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
    	path:'/detail',
    	name:'qHeader',
    	component:qHeader
    }
  ]
})
