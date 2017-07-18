<template>
    <div class="topList">
        <div class="loading" v-show="loading">
            <img src="../assets/loading/ball-triangle.svg" alt="">
        </div>
        <ul>
            <li v-for="item in topListInfo" :key="item.id" @click="toTopDetail(item.id)">
                <div class="topItem">
                    <div class="imgInfo">
                        <img :src="item.picUrl">
                        <span>{{parseFloat(item.listenCount/10000).toFixed(1)}}万</span>
                    </div>
                    <div class="songsInfo">
                        <h6>{{item.topTitle}}</h6>
                        <p v-for="(song,index) in item.songList ">{{index+1}} <span>{{song.songname}}</span> -{{song.singername}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'topList',
    data() {
        return {
            topListInfo: [],
            loading: true
        }
    },
    created() {
        this.$store.commit('changeActiveIndex', 2);
    },
    mounted() {
        this.$store.dispatch('getTopList').then(res => {
            this.topListInfo = res.data.data.topList;
            this.loading = false;
        });
      
    },
    methods: {
        toTopDetail(topId) {
            this.$store.state.topId = topId;
            this.$router.push({
                name:'topDetail',
                path: '/topDetail',
                params:{id:topId}
            });
        }
    }
}
</script>
<style scoped lang="scss">
.topList {
    height: 100%;
    width: 100%;
    >ul {
        overflow-y: auto;
        
        list-style: none;
        padding: 0;
        margin: 0;
        background: #f4f4f4;
        >li {
            background: #fff;
            margin: 10px;
            border-radius: 5px;
            .topItem {
                display: flex;
                .imgInfo {
                    width: 100px;
                    height: 100px;
                    position: relative;
                    border-radius: 5px;
                    img {
                        height: 100%;
                        width: 100%;
                        border-radius: 5px 0 0 5px;
                    }
                    span {
                        position: absolute;
                        bottom: 2px;
                        color: #fff;
                        left: 5px;
                        font-size: 9px;
                        opacity: .6;
                    }
                }
                .songsInfo {
                    text-align: left;
                    flex: 1;
                    margin: 6px 10px 0px 16px;
                    min-width: 0;
                    h6 {
                        margin: 0;
                        margin-bottom: 12px;
                        font-size: 16px;
                        color: #333;
                        font-weight: normal;
                    }
                    p {
                        margin: 0;
                        font-size: 14px;
                        color: rgba(0, 0, 0, .5);
                        overflow: hidden;
                        margin-bottom: 5px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        span {
                            color: #000;
                            margin-left: 8px;
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
}
</style>
