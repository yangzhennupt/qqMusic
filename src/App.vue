<template>
    <div id="app">
        <!-- 头部logo -->
        <qHeader  :message="msg" v-show="!fullScreen"></qHeader>
        <!-- 导航 -->
        <qNav v-show="!fullScreen"></qNav>
        <!-- 路由控制区域 -->
        <div class="mainContent">
           <transition name="fade" mode="out-in">
            <router-view></router-view>
           </transition>
        </div>
        <!-- 底部mini播放器 -->
        <qFooter v-show="!fullScreen"></qFooter>
        <audio :src="audio.src||defaultSrc" ref="audio" :autoplay="isPlay" @ended="hasEnd" id="myAudio"></audio>
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
    created() {
       // this.$store.state.dom=document.getElementById('myAudio');
      
        this.$store.commit('changeFullScreen',false);

    },
    mounted(){
        //一开始放在created方法里面，但是此时模板还未挂载，所以未获取的dom元素；但是奇怪的是之前都可以，暂定原因为vuejs版本升级所致，更严谨了；
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
  
    flex: 20;
    overflow: auto;
    position: relative;
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
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
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
