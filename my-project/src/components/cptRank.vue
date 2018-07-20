<template>
  <div style="min-height: 500px;">
    <div>
      <img src="/exchange/static/js/img/rankLogo.jpg" alt="" style="width: 100%;">
    </div>
    <div class="rank margin_center content-center">
      <div class="rankTop">
        <span class="rankInputRig">
          <span style="color: #FFFFFF;margin: 0 10px;">
            邮箱
          </span>
          <span style="width: 230px;display: inline-block">
            <el-input v-model="query2" placeholder="根据邮箱搜索" clearable @input="query('email')"></el-input>
          </span>
        </span>
      </div>
      <table class="rankTable">
        <tr>
          <td>
            名次
          </td>
          <td>
            邮箱
          </td>
          <td>
            成交CPT数量
          </td>
        </tr>
        <tr v-for="(item, index) in listcomputed" :key="item.rank">
          <td>
            {{item.rank}}
          </td>
          <td>
            {{item.email | hideEmail}}
          </td>
          <td>
            {{item.value}}
          </td>
        </tr>
      </table>
      <div style="text-align: center;margin-top: 35px;" v-if="page.total > 0">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="page.current"
          :page-size="page.size"
          layout="prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        list: [],
        listcomputed:[],
        page:{
          current:1,
          total:0,
          size:20
        },
        query2: '',
      }
    },
    methods:{
      computedList:function(){
        var vm = this;
        this.listFilter = this.list.filter(function (item) {
          if(vm.query2){
            return item.email.indexOf(vm.query2) !== -1;
          }else{
            return item.email;
          }
        });
        this.page.total = this.listFilter.length;
        this.listFilter = this.listFilter.slice((vm.page.current-1) * vm.page.size,vm.page.current * vm.page.size);
        return this.listFilter;
      },
      query(type){
        this.listcomputed = this.computedList();
      },
      handleCurrentChange(data){
        this.page.current = data;
        this.listcomputed = this.computedList();
      },
      orders_ranking(){
        var that = this;
        that.interFace('orders_ranking',{}).then(function(res){
          that.page.total = res.ranking.length;
          that.list = res.ranking;
          that.listcomputed = that.computedList();
        })
      }
    },
    created(){
      this.orders_ranking()
    }
  }
</script>
<style>
  .rankTop{
    margin-bottom: 20px;
  }
  .rank{
    padding:30px;
    box-sizing: border-box;
    background: #2C2B27;
  }
  .rankTable{
    width: 100%;
    border-collapse: collapse;
    color: #FFFFFF;
  }
  .rankTable tr{
    height: 40px;
    border-bottom: 1px solid #6C6863;
  }
  .rankTable td{
    text-align: center;
  }
  .rankTable tr:nth-of-type(1){
    background: #AA9882;
  }
  .rankInput{
    width: 188px;
    display: inline-block
  }
  .rankInput input{
    height: 30px;
  }
  .rankInputRig{
    width: 393px;
    display: inline-block;
    /*float: right;*/
  }
  .rankInputRig input{
    height: 30px;
  }
  .rankInput .el-input,.rankInputRig .el-input{
    font-size: 12px;
  }
</style>
