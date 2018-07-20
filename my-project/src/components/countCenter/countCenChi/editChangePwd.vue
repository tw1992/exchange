<template>
  <div>
    <contenthead :step="[true,true,false]"></contenthead>
    <div class="setPwd">
      <certifytitle :title="tiptitle"></certifytitle>
      <form action="" class="formStyleEditPwd">
        <div v-if="!success">
          <label for="">
            <input type="password" placeholder="请输入原密码" v-model="pwd" @input="change('pwd')">
          </label>
          <label for="">
            <input type="password" placeholder="请输入新密码(6位数字)" v-model="newrepwd" @input="change('repwd')">
            <div v-if="newrepwdTip">只支持六位的数字</div>
          </label>
          <label for="">
            <input type="password" placeholder="请确认新密码" v-model="suerNewrepwd" @input="change('surepwd')">
            <div v-if="suerNewrepwdTip">两次密码输入不一致</div>
          </label>
          <div class="editpwdClass">
            <el-button type="primary" :disabled="disable" @click="subPwd">确认设置</el-button>
          </div>
          <div>
            <span style="cursor: pointer;float: right;margin-top: 5px;" @click="forGetPwd">忘记交易密码</span>
          </div>
        </div>
        <div style="text-align: center" v-if="success">
          <img src="../../../assets/img/success.png" alt="">
          <div>
            恭喜您，交易密码设置成功！
          </div>
        </div>
      </form>
      <div style="text-align: center;padding-top: 17px;border-top: 1px solid #373631;">
        设置密码后，涉及资金变动等敏感操作可能将需要验证您的安全密码，以保障您的账户安全
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
        pwd:'',
        newrepwd:'',
        newrepwdTip:false,
        suerNewrepwd:'',
        suerNewrepwdTip:false,
        tiptitle:'您已设置安全密码，正在享受安全保障',
        tip:'6位密码，仅支持数字',
        readyOnly:true,
        disable:true,
        success:false,
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
            if(/^\d{6}$/.test(this.newrepwd)){
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
        }
        if(this.newrepwd && this.suerNewrepwd && this.pwd){
          this.disable = false;
        }
      },
      forGetPwd(){
        this.$router.push({
          name:'forgetChangePwd'
        })
      },
      subPwd(){
        this.disable = true;
        var that = this;
        this.interFace('user_check_pass',{
          pass:that.suerNewrepwd,
          first_pass:that.pwd
        }).then(function(res){
          console.log(res)
          that.disable = false;
          if(res.body){
            that.$notify.error({
              title: res.body,
            });
          }else{
            that.$store.dispatch('user_find');
            that.tiptitle = '您已设置安全密码，正在享受安全保障';
            that.success = true;
          }
        })
      },
      editPwd(){
        this.bind = false;
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
  .formStyleEditPwd{
    width:200px;
    margin:40px auto;
  }
  .formStyleEditPwd label{
    position: relative;
  }
  .formStyleEditPwd label div{
    position: absolute;
    top: 22px;
    left:10px;
    color: red;
  }
  .formStyleEditPwd input{
    width: 100%;
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
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0px;
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
</style>
