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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
 
}
body{
  margin: 0;

}
html{
  font-size: 10px;
}
</style>
