<template>
    <div class="cerfiState">
        <div class='cerfiStateTitle' @click="goBack">
            < 返回我的交易
        </div>
      <div class="cerfiStateContent">
        <div style="width: 100%;height: 40px;background: #AA9882;line-height: 40px;padding-left: 15px;box-sizing: border-box">
          抱歉，您需要完成以下全部功能，才可以使用<span style="color: red;">{{title}}</span>提现功能
        </div>
        <!--<certifytitle :title="'抱歉，您需要完成以下全部功能，才可以使用'+ title + '提现功能'"></certifytitle>-->
        <ul>
          <li class="liStyle">
            <div style="color: #999999;">
              <span class="spanStyle" :class="{lightColor:state1}">1、实名认证</span>
              <span class="nobind" style="vertical-align: middle" v-if="state1"><img src="../../../assets/img/certifiOk.png" alt=""></span>
              <span class="nobind" @click="setPerson('certification')" v-if="!state1">立即认证</span>
            </div>
            <div class="divStyle">
              <span v-if="!state1">您尚未完成实名认证，为了您的交易、资金安全，建议您设置实名认证</span>
              <span v-if="state1">您已完成实名认证</span>
            </div>
          </li>
          <li class="liStyle">
            <div style="color: #999999;">
              <span class="spanStyle" :class="{lightColor:state2}">2、手机绑定</span>
              <span class="nobind" style="vertical-align: middle" v-if="state2"><img src="../../../assets/img/certifiOk.png" alt=""></span>
              <span class="nobind" @click="setPerson('bindPhone')" v-if="!state2">立即绑定</span>
            </div>
            <div class="divStyle">
              <span v-if="!state2">您尚未绑定手机，为了您的交易、资金安全，建议您绑定手机</span>
              <span v-if="state2">您已完成手机绑定</span>
            </div>
          </li>
          <li class="liStyle">
            <div style="color: #999999;">
              <span class="spanStyle" :class="{lightColor:state3}">3、设置交易密码</span>
              <span class="nobind" style="vertical-align: middle;"  v-if="state3">
                <img src="../../../assets/img/certifiOk.png" alt="">
              </span>
              <span class="nobind" v-if="!state3" @click="setPerson('setPwd')">立即设置</span>
            </div>
            <div class="divStyle">
              <span v-if="!state3">您尚未设置交易密码，为了您的交易、资金安全，建议您设置交易密码</span>
              <span v-if="state3">您已设置交易密码，可以进行交易</span>
            </div>
          </li>
          <li class="liStyle">
            <div style="color: #999999;">
              <span class="spanStyle" :class="{lightColor:state4}">4、设置绑定银行卡</span>
              <span class="nobind" style="vertical-align: middle;"  v-if="state4">
                <img src="../../../assets/img/certifiOk.png" alt="">
              </span>
              <span class="nobind" v-if="!state4" @click="setPerson('bindBank')">立即绑定</span>
            </div>
            <div class="divStyle">
              <span v-if="!state3">您尚未绑定银行卡，绑定银行卡进行充提交易</span>
              <span v-if="state3">您已绑定银行卡，可以进行充提交易</span>
            </div>
          </li>
        </ul>
      </div>

    </div>
</template>
<script>
  import countCenterRigHeader from '../common/countCenterRigHeader.vue';
  import certifytitle from '../common/certifyTitle.vue';
  export default{
      data(){
          return {
            title:sessionStorage.getItem('mark'),
            state1:1,
            state2:1,
            state3:1,
            state4:1,
          }
      },
      methods:{
        setPerson(type){
          this.$router.push({name:type});
        },
        goBack(){
          this.$router.go(-1)
        },
        certifiState(){
          var that = this;
          this.interFace('user_type',{}).then(function(res){
            that.state2 = res.phone?1:0;
            that.state3 = res.pwdtrade?1:0;
            that.state1 = res.status == 3?1:0;
            that.state4 = res.bank_card?1:0;
          })
        }
      },
      created(){
        this.certifiState()
      },
      components:{
        countCenterRigHeader,certifytitle
      }
  }
</script>
<style scoped>
  .title{
    padding-left:25px;
  }
  .nobind{
    display: inline-block;
    width: 390px;
    text-align: right;
    cursor: pointer;
    color: #CEC6BE;
  }
  .cerfiState{
    color: #CEC6BE;
  }
  .cerfiStateTitle{
    height: 60px;
    padding: 0 30px;
    line-height: 60px;
    font-size: 14px;
    background: #21201A;
    color-rendering: #CEC6BE;
    cursor: pointer;
  }
  .cerfiStateContent{
    padding:26px 30px;
    background: #2C2B27;
    color: #FFFFFF;
  }
  .seleTrue{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
  }
  .liStyle{
    padding: 15px 50px 15px 25px;
    border-bottom: 1px solid #6C6863;
  }
  .spanStyle{
    display: inline-block;
    width: 130px;
  }
  .divStyle{
    margin-top: 10px;
    color: #999999;
  }
  .lightColor{
    color: #FFFFFF;
  }
</style>
