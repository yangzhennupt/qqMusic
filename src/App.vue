<template>
  <div id="app">
    <qHeader></qHeader>
    <qNav></qNav> 
    <router-view></router-view>
  </div>
</template>

<script>
import qHeader from './components/qHeader.vue';
import qNav from './components/qNav.vue';
export default {
  name: 'app',
  components:{
   qHeader,
   qNav
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 72rem) {
         body{
     
      width:40rem;

    }

  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
 
}
body{
   margin: 0 auto;
}

html{
  font-size: 10px;
}
</style>
