<template>
    <div class="hotList">
        <div class="img-filter">
            <img :src="cdInfo.logo">
            <i class="playAll" @click.once="playAll()"></i>
        </div>
        <ul class="hotList-detail">
            <li v-for="(item,index) in hotList" :key="item.songid" @click="playSong(item)" class="clearfix">
                <span class="list-no">{{++index}}</span> <span class="song-name">{{item.data.name}}</span> - <span class="singer"><span v-for="singer in item.data.singer ">{{singer.name}}</span></span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'hotList',
    data() {
        return {
            hotId: this.$route.params.id,
            hotList: [],
            cdInfo: {}
        }
    },
    computed: {

    },
    created() {
        //this.$store.commit('changeFullScreen',true);
        this.$store.dispatch('getHotDetail', {
            id: this.hotId
        }).then(res => {
            console.log(res);
            this.cdInfo = res.data.cdlist[0];
            let temList = res.data.cdlist[0].songlist;
            for (let i = 0; i < temList.length; i++) {
                if (i == 20) return;
                let temObj = {
                    data: {
                        songid: null,
                        albummid: null,
                        singer: [],
                        name: null
                    }
                };
                temObj.data.songid = temList[i].id;
                temObj.data.albummid = temList[i].album.mid;
                temObj.data.singer = temList[i].singer;
                temObj.data.name = temList[i].name;
                this.hotList.push(temObj);
            }

            //console.log(this.hotList);
        })
    },
    methods: {
        playSong(item) {
            this.$store.commit('changAudio', {
                "songid": item.data.songid,
                "albummid": item.data.albummid
            });
            //获取当前的index;
            let curIndex = this.$store.state.audio.index;
            //在当前index位置插入一个数组元素;
            this.$store.state.musicList.splice(++curIndex, 0, item);

            this.$store.commit('changeMusic', curIndex);

            //改变播放状态
            this.$store.commit('play', true);
            //播放
            this.$store.state.dom.play();
        },
         playAll(){
           
            //获取当前播放列表的长度
            let musicLen=this.$store.state.musicList.length;
         
          
             //添加歌单数组到播放列表
            this.$store.state.musicList=this.$store.state.musicList.concat(this.hotList);
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
<style scoped lang="scss">
.hotList {
    position: absolute;
    top: 0;
    bottom: 60px;
    left: 0;
    right: 0;
    background: #fff;
        overflow-x: hidden;
    overflow-y: auto;
}

.img-filter {
    position: relative;
    height: 30%;
    img {
        width: 100%;
        height: 100%;
        float: left;
        border: none;
    }
    p {
        margin: 0;
    }
}

.hotList-detail {
    list-style: none;
    position: absolute;
    top: 30%;
    bottom: 0;
    left: 0;
    right: 0;
  
    padding: 0;
    margin: 0;
    li {
        width: 100%;
        height: 45px;
        line-height: 45px;
        padding-left: 40px;
        text-align: left;
        white-space: nowrap;
        &:nth-child(even) {
            background: #f5f5f5;
        }
        .list-no {
            float: left;
            margin-left: -20px;
        }
    }
}

.playAll {
    position: absolute;
    right: 15px;
    top: 70%;
    background: url(../assets/playAll.svg) no-repeat;
    background-size: contain;
    height: 50px;
    width: 50px;
    border: none;
    text-decoration: none;
    outline: none;
    cursor: pointer;
}
.song-name{
    max-width: 60%;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.singer{
    max-width: 28%;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
