<template>
  <div id="app">
    <!-- 头部logo -->
    <qHeader></qHeader>
    <!-- 导航 -->
    <qNav></qNav> 
    <!-- 路由控制区域 -->
    <div class="mainContent">
      <router-view></router-view>
    </div>
    
    <!-- 底部mini播放器 -->
    <qFooter></qFooter>
    <audio src="http://m2.music.126.net/K1SFXCvWf8BO9VEpSvx2ew==/7967061257205150.mp3" autoplay=true></audio>
  </div>
</template>

<script>
import qHeader from './components/qHeader.vue';
import qNav from './components/qNav.vue';
import qFooter from './components/qFooter.vue';
export default {
  name: 'app',
  components:{
   qHeader,
   qNav,
   qFooter
  },
  computed:{

  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 72rem) {
         body{
     
      width:40rem;

    }

  }
.mainContent{
  flex:1;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction:column;
  height: 100%;
}
body{
   margin: 0 auto;
   height: 100%;
}

html{
  font-size: 10px;
  height: 100%;
}
</style>
