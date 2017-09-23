<template>
    <div class="topDetail">
        <div class="loading" v-show="loading">
            <img src="../assets/loading/ball-triangle.svg" alt="">
        </div>
        <div class="top-head" v-show="!loading">
            <div class="imgContent">
                <img :src="detailImg">
                <div class="top-info" :style="{background:mask}">
                    <h6>{{topName}}</h6>
                    <p class="updateTime">{{date}} 更新</p>
                    <button @click="playAll()" class="playAll"></button>
                </div>
            </div>
        </div>
        <ul :style="{background:color}">
            <li v-for="(item,index) in songList" @click="chooseSong(item)">
                <div class="song-info" :class="{dark:isDark}">
                    <div class="song-no">
                        {{index+1}}
                    </div>
                    <div class="song-detail">
                        <p class="song-name">{{item.data.songname}}</p>
                        <p class="singer"><span v-for="songer in item.data.singer">{{songer.name}}</span></p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'topDetail',
    data() {
        return {
            ids: this.$route.params.id,
            songList: [],
            loading: true,
            detailImg: '',
            topName: '',
            date: '',
            topListData: null
        }
    },
    created() {
       // this.ids = this.$store.state.topId;
        this.$store.dispatch('getListDetail', {
            id: this.ids
        }).then(res => {
            res.data.songlist.forEach((v, index) => {
                if (index < 10) {
                    this.songList.push(v);
                } else {
                    return
                }
            });
           // this.$store.state.playList = this.songList;
            this.topListData = res.data;
            this.topName = res.data.topinfo.ListName;
            this.date = res.data.date;
            this.detailImg = res.data.topinfo.pic_album;
            this.loading = false;

        });
    },
    mounted() {

    },
    computed: {
        color() {
            if (this.topListData != null) {
                var fixed = '00000' + this.topListData.color.toString(16)
                return '#' + fixed.substr(fixed.length - 6)
            } else {
                return '#ffffff'
            }
        },
        mask() {

            return 'linear-gradient(to bottom,rgba(' + this.r + ',' + this.g + ',' + this.b + ',0' + '),' + this.color + ')';
        },
        r() {
            return parseInt(this.color.slice(1, 3), 16)
        },
        g() {
            return parseInt(this.color.slice(3, 5), 16)
        },
        b() {
            return parseInt(this.color.slice(5, 7), 16)
        },
        isDark() {
            var grayLevel = this.r * 0.299 + this.g * 0.587 + this.b * 0.114
            return (grayLevel < 192)
        }

    },
    methods: {
        chooseSong(item){
            this.$store.commit('changAudio', {
                "songid": item.data.songid,
                "albummid": item.data.albummid
            });
            //获取当前的index;
            let curIndex=this.$store.state.audio.index;
            //在当前index位置插入一个数组元素;
            this.$store.state.musicList.splice(++curIndex,0,item);

            this.$store.commit('changeMusic',curIndex);
             
            //改变播放状态
            this.$store.commit('play', true);
            //播放
            this.$store.state.dom.play();
        },
        playAll(){
           
            //获取当前播放列表的长度
            let musicLen=this.$store.state.musicList.length;
           // let index=++this.$store.state.audio.index;
           //  let index=musicLen;
          
             //添加歌单数组到播放列表
            this.$store.state.musicList=this.$store.state.musicList.concat(this.songList);
              //改变audio当前src
            this.$store.commit('changeMusic',musicLen);
            //改变播放状态
            this.$store.commit('play', true);
            //播放
            this.$store.state.dom.play();
        }
    }
}
</script>
<style lang="scss">
.loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    z-index: 1000;
    background: #fff;
    img {
        margin: 0 auto;
    }
}

.topDetail {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .top-head {
        width: 100%;
        //flex: 1;
        //height: 30%;
         flex: 0 0 50%;
         height: 50%;
        //height: 200px;
        .imgContent {
            position: relative;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
            .top-info {
                position: absolute;
                bottom: 0;
                left: 0;
                text-align: left;
                right: 0;
                z-index: 3;
                font-size: 14px;
                //background: liner-gradient(to right,rgba(66,34,129,1),rgba(131, 139, 150, .8));
                // background: -webkit-linear-gradient(to right, rgba(66, 34, 129, 1), rgba(131, 139, 150, .8));
                h6 {
                    font-size: 20px;
                    margin: 0;
                    padding-left: 20px;
                    margin-top: 10px;
                    color: #fff;
                }
                p {
                    color: #fff;
                    padding-left: 20px;
                    &.updateTime {
                        padding-bottom: 20px;
                        border-bottom: 1px solid rgba(187, 187, 187, .5);
                    }
                }
                .playAll{
                    position: absolute;
                    right: 20px;
                    top: 28px;
                    background: url(../assets/playAll.svg) no-repeat;
                    background-size: contain;
                    display: block;
                    height: 50px;
                    width: 50px;
                    border: none;
                    text-decoration: none; 
                    outline: none;
                    cursor: pointer;
                }
            }
        }
    }
    ul {
         flex: 0 0 50%;
        margin: 0;
        padding: 0;
        //overflow-y: scroll;
        li {
            display: flex;
            height: 60px;
            .song-info {
                display: flex;
                //height: 100%;
                align-items: center;
                // width: 100%;
                flex: 1;
                //background: #fff;
                margin-bottom: 10px;
                justify-content: space-between;
                overflow: hidden;
                .song-no {
                    width: 50px;
                    text-align: center;
                    flex-shrink: 0;
                    color: #fff;
                }
                .song-detail {
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    height: 100%;
                    line-height: 25px;
                    text-align: left;
                    overflow: hidden;
                    // padding-right: 40px;
                    p {
                        margin: 0;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 100%;
                        &.song-name {
                            color: #fff;
                        }
                        &.singer {
                            color: #bbb;
                            border-bottom: 1px solid rgba(158, 158, 158, 0.5);
                            padding-bottom: 5px;
                        }
                        span {
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
}
</style>
