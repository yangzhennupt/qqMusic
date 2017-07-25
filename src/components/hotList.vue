<template>
    <div class="hotList">
        <div class="img-filter">
            <img :src="logoImg">
        </div>
    </div>
</template>
<script>
export default {
    name: 'hotList',
    data() {
        return {
            hotId: this.$route.params.id,
            hotList:[],
            logoImg:''
        }
    },
    computed: {
     
    },
    created() {
          //this.$store.commit('changeFullScreen',true);
    	  this.$store.dispatch('getHotDetail', {
            id: this.hotId
        }).then(res=>{
            this.logoImg=res.data.cdlist[0].logo;
            let temList=res.data.cdlist[0].songlist;
            temList.forEach((item,index)=>{
                 if(index===10)return;
                let temObj={
                    data:{
                        songid:null,
                        albummid:null,
                        singer:[]
                    }
                };
                temObj.data.songid=item.id;
                temObj.data.albummid=item.album.mid;
                temObj.data.singer=item.singer;
                this.hotList.push(temObj);
               
            })
        	console.log(this.hotList);
        })
    },
    methods: {

    }
}
</script>
<style scoped lang="scss">
    .hotList{
        position: absolute;
        top: 0;
        bottom: 60px;
        left: 0;
        right: 0;
        background: #fff;
    }
</style>
