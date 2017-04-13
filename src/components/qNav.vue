<template>
    <nav class="qNav">
        <a href="javascript:;" :class="{current:activeIndex==1}">
            <router-link to="/">推荐</router-link>
        </a>
        <a href="javascript:;" :class="{current:activeIndex==2}">
            <router-link to="/topList">排行榜</router-link>
        </a>
        <a href="javascript:;" :class="{current:activeIndex==3}">
            <router-link to="/search">搜索</router-link>
        </a>
    </nav>
</template>
<script>
export default {
    name: 'qNav',
    data() {
        return {
            msg: '123'
        }
    },
    computed: {
        activeIndex() {
            return this.$store.state.activeIndex
        }
    }
}
</script>
<style lang="scss" scoped>
.qNav {
    background-color: #fff;
    display: flex;
    flex-shrink: 0;
    >a {
        flex: 1;
        color: #333;
        position: relative;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        text-decoration: none;
        &.current {
            color: #31c27c;
            &:after {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                display: block;
                height: 2px;
                background-color: #31c27c;
            }
        }
        >a {
            width: 100%;
            display: inline-block;
            text-decoration: none;
            color: #333;
        }
    }
}
</style>
