<template>
  <div>
    <contenthead :step="[true,false,true,true]" :stepIndex="1"></contenthead>
    <div class="phone">
      <certifytitle :title="title"></certifytitle>
      <form action="" class="formStyle" v-if="!$store.state.user_find_data.phone">
        <div>
          <input type="text" placeholder="请输入您的手机号" style="width: 100%;" @input="inputPhone" v-model="phone">
        </div>
        <div class="bottCode">
          <input type="text" placeholder="请输入验证码" style="width: 110px;" v-model="codeCon" @input="inputCode">
          <el-button type="primary" :disabled="disable" @click="code">{{codeTip}}</el-button>
        </div>
      </form>
      <div class="bottOff">
        <el-button type="primary" v-if='$store.state.user_find_data.phone' @click="notBind" :disabled="remove">解除绑定</el-button>
        <el-button type="primary" v-if='!$store.state.user_find_data.phone' @click="submitPC" :disabled="submit">确认绑定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import contenthead from '../common/countCenRigHeadCertify.vue';
  import certifytitle from '../common/certifyTitle.vue';
  export default{
    data(){
      return {
        title:'您尚未绑定手机，绑定手机能更好保障账户安全',
        codeTip:'获取验证码',
        disable:true,
        remove:false,
        status:this.$store.state.bindPhone,
        phone:'',
        codeCon:'',
        submit:true
      }
    },
    components: {
      contenthead,certifytitle
    },
    created(){
      this.userType()
    },
    methods:{
      userType(){
        var that = this;
        this.interFace('user_type').then(function(res){   //status 1:验证通过   0不通过
          if(res.phone == 1){
            that.$store.state.bindPhone = true;
            that.title = '您已经绑定手机（尾号'+ res.phone_value +'），正在享受安全保障，若您需要修改绑定的手机号，请解绑后重新绑定';
          }else{
            that.$store.state.bindPhone = false;
          }
        })
      },
      code(){
        if(this.codeTip == '获取验证码'){
          this.codeTip = 60;
          var that = this;
          this.disable = true;
          this.interFace('user_check_code',{phone:this.phone}).then(function(res){
            window.timer2 = setInterval(function(){
              if(that.codeTip > 1){
                that.codeTip--;
              }else{
                that.codeTip = '获取验证码';
                clearTimeout(window.timer2);
                that.disable = false;
              }
            },1000)
            that.$notify({
              title: '验证码发送成功',
              type: 'success'
            });
          })
        }
      },
      submitPC(){
        var that = this;
        that.submit = true;
        this.interFace('user_check_phone',{phone:this.phone,code:this.codeCon}).then(function(res){
          that.$store.state.bindPhone = 1;
          that.submit = false;
          that.$store.dispatch('user_find');
          that.userType()
        })
      },
      inputPhone(){
        var myreg=this.regex().phoneReg;
        this.codeCon = '';
        clearTimeout(window.timer2);
        this.codeTip = '获取验证码';
        if(myreg.test(this.phone)){
          this.disable = false;
        }else{
          this.disable = true;
          this.submit = true;
        }
      },
      inputCode(){
        var myreg = this.regex().code;
        if(myreg.test(this.codeCon)){
          this.submit = false;
        }else{
          this.submit = true;
        }
      },
      notBind(){
        var that = this;
        this.$confirm('确定要解除绑定手机吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          lockScroll:false,
        }).then(() => {
          that.remove = true;
          that.interFace('user_remove_phone').then(function (res) {
            that.remove = false;
            that.$store.dispatch('user_find');
            that.title = '您尚未绑定手机，绑定手机能更好保障账户安全';
          })
        }).catch(() => {});
      }
    }
  }
</script>
<style scoped>
  .phone{
    margin:29px 30px 86px;
    color: #FFFFFF;
  }
  .formStyle{
    width:200px;
    margin:40px auto 30px;
  }
  .formStyle >div{
    width: 100%;
    margin-bottom: 10px;
  }
  .formStyle input{
    background: #FFFFFF;
    border-radius: 3px;
    height: 30px;
    outline: none;
    border:none;
    padding-left: 10px;
    box-sizing: border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
  }
  .butt{
    width:80px;
    height: 30px;
    float: right;
    border-radius: 3px;
    border: none;
    outline: none;
  }
  .disable{
    background: #6C5E4D!important;
    color: #C8B297!important;
  }
  .able{
    background: #C8B297!important;
    color:#FFFFFF!important;
  }
  .bottOff{
    margin: 30px auto;
    text-align: center;
  }
  .bottOff>button{
    width: 200px;
    height: 30px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .bottCode button{
    width:80px;
    height: 30px;
    float: right;
    line-height: 30px;
    padding:0;
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
</style>
