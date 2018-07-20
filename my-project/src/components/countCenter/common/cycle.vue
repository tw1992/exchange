<template>
    <span class="cycle-par">
        <span class="cycle-chile-sec cycle-chile-com" :class="{'seled':!sele,'notsele':sele}"></span>
    </span>
</template>
<script>
  export default{
    props:{
      sele:{
        default:false
      }
    }
  }
</script>
<style>
  .cycle-par{
    width: 20px;
    height: 20px;
    display: inline-block;
    position: relative;
  }
  .cycle-chile-com{
    position: absolute;
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }
  .cycle-chile-sec{
    top: 1px;
    left: 2px;
    text-align: center;
    line-height: 14px;
    color: #FFFFFF;
  }
  .seled{
    background: #C8B297;
  }
  .notsele{
    background: #A6A6A6;
  }
</style>

