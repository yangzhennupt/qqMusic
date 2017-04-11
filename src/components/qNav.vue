<template>
    <nav class="qNav">
        <a href="javascript:;" class="current">推荐</a>
        <a href="javascript:;">排行榜</a>
        <a href="javascript:;">搜索</a>
    </nav>
</template>
<script>
export default {
    name: 'qNav',
    data() {
        return {
            msg: '123'
        }
    }
}
</script>
<style lang="scss" scoped>
.qNav {
    background-color: #fff;
    display: flex;
    a {
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
    }
}
</style>
