// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios';
// import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import vueResource from 'vue-resource';
//import VueAwesomeSwiper from 'vue-awesome-swiper';

Vue.config.productionTip = false

//Vue.use(VueAxios,axios);
/* eslint-disable no-new */
Vue.use(Vuex);
//Vue.use(VueAwesomeSwiper);
Vue.use(vueResource);

const store = new Vuex.Store({
    state: {
        sliderList: [],
        radioList: [],
        activeIndex:0,
        songData:null,
        isShowminiPlay:true
    },
    mutations: {
        getAll(state, obj) {
            state.sliderList = obj.data.data.slider;
            state.radioList = obj.data.data.radioList;
        },
        changeActiveIndex(state,index){
            state.activeIndex=index;
        },
        changShowminiPlay(state,flag){
           state.isShowminiPlay=flag;
        }
    },
    actions: {
        getData({ commit }) {
            return new Promise((resolve, reject) => {
                Vue.http.jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
                    params: {
                        g_tk: 5381,
                        uin: 0,
                        format: 'jsonp',
                        inCharset: 'utf-8',
                        outCharset: 'utf-8',
                        notice: 0,
                        platform: 'h5',
                        needNewCode: 1,
                        _: new Date().getTime()
                    },
                    jsonp: 'jsonpCallback'
                }).then((res) => {
                    resolve(res);
                })

            })
        },
        getTopList(){
            return new Promise((resolve,reject)=>{
                 Vue.http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',{
                   params:{
                        format:'jsonp',
                        g_tk:5381,
                        uin:0,
                        format:'jsonp',
                        inCharset:'utf-8',
                        outCharset:'utf-8',
                        notice:0,
                        platform:'h5',
                        needNewCode:1,
                        _: new Date().getTime()
                   },
                   jsonp:'jsonpCallback' 
                 }).then(res=>{
                    resolve(res);
                 })
            })
        }
    }
});
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
