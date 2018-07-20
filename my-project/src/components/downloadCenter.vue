<template>
  <div class="down-load content-center margin_center" v-loading="loading">
    <div>
      <div class="down-top">
        {{download[0].name}}
      </div>
      <ul class="">
        <li class="downconcent">
          <div v-for="item1,index in download[0].list" v-if="item1.length">
            <div v-if="index == 0 && item1.length">
              币加PUSH手机版下载链接：
            </div>
            <div v-if="index == 1 && item1.length">
              币加数字资产兑换平台手机版下载链接:
            </div>
            <div v-for="item2 in item1" class="downLoadImg">
              <img :src="item2.photo" alt="">
              <a :href="item2.url"  target="_Blank">{{item2.title}}</a>
            </div>
          </div>
        </li>
      </ul>

      <div class="down-top" style="margin-top: 52px;" v-if="download[1].list && download[1].list.length>0">
        其他下载
      </div>
      <ul class="">
        <li class="downconcent">
          <div v-for="item,index in download[1].list" style="padding-bottom: 26px;">
            <img :src="item.photo" alt="">
            <a :href="item.url"  target="_Blank">{{item.title}}</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        download:[{},{}],
        loading:true
      }
    },
    methods:{
      down(){
        var that = this;
        this.interFace('download_list').then(function(res){
          console.log(res)
        })
      }
    },
    created(){
      var that = this;
      that.interFace('download_list').then(function(res){
        that.download = res;
        that.loading = false;
      })
    }
  }
</script>
<style>
  .down-load{
    margin-top: 52px!important;
    margin-bottom:163px!important;
    min-height: 300px;
  }
  .down-top{
    background: #21201A;
    color: #FFFFFF;
    padding-left: 31px;
    height: 50px;
    line-height: 50px;
  }
  .down-border{
    border: 1px solid #CCCCCC;
    margin-bottom: 51px;
  }
  .down-list{
    padding:22px 30px 26px 30px;
  }
  .down-list li{
    display: inline-block;
    margin-right: 30px;
  }
  .downconcent>div{
    padding:22px 30px 15px 30px;
    border: 1px solid #CCCCCC;
    border-top: 0;
  }
  .down-load a{
    color:#AA9882;
    border-bottom: 1px solid #AA9882;
  }
  .downLoadImg{
    display: inline-block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
    position: relative;
  }
  .downLoadImg img{
    width:30px;
    vertical-align: top;
    margin-right: 15px;
    position: absolute;
    top:2px;
  }
  .downLoadImg a{
    margin-left: 45px;
  }
</style>
