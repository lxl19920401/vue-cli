<template>
    <div>
       <router-link to="/">home</router-link>
        <router-link to="/about">about</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "app",
        created() {
            console.log(22222222222222222)
        },
        methods:{

        }
    }
</script>

<style scoped>
   @import './assets/2.less';
</style>
