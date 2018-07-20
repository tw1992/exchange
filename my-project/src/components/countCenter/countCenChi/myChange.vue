<template>
    <div>
        <ul class="headTab">
          <li :class="{'seleTab':type==='status'}" @click="tab('status')">
            交易记录
          </li>
          <li :class="{'seleTab':type==='orders'}" @click="tab('orders')">
            我的委托
          </li>
        </ul>
        <div style="border-bottom: 2px solid #373631;"></div>
        <div class="seleDemand" style="padding: 0 30px;margin: 20px 0px;">
          <el-select v-model="value" clearable placeholder="请选择" @visible-change="getcurrency_select">
            <el-option
              v-for="item in options"
              :key="item.currency_id"
              :label="item.currency_name + ' '+ item.currency_mark"
              :value="item.currency_id">
            </el-option>
          </el-select>
          <span style="color: #FFFFFF;float: right;" class="picker">
            <span>查询日期</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
            size="small">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              v-model="value2"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
              size="small">
            </el-date-picker>
            <span class="buttrecord">
               <el-button type="primary" @click="search">搜索</el-button>
            </span>

            <!--<button type="button" class="buttrecord" @click="search">-->
              <!--搜索-->
            <!--</button>-->
          </span>
        </div>
        <div>
          <myexrecord :theader="theader" :tbodyer="tbodyerHand" :operation="type==='orders'?true:false" @cancel="cancel">
            <tr slot="nodata" v-if="tbodyerHand.length == 0">
              <td colspan="7" rowspan="5" style="padding: 20px;border: none;">
                <img src="../../../assets/img/nodata.png" alt="">
                <br>
                <span>
                  暂无货币
                </span>
              </td>
            </tr>
          </myexrecord>
        </div>
        <div style="text-align: center;padding-bottom: 30px;" v-if="tbodyerHand.length>0">
          <el-pagination
            background
            @current-change="pagechange"
            :current-page.sync="pagin.current"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="pagin.total*10">
          </el-pagination>
        </div>
    </div>
</template>
<script>
  import '../../../assets/css/select.css';
  import '../../../assets/css/date-picker.css';
  import '../../../assets/css/option.css';
  import '../../../assets/css/icon.css';
  import myexrecord from '../common/myChagneTable.vue';
  import pagination from '../../pagination.vue';
  export default{
    data(){
      return {
        theader:['成交时间','成交类型','成交均价','数量(成交／挂单)','成交额'],
        tbodyerHand:[],
        type:'status',
        pickerOptions1:{
          disabledDate(time){
            return time.getTime() > Date.now();
          }
        },
        pagin:{
          total:0,
          current:1,

        },
        options: [],
        value:'',
        value1: '',
        value2: '',
      }
    },
    methods:{
      tab(type){
        if(type != this.type){
          this.type = type;
          if(type == 'status'){
            this.theader = ['成交时间','成交类型','成交均价','数量(成交／挂单)','成交额'];
          }else{
            this.theader = ['挂单时间','挂单类型','挂单价','挂单数量'];
          }
          this.myExchangePend(0,this.type,'','',0);
        }
      },
      myExchangePend(all,status,stime,etime,list,currency_id){
        var that = this;
        that.interFace('getOrdersMember',{
          type:status,
          stime:stime,
          etime:etime,
          all:all,
          list:list,
          value:10,
          currency_id:currency_id,
        }).then(function(res){
          that.tbodyerHand = res.body;
          that.pagin.total = res.list;
        })
      },
      search(){
        var value1 = this.value1?this.value1.getTime() / 1000:'';
        var value2 = this.value2?this.value2.getTime() / 1000:'';
        this.myExchangePend(0,this.type,value1,value2,this.pagin.current - 1,this.value)
      },
      getcurrency_select(){
        var that = this;
        that.interFace('currency_select',{}).then(function(res){
          that.options = res
        })
      },
      pagechange(data){
        this.pagin.current = data;
        var value1 = this.value1?this.value1.getTime() / 1000:'';
        var value2 = this.value2?this.value2.getTime() / 1000:'';
        this.myExchangePend(0,this.type,value1,value2,this.pagin.current - 1,this.value);
      },
      cancel(){
        var value1 = this.value1?this.value1.getTime() / 1000:'';
        var value2 = this.value2?this.value2.getTime() / 1000:'';
        this.myExchangePend(0,this.type,value1,value2,this.pagin.current - 1,this.value);
      }
    },
    created(){
      this.myExchangePend(0,this.type,'','',this.pagin.current - 1);
    },
    components: {
      myexrecord,pagination
    }
}
</script>
<style>
  *{
    -webkit-text-size-adjust:none;
  }
  .headTab{
    overflow: hidden;
    height: 40px;
    padding:18px 30px 5px 30px;
    box-sizing: border-box;
  }
  .headTab>li{
    display: inline-block;
    color: #908F8C;
    line-height: 19px;
    cursor: pointer;
    margin-right: 71px;
  }
  .seleTab{
    border-bottom:2px solid  #E2CDAA;
    color: #FFFFFF!important;
  }
  .seleDemand > div .el-input--suffix .el-input__inner{
    font-size: 12px!important;
    height: 30px!important;
    width: 160px;
  }
  .picker .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:154px!important;
    border:none!important;
    outline: none;
  }
  .picker .el-date-editor.el-input, .el-date-editor.el-input__inner>input{
    border:none;
    outline: none;
    height: 30px;
  }
  .el-input--small .el-input__inner{
    height:30px;
  }
  .buttrecord button{
    width:80px;
    height: 30px;
    padding-top:0;
    padding-bottom: 0;
    margin-left:10px;
    cursor: pointer;
  }
</style>
