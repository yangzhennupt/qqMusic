<template>
	<div class="topList">
       <ul>
       	  <li v-for="item in topListInfo" :key="item.id"><span>{{item.topTitle}}</span></li>
       </ul>
	</div>
</template>

<script>
 export default{
    name:'topList',
 	data(){
       return {
         topListInfo:[]
       }
 	},
 	created(){
 		this.$store.commit('changeActiveIndex',2);
 	},
 	mounted(){
 		 this.$store.dispatch('getTopList').then(res=>{
            this.topListInfo=res.data.data.topList;
        })
 	}
 }

</script>

<style scoped lang="scss">
	

</style>