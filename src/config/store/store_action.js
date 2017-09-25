import Vue from 'vue';
export  const ACTION = {

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
        },
        getAlbumInfo(state,{id}){
            return new Promise((resolve,reject)=>{
                Vue.http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',{
                    params:{
                        albummid:id,
                        g_tk:5381,
                        loginUin:0,
                        hostUin:0,
                        format:'jsonp',
                        inCharset:'utf8',
                        outCharset:'utf-8',
                        notice:0,
                        platform:'yqq',
                        needNewCode:0,
                        _: new Date().getTime()
                    },
                        jsonpCallback:'jsonpCallback'
                }).then(res=>{
                    resolve(res);
                })
            })
        },
        getHotDetail(state,{id}){
            return new Promise((resolve,reject)=>{
                Vue.http.jsonp('https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',{
                    params:{
                        g_tk:5381,
                        uin:0,
                        format:'jsonp',
                        inCharset:'utf-8',
                        outCharset:'utf-8',
                        notice:0,
                        platform:'h5',
                        needNewCode:1,
                        new_format:1,
                        pic:500,
                        disstid:id,
                        type:1,
                        json:1,
                        utf8:1,
                        onlysong:0,
                        nosign:1,
                        _: new Date().getTime()
                       
                    },
                    jsonpCallback:'jsonpCallback'
                }).then(res=>{
                    resolve(res);
                })
            })
        }
    
}