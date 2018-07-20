<template>
  <div class="newst content-center margin_center">
    <div style="min-height: 500px;">
      <ul>
        <li v-for="item in list" class="listItem clear" @click="goDetail(item.id,item.url)">
          <img :src="item.photo" alt="" style="float: left;width: 200px;height: 110px;">
          <div class="newst-content">
            <div class="title">{{item.title}}</div>
            <div class="from">{{item.source}}</div>
          </div>
        </li>
      </ul>
      <div style="text-align: center;padding-top: 200px;box-sizing: border-box;" v-if="list.length == 0">
        <img src="../assets/img/nodata.png" alt="">
        <p>暂无消息</p>
      </div>
    </div>
    <div style="text-align: center" v-if="total>0">
      <el-pagination
        background
        @current-change="incrementTotal"
        :current-page.sync="current"
        :page-size="display"
        layout="prev, pager, next, jumper"
        :total="total*10">
      </el-pagination>
    </div>
    <!--<pagination :total="total" :current.sync="current" v-on:pagechange="incrementTotal" :display="display"></pagination>-->
  </div>
</template>
<script>
  import pagination from './pagination.vue';
  export default{
    data(){
      return {
        list:[],
        total: 0,     // 记录总条数
        display:10,   // 每页显示条数
        current: 1
      }
    },
    components:{
      pagination
    },
    methods:{
      reqNewsList(){
        var that = this;
        this.interFace('trend_list',{list:that.current - 1,value:that.display,type:2}).then(function(res){
          console.log(res)
          that.list = res.array;
          that.total = res.list;
        })
      },
      incrementTotal(page){
        this.current = page;
        this.reqNewsList();åå
      },
      goDetail(id,url){
        console.log(url)
        if(url){
          window.open(url)
        }else{
          this.$router.push({path:'/announceDetail',query:{id:id}})
        }
      }
    },
    created(){
      this.reqNewsList();
    }
  }
</script>
<style>
  .newst{
    padding:42px 0;
  }
  .listItem{
    padding:20px;
    border-bottom: 1px solid  #D8D8D8;
    cursor: pointer;
  }
  .newst-content{
    display: inline-block;
    height: 98px;
    vertical-align: top;
    padding:6px 0 6px 29px;
    position: relative;
  }
  .title{
    font-size: 20px;
    color: #222222;
  }
  .from{
    font-size: 14px;
    color: #A6A6A6;
    position: absolute;
    bottom: 0;
  }
</style>
