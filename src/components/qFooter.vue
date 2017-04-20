<template>
    <div class="footer">
        <div class="miniPlay" v-if="isShowminiPlay">
            <div class="music-img">
                <img :src="imgurl || defaultImg" alt="">
            </div>
            <div class="music-info">
            </div>
            <div class="music-option">
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
        imgurl() {
            return this.$store.state.audio.imgurl;
        }
    },
    methods: {
        play() {
            if (this.$store.state.audio.src != "") {
                this.$store.commit('play', !this.isPlay);
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
}

.playStyle {
    background: url(../assets/media-pause.svg) no-repeat;
    width: 30px;
    height: 30px;
    display: inline-block;
    background-size: contain;
}

.pauseStyle {
    background: url(../assets/media-play.svg) no-repeat;
    width: 30px;
    height: 30px;
    display: inline-block;
    background-size: contain;
}

.miniPlay {
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    align-items: center;
    padding-left: 10px;
    .music-img {
        width: 50px;
        height: 50px;
        img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
        }
    }
    .music-info {
        flex: 5;
    }
    .music-option {
        flex: 1;
        display: flex;
    }
}
</style>
