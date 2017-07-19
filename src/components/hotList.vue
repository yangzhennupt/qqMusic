<template>
</template>
<script>
export default {
    name: 'hotList',
    data() {
        return {
            hotId: this.$route.params.id
        }
    },
    computed: {

    },
    created() {
    	  this.$store.dispatch('getHotDetail', {
            id: this.hotId
        }).then(res=>{
        	
        })
    },
    methods: {

    }
}
</script>
<style scoped lang="scss"></style>
