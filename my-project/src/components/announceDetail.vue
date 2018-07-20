<template>
  <div class="content-center margin_center">
    <div class="detail-content">
      <header>
        <div class="detail-title">
          {{datailAll.title}}
        </div>
        <p class="detail-sub-title">
          <span style="padding-right: 20px;">{{datailAll.timeline | time}}</span>
          <span>{{datailAll.author}}</span>
        </p>
      </header>
      <div>
        <img src="" alt="">
      </div>
      <main v-html="datailAll.content"></main>
    </div>
    <tip></tip>
  </div>
</template>
<script>
  import tip from './unsaveTip.vue'
  export default{
    data(){
      return {
        datailAll:{
          content:'',
          intro:'',
          timeline:'',
          title:'',
        }
      }
    },
    methods:{
      detail(){
        var that = this;
        this.interFace('trend_find',{trend_id:that.$route.query.id}).then(function(res){
          that.datailAll = res;
        })
      }
    },
    created(){
      this.detail()
    },
    components:{tip}
  }
</script>
<style>
  .detail-content{
    padding:29px 20px 22px 20px;
    min-height: 550px;
    border: 1px solid #CCCCCC;
    margin-bottom: 30px;
  }
  .detail-content header>div,header>p{
    text-align: center;
  }
  .detail-title{
    font-size: 20px;
    color: #000000;
  }
  .detail-sub-title{
    font-size: 16px;
    color: #A6A6A6;
  }
</style>
