<template>
  <div class="footer">     
     <div class="miniPlay" v-if="isShowminiPlay">
         <div class="music-img">
           <img src="http://imgcache.qq.com/music/photo/album_300/82/300_albumpic_1677982_0.jpg" alt="">
         </div>
         <div class="music-info">
           
         </div>
         <div class="music-option">
           
         </div>
     </div>
    
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    isShowminiPlay(){
       return this.$store.state.isShowminiPlay
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer{
width: 100%;
align-self:flex-end;
    background-color: #31c27c;
}
   .miniPlay{
    display:flex;
    justify-content:space-between;
    height: 70px;
    line-height: 70px;
     align-items: center;
    .music-img{
       width: 65px;
       height: 65px;
      
       img{
         border-radius: 50%;
         width: 100%;
         height: 100%;
       }
    }
    .music-info{
       flex:5;
    }
    .music-option{
       flex:1;
    }
   }
</style>
