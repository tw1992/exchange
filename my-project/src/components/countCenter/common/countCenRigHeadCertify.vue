<template>
  <div class="count-r-top">
    <ul class="ul-header">
      <li @click="cycleClick('0')">
        <cycle :sele="step[0]"></cycle>
        <span style="vertical-align: top;">实名认证</span>
      </li>
      <li @click="cycleClick('1')">
        <cycle :sele="step[1]"></cycle>
        <span style="vertical-align: top;">绑定手机</span>
      </li>
      <li @click="cycleClick('2')">
        <cycle :sele="step[2]"></cycle>
        <span style="vertical-align: top;">设置交易密码</span>
      </li>
      <li @click="cycleClick('3')">
        <cycle :sele="step[3]"></cycle>
        <span style="vertical-align: top;">绑定银行卡</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import cycle from './cycle.vue'
  export default{
    props:{
      step:{
        type:Array,
        default:[false,false,false,false]
      },
      stepIndex:{
        default:0
      }
    },
    data(){
      return {}
    },
    methods:{
      cycleClick(index){
        if(index != this.stepIndex){
          if(index == 0){
            this.$router.push({name:'certification'})
          }else if(index == 1){
            this.$router.push({name:'bindPhone'})
          }else if(index == 2){
            this.$router.push({name:'setPwd'})
          }else if(index == 3){
            this.userType('bindBank')
//            this.$router.push({name:'bindBank'})
          }
        }
      },
      userType(type){
        var that = this;
        this.interFace('user_type').then(function(res){   //status 1:验证通过   0不通过
          that.$store.state.bank_card = res.bank_card == 1?true:false;
          that.$router.push({name:type});
        })
      }
    },
    components: {
      cycle
    }
  }
</script>
<style>
  .ul-header{
    font-size: 0;
    height: 100%;

  }
  .ul-header>li{
    display: inline-block;
    width:25%;
    font-size: 12px;
    text-align: center;
    height: 100%;
    cursor: pointer;
  }
  .count-r-top{
    height: 60px;
    background: #21201A;
    color: #CEC6BE;
    padding:20px 30px;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
  }
  .count-r-top>div{
    display: inline-block;
  }
  .count-r-top>span{
    float: right;
    font-size: 14px;
  }
</style>
