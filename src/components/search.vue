<template>
    <div class="search">
        <div class="loading" v-show="loading">
            <img src="../assets/loading/ball-triangle.svg" alt="">
        </div>
        <div class="search-input">
            <input v-model="searchKey" type="text" placeholder="搜索歌曲、歌单、专辑" @focus="changStatus" @blur="changStatus" @keyup.enter="doSearch(searchKey)">
            <i></i>
            <span class="cancel" v-show="isFocus&&!isSearch"></span>
        </div>
        <div class="search-history" v-show="isFocus&&!isSearch">
            <h6>搜索历史</h6>
            <ul>
                <li v-for="item in historyList"><i class="historyIcon"></i> {{item}}</li>
            </ul>
        </div>
        <div class="hot-word" v-show="!isFocus&&!isSearch">
            <div class="word-warp">
                <h6 v-show="!loading">热门搜索</h6>
                <div class="label-content">
                    <span class="special">{{hotWord.special_key}}</span>
                    <span v-for="item in hotkey">{{item.k}}</span>
                </div>
            </div>
        </div>
        <div class="search-list" v-show="isSearch">
            <div class="noResut" v-show="!searchResult.song">
                抱歉，没有结果...
            </div>
            <div class="hasResult">
                 <div class="result-list" v-if="searchResult.song">
                     <h3>单曲</h3>
                     <ul>
                         <li v-for="item in searchResult.song.itemlist" >
                             <p>{{item.name}}  {{item.singer}}</p>
                         </li>
                     </ul>          
                 </div>
                 <div class="result-list" v-if="searchResult.album">
                     <h3>专辑</h3>
                     <ul>
                         <li v-for="album in searchResult.album.itemlist" >
                             <div class="ambum-wrap">
                                 <div class="img-container">
                                     <img  :src="album.pic">
                                 </div>
                                 <div class="info-container">
                                     <p class="album-name">{{album.name}}</p>
                                     <p class="album-songer">{{album.singer}}</p>
                                 </div>
                             </div>
                         </li>
                     </ul>          
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {

                loading: true,
                //热词对象：标红
                hotWord: {},
                //搜索框
                isFocus: false,
                hotkey: [],
                searchKey: '',
                searchResult: {},
                isSearch: false,
                historyList: []
            }
        },
        computed: {

        },
        created() {
            this.$store.commit('changeActiveIndex', 3);
            this.$store.dispatch('getHotWord').then(res => {
                this.hotWord = res.data.data;
                //只取前10条热词
                this.hotkey = res.data.data.hotkey.slice(0, 10);
                this.loading = false;
            });
            //如果从没有搜过，则在该设备初始化localStorage
            if (localStorage.history === undefined) {
                localStorage.setItem('history', '[]');
            }
            this.historyList = JSON.parse(localStorage.history);
        },
        // watch: {
        //     historyList: {
        //         handler(val, oldVal) {
        //           localStorage.history=JSON.stringify(val);
        //         },
        //         deep: true
        //     }
        // },
        computed: {

        },
        methods: {
            changStatus() {
                this.isFocus = !this.isFocus;
            },
            doSearch(searchKey) {
                if (searchKey.trim() != "") {
                    this.$store.dispatch('getSearchResult', {
                        keys: searchKey
                    }).then(res => {
                        this.searchResult = res.data.data;
                        console.log(this.searchResult);
                        this.isSearch = true;


                    });


                    let temArr = JSON.parse(localStorage.getItem('history'));
                    //长度为0直接push，否则进行遍历判断是否存在这个搜索词，如果存在，不Push 仅调整位置
                    let hasThisKey = false,
                        index = null;
                    if (temArr.length == 0) {
                        temArr.push(searchKey);
                    } else {
                        for (let i = temArr.length - 1; i >= 0; i--) {
                            if (temArr[i] == searchKey) {
                                hasThisKey = true;
                                index = i;
                                return;
                            }
                        }
                    }
                    //已经存在该搜索词，前置
                    if (hasThisKey == true) {
                        temArr = temArr.splice(index, 1);
                        temArr.unshift(searchKey);
                    } else {
                        temArr.unshift(searchKey);
                    }
                    //重新写入localStorage
                    localStorage.setItem('history', JSON.stringify(temArr));
                }

            }
        }
}
</script>
<style scoped lang="scss">
.search {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    .search-input {
        display: flex;
        background: #f4f4f4;
        padding: 20px;
        position: relative;
        input {
            height: 25px;
            line-height: 25px;
            flex: 1;
            color: rgba(0, 0, 0, .3);
            border: none;
            padding-left: 40px;
            font-size: 14px;
            &:focus {
                outline: none;
            }
        }
        i {
            height: 20px;
            width: 20px;
            background: url(../assets/search.svg) no-repeat;
            position: absolute;
            left: 30px;
            top: 25px;
            background-size: contain;
        }
        .cancel {
            display: inline-block;
            height: 20px;
            width: 20px;
            background: url(../assets/cancel.svg) no-repeat;
            right: 30px;
            top: 24px;
            background-size: contain;
            position: absolute;
        }
    }
    .word-warp {
        display: flex;
        flex-direction: column;
        h6 {
            margin-top: 10px;
            text-align: left;
            padding-left: 20px;
        }
        .label-content {
            display: flex;
            flex-wrap: wrap;
            padding-left: 20px;
            span {
                display: inline-block;
                font-size: 14px;
                padding: 0 10px;
                height: 30px;
                line-height: 30px;
                color: #000;
                border: 1px solid rgba(0, 0, 0, .6);
                border-radius: 99px;
                word-break: keep-all;
                margin-bottom: 10px;
                margin-right: 14px;
                cursor: pointer;
                &.special {
                    color: #fc4524;
                    border-color: #fc4524;
                }
            }
        }
    }
}
.search-history{
    h6{
        margin: 0 auto;
        font-size: 14px;
        font-weight: normal;
        color: #bdbdbd;
        margin-top: 10px;
    }
    >ul{
        list-style: none;
        padding-left: 0;
        >li{
            display: flex;
            border-bottom: 1px solid #ccc;
            height: 30px;
            line-height: 30px;
            .historyIcon{
                background: url(../assets/history.svg) no-repeat;
                background-size: contain;
                height: 16px;
                width: 16px;
                display: inline-block;
                margin:7px 10px 0 20px;
            }
        }
    }
}
</style>
