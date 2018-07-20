<template>
  <div>
    <contenthead :step="[true,true,false]"></contenthead>
    <div class="setPwd">
      <certifytitle :title="tiptitle"></certifytitle>
      <form action="" class="formStyleChangePwd">
          <label for="" style="position: relative;">
            <input type="password" placeholder="请输入新密码(6位数字)" v-model="newrepwd" @input="change('repwd')" style="width: 100%;" class="pwdIpnt">
            <div v-if="newrepwdTip" style="position: absolute;top: 22px;left: 10px;color: red;">只支持六位的数字</div>
          </label>
          <label for="" style="position: relative;">
            <input type="password" placeholder="请确认新密码" v-model="suerNewrepwd" @input="change('surepwd')" class="pwdIpnt" style="width: 100%;" :readonly="readyOnly">
            <span v-if="suerNewrepwdTip" style="position: absolute;top: 22px;left: 10px;color: red;">
              两次密码输入不一致
            </span>
          </label>
          <div class="eidtCPwd" style="position: relative;">
            <input type="text" placeholder="请输入验证码" class="pwdIpnt" style="width: 110px;" v-model="code" @input="change('code')">
            <span style="position: absolute;left: 10px;top: 30px;color: red;" v-if="codeTip">请输入四位的验证码</span>
            <el-button type="primary" :disabled="codeDisable" @click="getCode">{{sendSureCode}}</el-button>
          </div>
          <div class="editpwdClass">
            <el-button type="primary" :disabled="disable" @click="subPwd">确认修改</el-button>
          </div>
      </form>
    </div>

  </div>
</template>
<script>
  import contenthead from '../common/countCenRigHeadCertify.vue';
  import certifytitle from '../common/certifyTitle.vue';
  export default{
    data(){
      return {
        pwd:'',
        newrepwd:'',
        newrepwdTip:false,
        suerNewrepwd:'',
        suerNewrepwdTip:false,
        code:'',
        codeTip:false,
        tiptitle:'您已设置安全密码，正在享受安全保障',
        tip:'6位密码，仅支持数字',
        readyOnly:true,
        disable:true,
        codeDisable:false,
        sendSureCode:'发送验证码',
      }
    },
    methods:{
      change(type){
        this.disable = true;
        switch(type)
        {
          case 'repwd':
            this.suerNewrepwdTip = false;
            this.suerNewrepwd = ''
            if(this.regex().exchangePwd.test(this.newrepwd)){
              this.readyOnly = false;
              this.newrepwdTip = false;
            }else{
              this.readyOnly = true;
              this.newrepwdTip = true;
              return
            }
            break;
          case 'surepwd':
            if(/^\d{6}$/.test(this.suerNewrepwd)){
              this.suerNewrepwdTip = false;
            }else{
              this.suerNewrepwdTip = true;
              return
            }
            break;
          case 'code':
            if(/^\d{4}$/.test(this.code)){
              this.codeTip = false;
            }else{
              this.codeTip = true;
              return
            }
            break;
        }
        if(this.newrepwd && this.suerNewrepwd && this.code){
          this.disable = false;
        }
      },
      subPwd(){
        this.disable = true;
        var that = this;
        this.interFace('user_check_passup',{
          pass:that.suerNewrepwd,
          code:this.code
        }).then(function(res){
          that.disable = false;
          that.$alert('交易密码修改成功', '提示', {
            confirmButtonText: '确定',
            lockScroll:false,
            callback: action => {
              that.$router.go(-1)
            }
          })
        })
      },
      getCode(){
        var that = this;
        that.codeDisable = true;
        this.interFace('user_check_email',{}).then(function(res){
          that.sendSureCode = 60;
          window.timer4 = setInterval(function(){
            that.sendSureCode--;
            if(that.sendSureCode == -1){
              clearTimeout(window.timer4);
              that.codeDisable = false;
              that.sendSureCode = '发送验证码';
            }
          },1000);
          that.$notify({
            title: '验证码已经发到邮箱',
            duration: 2000,
            type: 'success'
          });
        })
      }
    },
    components: {
      contenthead,certifytitle
    }
  }
</script>
<style>
  .setPwd{
    margin:28px 30px 72px;
    color:#FFFFFF;
  }
  .formStyleChangePwd{
    width:200px;
    margin:40px auto;
  }
  .pwdIpnt{
    /*width: 100%;*/
    border: none;
    outline: none;
    background: #FFFFFF;
    border-radius: 3px;
    height: 30px;
    margin-bottom: 20px;
    padding-left: 10px;
    box-sizing: border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
  }
  .sureSet{
    width: 200px;
    height: 30px;
    /*background: #C8B297;*/
    border-radius: 3px;
    border: none;
    outline: none;
    /*color: #FFFFFF;*/
  }
  .disable{
    background:#C8B297!important;
    color: #FFFFFF;
  }
  .notdisable{
    background:#6C5E4D!important;
    color: #999999;
  }
  .editpwdClass button{
    width:200px;
    height: 30px;
    line-height: 3px;
    padding-top: 0;
    padding-bottom: 0px;
  }
  .eidtCPwd button{
    padding:0;
    height: 30px;
    float: right;
    width: 80px;
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }

</style>
