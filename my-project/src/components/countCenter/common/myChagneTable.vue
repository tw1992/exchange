<template>
  <div class="count-r-bot">
    <table>
      <tr class="first">
        <td v-for="item in theader">{{item}}</td>
        <td v-if="operation">操作</td>
      </tr>
      <transition-group name="list" tag="tbody" style="text-align: center;" class="mychangeTable">
          <tr v-for="(item,index) in tbodyer" v-if="tbodyer.length" :key="item.orders_id">
            <td>{{item.add_time | time}}</td>
            <td>{{item.type=='buy'?item.area_currency_mark:item.currency_mark}}{{item.type | exchangeType}}{{item.type=='buy'?item.currency_mark:item.area_currency_mark}}</td>
            <td>{{!operation?item.average_price:item.price}}</td>
            <td>{{!operation?item.trade_num + '／' + item.num:item.num - item.trade_num}}</td>
            <td v-if="!operation">{{item.trade_num * item.average_price | point}}</td>
            <td v-if="operation" @click="orders_id(item.orders_id,index)" style="cursor: pointer">撤单</td>
          </tr>
        <!--</tbody>-->
      </transition-group>

      <tfoot>
      <slot name="load"></slot>
      <slot name="nodata"></slot>
      </tfoot>
    </table>
  </div>
  </div>
</template>
<script>
  export default{
    props:{
      theader:{
        default:function(){return ['币名','可用数量','挂单数量','总计','操作']},
      },
      tbodyer:{
        default:function(){
          return []
        }
      },
      operation:{
        default:false,
      }
    },
    data(){
      return {
      }
    },
    methods:{
      orders_id(id,index){  //撤单
        var that = this;
        this.interFace('cancel',{
          order_id:id
        }).then(function(res){
          that.tbodyer.splice(index, 1);
          that.$emit('cancel')
        })
      }
    }
  }
</script>
<style scoped>
  .copyBtn{
    width: 78px;
    height: 21px;
    background: #C8B297;
    border-radius: 1px 3px 3px 3px;
    line-height: 21px;
    float: right;
    margin-top: 10px;
    margin-right: 23px;
    border: none;
    color: #FFFFFF;
  }
  .copyDiv{
    background: #353535;
    height:80px;
    line-height: 40px;
    padding: 0 25px;
  }
  .copyDivSrc{
    display: inline-block;
    float: left;
    text-align: left;
    width: 80%;
  }
  .count-r-bot{
    padding:26px 30px 33px 30px;
    color: #FFFFFF;
    letter-spacing: 0;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
  }
  .count-r-bot>table{
    width:100%;
    border-collapse: collapse;
  }
  .first{
    background: #AA9882;
  }
  .count-r-bot tr{
    height: 40px;
    text-align: center;
  }
  .count-r-bot td{
    border-bottom: 1px solid #6C6863;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .mychangeTable>tr{
    border-bottom: 1px solid  #6C6863;
    height: 40px;
  }
</style>
