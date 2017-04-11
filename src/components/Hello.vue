<template>
    <div class="warp">
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide in swiperSlides">I'm Slide {{ slide }}</swiper-slide>
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
    beforeCreate() {
        this.$store.dispatch('getData');
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            swiperOption: {
                autoplay: 2000,
                setWrapperSize: true,
                pagination: '.swiper-pagination'
            },
            swiperSlides: []

        }
    },
    mounted() {
        // console.log(this.newSong);
        this.swiperSlides = this.$store.state.sliderList;

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
