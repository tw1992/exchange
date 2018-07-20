<template>
  <div id="box">
    <ul id="con1" ref="con1" :class="{'anim':animate==true}">
      <li v-for='item in prizeList' @click="goToDetail(item.id)" style="cursor: pointer;">{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
  var timer;
  export default {
    props:{
      prizeList:{
        type: Array,
        default:function(){
          return [{title:"马云"},{title:"雷军"},{title:"王勤"}];
        }}
    },
    data () {
      return {
        animate:false,
      }
    },
    created(){
      if(window.timer){
        clearInterval(window.timer)
      }
      window.timer = setInterval(this.scroll,3000)
    },
    methods: {
      scroll(){
        let con1 = this.$refs.con1;
        con1.style.marginTop='-27px';
        this.animate=!this.animate;
        var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
        setTimeout(function(){
          that.prizeList.push(that.prizeList[0]);
          that.prizeList.shift();
          con1.style.marginTop='0px';
          that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
        },500)
      },
      goToDetail(id){
        if(id){
          this.$router.push({name:'detail',query:{id:id}})
        }
      }
    }
  };
</script>
<style scoped>
  #box{
    width: 300px;
    height: 24px;
    line-height: 30px;
    overflow: hidden;
    padding-left: 30px;
  }
  .anim{
    transition: all 2s;
  }
  #con1 li{
    list-style: none;
    line-height: 24px;
    height: 24px;
    display: block;
  }
</style>
