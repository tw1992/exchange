<template>
    <div>
      <countCenterRigHeader>
        <div style="color: #FFFFFF;">
          <ul>
            <li style="display: inline-block;cursor: pointer;margin-right: 20px;">
              <span style="padding-bottom: 8px;" :class="{'showBorder':type == 'final'}" @click="tab('final')">充提记录</span>
            </li>
            <li style="display: inline-block;cursor: pointer;">
              <span style="padding-bottom: 8px;" :class="{'showBorder':type == 'withdraw'}" @click="tab('withdraw')">提现记录</span>
            </li>
          </ul>
        </div>
      </countCenterRigHeader>
      <div class="recordTable" v-loading="loading">
        <finalTable :theader="theader" :tbodyer="tbodyer" :type="type">
          <tr slot="nodata" v-if="tbodyer.length == 0">
            <td colspan="7" rowspan="5" style="padding: 20px;border: none;">
              <img src="../../../assets/img/nodata.png" alt="">
              <br>
              <span>
                暂无记录
              </span>
            </td>
          </tr>
        </finalTable>
      </div>
      <div style="text-align: center;padding-bottom: 30px;" v-if="pagin.total">
        <el-pagination
          background
          @current-change="pagechange"
          :current-page.sync="pagin.current"
          :page-size="pagin.value"
          layout="prev, pager, next, jumper"
          :total="pagin.total">
        </el-pagination>
      </div>

    </div>
</template>
<style>
  .recordTable{
    margin:20px 30px;
  }
  .showBorder{
    border-bottom: 2px solid  #E2CDAA;
  }
</style>
<script>
  import countCenterRigHeader from '../common/countCenterRigHeader.vue';
  import myPropertyTable from '../common/myPropertyTable.vue';
  import finalTable from '../common/finalTable.vue';
  import pagination from '../../pagination.vue';
  export default{
    data(){
        return {
          theader:['订单号','币种','订单金额','时间','状态','实际到账金额','操作'],
          tbodyer:[],
          pagin:{
            total:0,
            current:1,
            value:10,//每一页的数量
          },
          type:'final',
          loading:true
        }
    },
    components: {
      countCenterRigHeader,finalTable,pagination
    },
    created(){
      this.myDeal();
    },
    methods:{
      myDeal(){
        var that = this;
        that.interFace('myDeal',{
          list:that.pagin.current - 1,
          value:that.pagin.value,
          all: 0
        }).then(function(res){
          that.loading = false;
          that.tbodyer = res.body;
          that.pagin.total = res.list;
          console.log(that.theader)
        })
      },
      withdraw_list(){
        var that = this;
        this.interFace('withdraw_list',{
          list:that.pagin.current - 1,
          value:that.pagin.value
        }).then(function(res){
          that.loading = false;
          that.tbodyer = res.array;
          that.pagin.total = res.list;
        })
      },
      pagechange(data){
        this.pagin.current = data;
        if(this.type == 'withdraw'){
          this.withdraw_list();
        }else{
          this.myDeal();
        }
      },
      tab(type){
        if(type != this.type){
          this.type = type;
          this.loading = true;
          if(this.pagin.current == 1){
            if(type == 'withdraw'){
              this.theader = ['订单号','订单金额','时间','状态','实际到账金额','操作'];
              this.withdraw_list();
            }else{
              this.theader = ['订单号','币种','订单金额','时间','状态','实际到账金额','操作'];
              this.myDeal();
            }
          }else{
            this.pagin.current = 1;
          }
        }
      }
    }
  }
</script>
