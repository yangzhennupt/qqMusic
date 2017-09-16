<template>
    <div class="warp">
        <div class="loading" v-show="loading">
            <img src="../assets/loading/ball-triangle.svg" alt="">
        </div>
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide in swiperSlides" :key="slide.id"><img :src="slide.pic" class="slide-img"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <h5 v-show="!loading">热门歌单</h5>
        <div class="hotdissWarp">
            <ul>
                <li v-for="item in hotdiss" :key="item.dissid" @click="enterHot(item.dissid)">
                    <div class="hotImg">
                        <img :src="item.imgurl" :alt="item.dissname">
                    </div>
                    <div class="hotInfo">
                        <p>{{item.dissname}}</p>
                        <p>{{item.author}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper';
export default {
    name: 'warp',
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {

            swiperOption: {
                autoplay: 3500,
                setWrapperSize: true,
                pagination: '.swiper-pagination',
                autoplayDisableOnInteraction: false,
                loop: true
            },
            swiperSlides: [],
            loading: true,
            hotdiss: []
        }
    },
    created() {
    
        this.$store.dispatch('getHotList').then(res => {
            this.swiperSlides = res.data.data.focus;
            this.hotdiss = res.data.data.hotdiss.list;
            this.loading = false;
            
        })
    },
    mounted() {
        this.$store.commit('changeActiveIndex', 1);
    },
    methods:{
        enterHot(hotId){
            this.$router.push({
                name:'hotList',
                path: '/hotList',
                params:{id:hotId}
            });
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.slide-img {
    width: 100%;
}

.hotdissWarp {
    ul {
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin-right: 10px;
        li{
            position: relative;
            width: 50%;
            box-sizing: border-box;
            padding: 10px;
            padding-right: 0;
            display: flex;
            flex-direction:column;
            .hotImg{
                overflow: hidden;
                flex:1;
                img{
                    width: 100%;
                    transform: scale(1) translateZ(0);
                    transition: transform .75s;
                }
            
            }
            .hotInfo{
                // position: absolute;
                // bottom: 10px;
                // left: 10px;
                // right: 0;
                // background: linear-gradient(to top,rgba(51, 51, 51, 1),rgba(251, 251, 251, 0.91));
                background: #fff;
                p{
                    white-space: nowrap;
                    text-overflow:ellipsis;
                    overflow: hidden;
                    padding: 0 10px;
                    margin: 8px;
                }
            }
            &:hover{
                .hotImg{
                      img{
                        transform: scale(1.07) translateZ(0);
                        transition: transform .75s cubic-bezier(0,1,.75,1)
                      }
                        
                    
                }
            }
           
        }
    }
}
</style>
