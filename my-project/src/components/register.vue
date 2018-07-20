<template>
  <div class="content-center registerEmail">
    <div class="register-top">
      注册
    </div>
    <div class="register-content">
      <div>
        <div>
          <span>邮箱</span>
          <input type="text" placeholder="请输入登录邮箱" v-model="regis.email" @blur="onblur('email')" @input="oninput('email')">
          <span v-if="regis.emailTip" class="tipSpan">邮箱格式不正确</span>
        </div>
        <div>
          <span>登录密码</span>
          <input type="password" placeholder="密码长度6-20位" v-model="regis.pwd" @blur="onblur('pwd')" @input="oninput('pwd')">
          <span v-if="regis.pwdTip" class="tipSpan">密码格式不正确</span>
        </div>
        <div>
          <span>重复密码</span>
          <input type="password" placeholder="重复输入密码，两次密码要一致" v-model="regis.surePwd" @blur="onblur('surePwd')" @input="oninput('surePwd')">
          <span v-if="regis.surePwdTip" class="tipSpan">密码不一致</span>
        </div>
        <div>
          <span>验证码</span>
          <input type="text" placeholder="请输入验证码" v-model="regis.code" style="width: 190px;" @blur="onblur('code')" @input="oninput('code')">
          <span class="reSendCode">
              <el-button type="primary" @click="sendCode" :disabled="regis.codedisable">{{sendSureCode}}</el-button>
            </span>
          <span v-if="regis.codeTip" class="tipSpan" style="padding-left: 120px;">验证码没有填写</span>
        </div>
        <div>
          <span>邀请码</span>
          <input type="text" placeholder="请输入邀请码（选填）" v-model="regis.invate">
        </div>
        <div style="margin-top: 30px;cursor: pointer;" class="registerBut">
          <span></span>
          <el-button type="primary" @click="register" :disabled="ableRegister">注册</el-button>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  var timer;
  import qs from 'qs';
  export default{
    data(){
      return {
        ableRegister:true,
        sendSureCode:'发送验证码',
        regis:{
          email:'',
          emailTip:false,
          pwd:'',
          pwdTip:false,
          surePwd:'',
          surePwdTip:false,
          code:'',
          codeTip:false,
          invate:'',
//                surePwdWrite:true,
          codedisable:true
        }
      }
    },
    methods:{
      register(){
        var that = this;
        that.ableRegister = true;
        console.log(that.regis.invate)
        that.interFace('user_registered',{
          email:that.regis.email,
          code:that.regis.code,
          pass:that.regis.pwd,
          invite:that.regis.invate
        }).then(function(data){
          that.ableRegister = false;
          if(!data.body){
            that.$notify({
              title: '注册成功',
              type: 'success'
            });
            that.$router.push({name:'login'})
          }else{
            that.$notify.error({
              title: '注册失败',
            });
          }
        })
      },
      match(){  //验证函数   注册按钮是否可以点击
        console.log(this.regis.pwd)
        var pass = this.regex().email.test(this.regis.email) && this.regex().pwd.test(this.regis.pwd) && (this.regis.pwd == this.regis.surePwd) && Boolean(this.regis.code);
        return pass;
      },
      matchEmail(){
        var matchEmain = this.regex().email.test(this.regis.email);
        if(!matchEmain){
          this.regis.emailTip = true;
          this.regis.codedisable = true;
        }else{
          this.regis.codedisable = false;
          this.regis.emailTip = false;
        }
      },
      matchPwd(){
        var matchPwd = this.regex().pwd.test(this.regis.pwd);
        if(!matchPwd){
          this.regis.pwdTip = true;
        }else{
          this.regis.pwdTip = false;
          if(this.regis.pwd == this.regis.surePwd){
            this.regis.surePwdTip = false;
          }else{
            this.regis.surePwdTip = true;
          }
        }
      },
      matchSurePwd(){
        if(this.regis.pwd !== this.regis.surePwd){
          this.regis.surePwdTip = true;
        }else{
          this.regis.surePwdTip = false;
        }
      },
      oninput(type){
        if(type == 'email'){
          this.matchEmail()
        }else if(type == 'pwd'){
          this.matchPwd()
        }else if(type == 'surePwd'){
          this.matchSurePwd()
        }else if(type == 'code'){}
        this.ableRegister = !this.match();
      },
      onblur(type){
        if(type == 'email'){
          this.matchEmail()
        }else if(type == 'pwd'){
          this.matchPwd()
        }else if(type == 'surePwd'){
          this.matchSurePwd()
        }else if(type == 'code'){}
        this.ableRegister = !this.match();
      },
      sendCode(){
        var that = this;
        that.regis.codedisable = true;
        if(that.sendSureCode == '发送验证码'){
          that.interFace('user_email',{email:that.regis.email}).then(function (data) {
            console.log(data)
            if(!data.body){
              that.sendSureCode = 60;
              timer = setInterval(function(){
                that.sendSureCode--;
                if(that.sendSureCode == -1){
                  clearTimeout(timer);
                  that.sendSureCode = '发送验证码';
                  that.regis.codedisable = false;
                }
              },1000);
              that.$notify({
                title: '邮箱验证码发送成功',
                type: 'success'
              });
            }else{
              that.regis.codedisable = false;
            }
          })
        }
      }
    },
    created(){
      if(this.$route.params.code){
        this.regis.invate = this.$route.params.code;
      }
    }
  }
</script>
<style>
  .registerEmail{
    background: #2C2B27;
    margin:0 auto;
    margin-top: 32px!important;
    margin-bottom: 128px!important;
  }
  .register-top{
    text-align: center;
    font-size: 24px;
    color: #FFFFFF;
    background: #21201A;
    padding:10px;
  }
  .register-content{
    padding:75px 0px 95px 0px;
    color: #FFFFFF;
    position: relative;
    height: 270px;
  }
  .register-content>div{
    position: absolute;
    left: 30%;
  }
  .register-content>div>div{
    margin-bottom: 10px;
  }
  .register-content>div>div>span:nth-of-type(1){
    display: inline-block;
    width:78px;
    height: 17px;
    padding-right:14px;
    box-sizing: border-box;
    text-align: justify;
    text-align-last: justify; /* ie9*/
    -moz-text-align-last: justify; /*ff*/
    -webkit-text-align-last: justify; /*chrome 20+*/
  }
  .register-content input{
    width:300px;
    height: 30px;
    border:none;
    border-radius: 3px;
    outline: none;
    padding-left:11.5px;
    box-sizing: border-box;
  }
  .disableBut{
    background: #6C5E4D;
    color: #999999;
  }
  .notdisableBut{
    background: #C5B39B;
    color: #FFFFFF;
  }
  .tipSpan{
    color: red;
  }
  .registerBut button{
    width:300px;
    height: 30px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .reSendCode button{
    height: 30px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    float: right;
    position: absolute;
    margin-left: 10px;
    width:100px;
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
</style>
