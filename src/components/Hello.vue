<template>
    <div class="warp">
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide in swiperSlides" :key="slide.id"><img :src="slide.picUrl" class="slide-img"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
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
                autoplayDisableOnInteraction: false
            },
            swiperSlides: []
        }
    },
    created() {
        this.$store.dispatch('getData').then(res => {
            this.swiperSlides = res.data.data.slider;
        });
    },
    mounted() {
         this.$store.commit('changeActiveIndex',1);
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.slide-img {
    width: 100%;
}
</style>
