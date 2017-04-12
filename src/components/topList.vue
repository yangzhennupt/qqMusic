<template>
    <div class="topList">
        <ul>
            <li v-for="item in topListInfo" :key="item.id"><span v-for="song in item.songList">{{song.songname}}!</span></li>
        </ul> 
    </div>
</template>
<script>
export default {
    name: 'topList',
    data() {
        return {
            topListInfo: []
        }
    },
    created() {
        this.$store.commit('changeActiveIndex', 2);
    },
    mounted() {
        this.$store.dispatch('getTopList').then(res => {
            this.topListInfo = res.data.data.topList;
        });
        console.log(document.querySelector('audio'));
    }
}
</script>
<style scoped lang="scss">
.topList {
    >ul {
      display: flex;
      flex-direction:column;
        >li {

        }
    }
}
</style>
