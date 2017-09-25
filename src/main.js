// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import vueResource from 'vue-resource';
import {STATE,MUTATIONS,ACTION} from './config/store/store_index';
require('swiper/dist/css/swiper.css');
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(vueResource);
const store = new Vuex.Store({
    state:STATE,
    mutations:MUTATIONS,
    actions: ACTION
});
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
