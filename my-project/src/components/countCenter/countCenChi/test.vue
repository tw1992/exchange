<template>
    <div>
        <div @click="qqqq">
            this is template bodybt <br>
            this is template bodybt <br>
            this is template bodybt <br>
            this is template bodybt <br>
            this is template bodybt <br>
            this is template bodybt <br>
            this is template bodybt <br>
            this is template bodybt <br>
        </div>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
      methods:{
        qqqq(){
          console.log(23232323)
          this.$router.push({name:'login'})
        }
      }
    }
</script>
