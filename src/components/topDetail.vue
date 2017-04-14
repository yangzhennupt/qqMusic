<template>
    <div class="topDetail">
        <div class="loading" v-show="loading">
            <img src="../assets/loading/ball-triangle.svg" alt="">
        </div>
        <div class="top-head" v-show="!loading">
            <div class="imgContent">
                <img :src="detailImg">
                <div class="top-info">
                    <h6>{{topName}}</h6>
                    <p>{{date}} 更新</p>
                </div>
            </div>
        </div>
        <ul>
            <li v-for="(item,index) in songList" @click="chooseSong(item.data.songid)">
                <div class="song-info">
                    <div class="song-no">
                        {{index+1}}
                    </div>
                    <div class="song-detail">
                        <p>{{item.data.songname}}</p>
                        <p><span v-for="songer in item.data.singer">{{songer.name}}</span></p>
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
            ids: 0,
            songList: [],
            loading: true,
            detailImg: '',
            topName: '',
            date: ''
        }
    },
    created() {
        this.ids = this.$store.state.topId;
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
            this.topName = res.data.topinfo.ListName;
            this.date = res.data.date;
            this.detailImg = res.data.topinfo.pic_album;
            this.loading = false;
        });
    },
    mounted() {
        

    },
    methods: {
        chooseSong(songid) {
         this.$store.commit('changAudio',songid);
         this.$store.commit('play',true);
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
    img {
        margin: 0 auto;
    }
}

.top-head {
    width: 100%;
    flex: 1;
    height: 40%;
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
            background: linear-gradient(to right, rgba(76, 202, 141, 1), rgba(131, 139, 150, .8));
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
            }
        }
    }
}

.topDetail {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    ul {
        flex: 1;
        margin: 0;
        padding: 0;
        li {
            display: flex;
            height: 60px;
            .song-info {
                display: flex;
                //height: 100%;
                align-items: center;
                // width: 100%;
                flex: 1;
                background: #fff;
                margin-bottom: 10px;
                .song-no {}
                .song-detail {
                    p {}
                }
            }
        }
    }
}
</style>
