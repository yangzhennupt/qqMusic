<template>
  <div class="search">
      <div class="loading" v-show="loading">
            <img src="../assets/loading/ball-triangle.svg" alt="">
      </div>
  	 <div class="search-input">
  	 	<input type="text">
  	 </div>
  	 <div class="hot-word">
  	 	<h6 v-show="!loading">热门搜索</h6>
  	 	<span>{{hotWord.special_key}}</span>
  	 </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
             loading:true,
             hotWord:{}
        }
    },
    computed:{

    },
    created(){
      this.$store.dispatch('getHotWord').then(res=>{
      	this.hotWord=res.data.data
      	this.loading=false;
         console.log(res.data.data);
      })
    },
    mounted(){

    },
    methods:{

    }
}
</script>
<style scoped lang="scss">
</style>
