<template>
    <div class="titlecountCenter">
      <span style="color: #FFFFFF;">{{title}}</span>
      <slot></slot>
    </div>
</template>
<style>
  .titlecountCenter{
    width:100%;
    height: 40px;
    background: #AA9882;
    line-height: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
  }
</style>
<script>
    export default{
        props:{
          title:{
            type: String
          }
        }
    }
</script>
