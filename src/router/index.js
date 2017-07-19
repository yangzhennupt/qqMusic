import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../components/Hello.vue';
import topList from '../components/topList.vue';
import topDetail from '../components/topDetail.vue';
import search from '../components/search.vue';
import hotList from '../components/hotList.vue';

Vue.use(Router);

export default new Router({
   
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
    },
      {
      path:'/topDetail/:id',
      name:'topDetail',
      component:topDetail
    },
    {
      path:'/search',
      name:'search',
      component:search
    },
    {
      path:'/hotList/:id',
      name:'hotList',
      component:hotList
    }
  ]
})
