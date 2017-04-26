<template>
    <div class="qHeader">
        <div class="logo"></div>
        <div class="download" @click="toGit">Github</div>
    </div>
</template>
<script>
export default {
    name: 'qHeader',
    data() {
        return {
            msg: 'dddddd3123122223123123'
        }
    },
    methods:{
        toGit(){
            window.open('https://github.com/yangzhennupt/qqMusic');
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.qHeader {
    background-color: #31c27c;
    display: flex;
    justify-content: space-between;
    height: 44px;
    align-items: center;
    flex-shrink: 0;
 
    .logo {
        background: url(../assets/logo.png) no-repeat;
        height: 25px;
        width: 90px;
        background-size: contain;
        margin-left: 20px;
    }
    .download {
        font-size: 14px;
        color: #fff;
        background: #149c5a;
        padding: 3px 8px;
        border-radius: 6px;
        margin-right: 20px;
        cursor: pointer;
    }
}
</style>
