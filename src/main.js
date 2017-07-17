// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios';
// import VueAxios from 'vue-axios';
import 'normalize.css';
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
        activeIndex: 0,
        songData: null,
        isShowminiPlay: true,
        topId: 0,
        audio: {
            src: "",
            imgurl: "",
            time: "",
            name: "",
            index: -1
        },
        musicList: [],
        isPlay: false,
        dom: {},
        topList: [],
        color: null

    },
    mutations: {
        getAll(state, obj) {
            state.sliderList = obj.data.data.slider;
            state.radioList = obj.data.data.radioList;
        },
        changeActiveIndex(state, index) {
            state.activeIndex = index;
        },
        changShowminiPlay(state, flag) {
            state.isShowminiPlay = flag;
        },
        changAudio(state, obj) {
            state.audio.src = "http://ws.stream.qqmusic.qq.com/" + obj.songid + ".m4a?fromtag=46";
            state.audio.imgurl = "https://y.gtimg.cn/music/photo_new/T002R500x500M000" + obj.albummid + ".jpg"
        },
        play(state, flag) {
            state.isPlay = flag;
            console.log(state.musicList);

        },
        getDom(state, dom) {
            state.dom = dom;
        },
        changeMusic(state, index) {
            if (state.musicList[index].data) {
                state.audio.src = "http://ws.stream.qqmusic.qq.com/" + state.musicList[index].data.songid + ".m4a?fromtag=46";
                state.audio.imgurl = "https://y.gtimg.cn/music/photo_new/T002R500x500M000" + state.musicList[index].data.albummid + ".jpg";
            } else {
                state.audio.src = "http://ws.stream.qqmusic.qq.com/" + state.musicList[index].id + ".m4a?fromtag=46";
                state.audio.imgurl = "https://y.gtimg.cn/music/photo_new/T002R500x500M000" + ".jpg";
            }
            state.audio.index = index;
        }
    },
    actions: {
        getData({}) {
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
        getTopList() {
            return new Promise((resolve, reject) => {
                Vue.http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
                    params: {
                        format: 'jsonp',
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
                }).then(res => {
                    resolve(res);
                })
            })
        },
        getListDetail(state, { id }) {
            return new Promise((resolve, reject) => {
                Vue.http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
                    params: {
                        g_tk: 5381,
                        uin: 0,
                        format: 'json',
                        inCharset: 'utf-8',
                        outCharset: 'utf-8',
                        notice: 0,
                        platform: 'h5',
                        needNewCode: 1,
                        tpl: 3,
                        page: 'detail',
                        type: 'top',
                        topid: id,
                        _: new Date().getTime()
                    },
                    jsonp: 'jsonpCallback'
                }).then(res => {
                    resolve(res);
                });
            })
        },
        getHotList() {
            return new Promise((resolve, reject) => {
                Vue.http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg', {
                    params: {
                        format: 'jsonp',
                        tpl: 'v12',
                        page: 'other',
                        rnd: 0,
                        g_tk: new Date().getTime(),
                        loginUin: 0,
                        hostUin: 0,
                        inCharset: 'utf8',
                        outCharset: 'GB2312',
                        notice: 0,
                        platform: 'yqq',
                        needNewCode: 0
                    },
                    jsonp: 'jsonpCallback'
                }).then(res => {
                    resolve(res);
                })
            })
        },
        getHotWord() {
            return new Promise((resolve, reject) => {
                Vue.http.jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', {
                    params: {

                        g_tk: 911075056,
                        uin: 550994952,
                        format: 'jsonp',
                        inCharset: 'utf-8',
                        outCharset: 'utf-8',
                        notice: 0,
                        platform: 'h5',
                        needNewCode: 1,
                        _: new Date().getTime()
                    },
                    jsonp: 'jsonpCallback'
                }).then(res => {
                    resolve(res);
                })
            })
        },
        getSearchResult(state, { keys }) {
            return new Promise((resolve, reject) => {
                Vue.http.jsonp('https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', {
                    params: {
                        is_xml: 0,
                        format: 'jsonp',
                        key: keys,
                        g_tk: 5381,
                        loginUin: 0,
                        hostUin: 0,
                        inCharset: 'utf8',
                        outCharset: 'utf-8',
                        notice: 0,
                        platform: 'yqq',
                        needNewCode: 0
                    },
                    jsonp: 'jsonpCallback'
                }).then(res => {
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
