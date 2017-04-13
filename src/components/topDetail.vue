<template>
    <div class="topDetail">
        <div class="loading" v-show="loading">
            <img src="../assets/loading/ball-triangle.svg" alt="">
        </div>
        <div>{{date}}</div>
    </div>
</template>
<script>
export default {
    name: 'topDetail',
    data() {
        return {
            ids: 0,
            songList: [],
            date: '',
            loading: true
        }
    },
    created() {
        console.log('1')
        this.ids = this.$store.state.topId;
        this.$store.dispatch('getListDetail', {
            id: this.ids
        }).then(res => {
            this.date = res.data.date;
            this.loading = false;
        });
    },
    mounted() {


    },
    methods: {

    }
}
</script>
<style lang="scss">
.loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    img {
        margin: 0 auto;
    }
}
</style>
