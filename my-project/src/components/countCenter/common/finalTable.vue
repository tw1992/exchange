<template>
  <div class="count-r-bot">
    <table>
      <tr class="first">
        <td v-for="item in theader">{{item}}</td>
      </tr>
      <tbody v-for="(item,index) in tbodyer" v-if="tbodyer.length">
      <tr>
        <td>{{item.id}}</td>
        <td v-if="type != 'withdraw'">{{item.currency_mark}}</td>
        <td>{{type == 'withdraw'?item.all_cny:item.num}}</td>
        <td>{{type == 'withdraw'?item.timeline:item.add_time | time}}</td>
        <td v-if="type != 'withdraw'">{{item.status | finalStatus}}</td>
        <td v-if="type == 'withdraw'">{{item.status | withdraw}}</td>
        <td>{{type == 'withdraw'?item.cny:item.actual}}</td>
        <td @click="detail(index)" style="cursor: pointer">详情</td>
      </tr>
      <transition name="datail">
        <tr v-if="item.show" style="height: 40px;background: #353535;">
          <td colspan="7">
            <div style="text-align: right;padding-right: 10px;" v-if="type !='withdraw'">
              {{item.receiver_address}}
            </div>
            <div style="text-align: right;padding-right: 10px;" v-if="type =='withdraw'">
              <span style="padding-right: 20px;">姓名:{{item.name}}</span>
              <span>卡号:{{item.bank_card}}</span>
            </div>
          </td>
        </tr>
      </transition>
      </tbody>
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
      type:{
        type: String,
        default: 'withdraw'
      },
    },
    data(){
      return {
        value:'dflasjdfl',
      }
    },
    methods:{
      detail(index){   //提币
        if(this.tbodyer[index]['show']){
          this.tbodyer[index]['show'] = false;
        }else{
          this.$set(this.tbodyer[index], 'show',true);
        }
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
    padding:26px 0px 33px 0px;
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
  .datail-enter-active, .datail-leave-active {
    transition: opacity .5s
  }
  .datail-enter, .datail-leave-to{
    opacity: 0
  }
  .chTip{
    text-align: left;
    color: red;
  }
</style>
