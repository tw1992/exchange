<template>
  <div class="count-r-top">
    <slot>

    </slot>
  </div>
</template>
<script>
    export default{
        props:{
        },
        data(){
            return {}
        }
    }
</script>
<style>
  .count-r-top{
    height: 60px;
    background: #21201A;
    color: #CEC6BE;
    padding:20px 30px;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
  }
  .count-r-top>div{
    display: inline-block;
  }
  .count-r-top>span{
    float: right;
    font-size: 14px;
  }
</style>
