<template>
  <div v-loading="loading">
    <countCenterRigHeader>
      <div>
        <span style="font-size: 14px;">
         我的数字资产一览
        </span>
        <input type="checkbox" @change="show = !show">
        <span>隐藏零余额币种</span>
      </div>
      <span v-if="evalute || evalute === 0">资产总值估算：{{evalute}} CCC</span>
    </countCenterRigHeader>
    <myPropertyTable :tbodyer="tbodyerHand" :money="evalute" @update="updata">
      <tr slot="nodata" v-if="tbodyerHand.length == 0">
        <td colspan="7" rowspan="5" style="padding: 20px;border: none;">
          <img src="../../../assets/img/nodata.png" alt="">
          <br>
          <span>
            暂无货币
          </span>
        </td>
      </tr>
    </myPropertyTable>
  </div>
</template>
<style>
  .table{
    color: #FFFFFF;
    margin:36px 30px;
    box-sizing: border-box;
  }
</style>
<script>
  import countCenterRigHeader from '../common/countCenterRigHeader.vue';
  import myPropertyTable from '../common/myPropertyTable.vue';
  export default{
    data(){
      return {
        tbodyer:[],
        show:true,
        evalute:0,
        loading:true
      }
    },
    computed: {
      tbodyerHand: function () {
        if(this.show){
          return this.tbodyer;
        }else{
          return this.tbodyer.filter(function(data){
            return data.num > 0;
          })
        }
      }
    },
    methods:{
      list(){
        var that = this;
        that.interFace('pay_money',{}).then(function(res){
          that.loading = false;
          var is_legal = [];
          var legal = [];
          for(var i = 0;i<res.array.length;i++){
            if(res.array[i].is_legal == 1){
              is_legal.push(res.array[i])
            }else{
              legal.push(res.array[i])
            }
          }
          is_legal = is_legal.sort(function(a,b){
            return b.sort_id - a.sort_id;
          })
          legal = legal.sort(function(a,b){
            return b.sort_id - a.sort_id;
          })
          that.tbodyer = is_legal.concat(legal);
          that.$store.state.myPropertyStore = is_legal.concat(legal);
          that.evalute = res.money;
        })
      },
      updata(){
        this.list()
      }
    },
    created(){
      this.list()
    },
    components:{
      countCenterRigHeader,myPropertyTable
    }
  }
</script>
