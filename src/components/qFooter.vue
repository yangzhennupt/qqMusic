<template>
    <div class="footer">
        <div class="miniPlay" v-if="isShowminiPlay">
            <div class="music-img" :class="{hasAnimate:isPlay}">
                <img :src="songInfo.imgurl || defaultImg" alt="songInfo.name" @error="changeSrc()">
            </div>
            <div class="music-info">
                <div class="audio-info">
                    <p>{{songInfo.name}}{{songInfo.name?'-':''}}{{songInfo.singer}}</p>
                </div>
            </div>
            <div class="music-option">
                <i class="nextSong" @click="nextSong()"></i>
                <i :class="[isPlay?playIcon:pauseIcon]" @click="play()"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'footer',
    data() {
        return {
            playIcon: 'playStyle',
            pauseIcon: 'pauseStyle',
            defaultImg: './static/default.jpg'
        }
    },
    computed: {
       
        isShowminiPlay() {
            return this.$store.state.isShowminiPlay
        },
        isPlay() {
            return this.$store.state.isPlay
        },
        getDom() {
            return this.$store.state.dom;
        },
        songInfo() {
            return this.$store.state.audio;
        }
    },
    methods: {
        play() {
            if (this.$store.state.audio.src != "") {
                this.$store.commit('play', !this.isPlay);
                this.isPlay ? this.getDom.play() : this.getDom.pause();
            }

        },
        changeSrc(){
            this.$store.state.audio.imgurl=this.defaultImg;
        },
        nextSong(){
            if (this.$store.state.musicList.length > this.$store.state.audio.index+1) {
                this.$store.commit('changeMusic', ++this.$store.state.audio.index);
                //改变播放状态
                this.$store.commit('play', true);
                //播放
                this.$store.state.dom.play();
            } else {
                this.$store.commit('play', false);
                this.isPlay ? this.getDom.play() : this.getDom.pause();
            }
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
    width: 100%;
    background-color: #31c27c;
    flex-shrink: 0;
    z-index: 10;
}
.nextSong{
    display: inline-block;
    vertical-align:middle;
    height: 30px;
    width: 30px;
    background: url(../assets/nextSong.svg) no-repeat;
    background-size: contain;
}
.playStyle {
    background: url(../assets/media-pause.svg) no-repeat;
    width: 30px;
    height: 30px;
    display: inline-block;
    background-size: contain;
        margin-left: 25px;
}

.pauseStyle {
    background: url(../assets/media-play.svg) no-repeat;
    width: 30px;
    height: 30px;
    display: inline-block;
    background-size: contain;
        margin-left: 25px;
}
.hasAnimate{
   animation: rounds 10s linear 0s infinite normal;
}
@keyframes rounds {
    0%{
        transform:rotate(0deg);
    }
    100%{
        transform:rotate(360deg);
    }
}
.miniPlay {
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    align-items: center;
    padding-left: 10px;
    .music-img {
        width: 40px;
        height: 40px;
        img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
        }
    }
    .music-info {
        flex: 4;
        display: flex;
        p{
            height: 20px;
            line-height: 20px;
            color: #fff;
            margin-left: 10px;
        }
    }
    .music-option {
        flex: 1.5;
        display: flex;
    }
}
</style>
