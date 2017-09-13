<template>
    <div class="hotList">
        <div class="img-filter">
            <img :src="cdInfo.logo">          
        </div>
        <ul class="hotList-detail">
            <li v-for="(item,index) in hotList" :key="item.songid" @click="playSong(item)" class="clearfix">
               <span class="list-no">{{++index}}</span>{{item.data.name}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'hotList',
    data() {
        return {
            hotId: this.$route.params.id,
            hotList:[],
            cdInfo:{}
        }
    },
    computed: {
     
    },
    created() {
          //this.$store.commit('changeFullScreen',true);
    	  this.$store.dispatch('getHotDetail', {
            id: this.hotId
        }).then(res=>{
            console.log(res);
            this.cdInfo=res.data.cdlist[0];
            let temList=res.data.cdlist[0].songlist;
            temList.forEach((item,index)=>{
                 if(index===10)return;
                let temObj={
                    data:{
                        songid:null,
                        albummid:null,
                        singer:[],
                        name:null
                    }
                };
                temObj.data.songid=item.id;
                temObj.data.albummid=item.album.mid;
                temObj.data.singer=item.singer;
                temObj.data.name=item.name;
                this.hotList.push(temObj);
               
            })
        	//console.log(this.hotList);
        })
    },
    methods: {
        playSong(item){
             this.$store.commit('changAudio', {
                "songid": item.data.songid,
                "albummid": item.data.albummid
            });
            //获取当前的index;
            let curIndex=this.$store.state.audio.index;
            //在当前index位置插入一个数组元素;
            this.$store.state.musicList.splice(++curIndex,0,item);

            this.$store.commit('changeMusic',curIndex);
             
            //改变播放状态
            this.$store.commit('play', true);
            //播放
            this.$store.state.dom.play();
        }
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
    .img-filter{
        img{
            width:100%;
            height:300px;
            float: left;
        }
        p{
            margin: 0;
        }
    }
    .hotList-detail{
        list-style: none;
        position: absolute;
        top: 300px;
        bottom: 0;
        left:0;
        right: 0;
        overflow-y: auto;
        overflow-x:hidden;
        padding: 0;
        margin: 0;
            li{
                width: 100%;
                height: 45px;
                line-height: 45px;
                padding-left: 40px;
                text-align: left;
                &:nth-child(even){
                    background: #fcfcfc;
                }
                .list-no{
                    float: left;
                    margin-left: -20px;

                }
            }
    }
</style>
