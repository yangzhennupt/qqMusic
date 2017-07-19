<template>
    <div id="app">
        <!-- 头部logo -->
        <qHeader  :message="msg" v-show="!fullScreen"></qHeader>
        <!-- 导航 -->
        <qNav v-show="!fullScreen"></qNav>
        <!-- 路由控制区域 -->
        <div class="mainContent">
            <router-view></router-view>
        </div>
        <!-- 底部mini播放器 -->
        <qFooter v-show="!fullScreen"></qFooter>
        <audio :src="audio.src||defaultSrc" ref="audio" :autoplay="isPlay" @ended="hasEnd"></audio>
    </div>
</template>
<script>
import qHeader from './components/qHeader.vue';
import qNav from './components/qNav.vue';
import qFooter from './components/qFooter.vue';
export default {
    name: 'app',
    data() {
        return {
            defaultSrc: "",
            msg:'Github'
        }
    },
    components: {
        qHeader,
        qNav,
        qFooter
    },
    mounted() {
        this.$store.commit('getDom', this.$refs.audio);

    },
    computed: {
        fullScreen(){
            return this.$store.state.fullScreen;
        },
        audio() {
            return this.$store.state.audio;
        },
        isPlay() {
            return this.$store.state.isPlay;
        },
        musicList() {
            return this.$store.state.musicList;
        }
    },
    methods: {
        hasEnd() {
            this.$store.state.isPlay = false;
            this.nextSong();
        },
        nextSong() {

            if (this.$store.state.musicList.length > this.$store.state.audio.index+1) {
                this.$store.commit('changeMusic', ++this.$store.state.audio.index);
                //改变播放状态
                this.$store.commit('play', true);
                //播放
                this.$store.state.dom.play();
            } else {
                this.$store.commit('play', false);
            }

        }
    }
}
</script>
<style lang="scss">
@media screen and (min-width: 72rem) {
    body {
        width: 40rem;
    }
}

.mainContent {
    position: relative;
    flex: 20;
    overflow: auto;
}

#app {
    text-align: center;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px #6d6969;
}

body {
    margin: 0 auto;
    height: 100%;
    background: #f4f4f4;
}

html {
    font-size: 10px;
    height: 100%;
    font-family: "微软雅黑" !important;
}
</style>
