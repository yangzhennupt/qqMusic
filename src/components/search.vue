<template>
    <div class="search">
        <div class="loading" v-show="loading">
            <img src="../assets/loading/ball-triangle.svg" alt="">
        </div>
        <div class="search-input">
            <input v-model="searchKey" type="text" placeholder="搜索歌曲、歌单、专辑" @focus="changStatus" @blur="changStatus"  @keyup.enter="doSearch(searchKey)">
            <i></i>
            <span class="cancel" v-show="isFocus&&!isSearch"></span>
        </div>
        <div class="hot-word"  v-show="!isFocus&&!isSearch">
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
              
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                loading: true,
                hotWord: {},
                isFocus: false,
                hotkey: [],
                searchKey:'',
                searchResult:{},
                isSearch:false
            }
        },
        computed: {

        },
        created() {
            this.$store.commit('changeActiveIndex', 3);
            this.$store.dispatch('getHotWord').then(res => {
                this.hotWord = res.data.data;
                this.hotkey = res.data.data.hotkey.slice(0, 10);
                this.loading = false;
          
            })
        },
        mounted() {

        },
        methods: {
            changStatus() {
                this.isFocus = !this.isFocus;
            },
            doSearch(searchKey){
              if(searchKey.trim()!=""){
                  this.$store.dispatch('getSearchResult',{keys:searchKey}).then(res=>{
                  this.searchResult=res.data.data;
                  this.isSearch=true;

               });
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
                &.special {
                    color: #fc4524;
                    border-color: #fc4524;
                }
            }
        }
    }
}
</style>
