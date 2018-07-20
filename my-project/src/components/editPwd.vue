<template>
  <div class="content-center register">
    <div class="register-top">
      修改密码
    </div>
    <div class="register-content" style="height: 240px;">
      <div>
        <div>
          <span>邮箱</span>
          <input type="text" placeholder="请输入登录邮箱" v-model="regis.email" @blur="onblur('email')" @input="oninput('email')">
          <span v-if="regis.emailTip" class="tipSpan">邮箱格式不正确</span>
        </div>
        <div>
          <span>验证码</span>
          <input type="text" placeholder="请输入验证码" v-model="regis.code" style="width: 190px;" @blur="onblur('code')" @input="oninput('code')">
          <!--<button @click="sendCode" :disabled="regis.codedisable" class="send-code"  :class="{'disableBut':regis.codedisable,'notdisableBut':!regis.codedisable}">{{sendSureCode}}</button>-->
          <span class="send-code">
            <el-button type="primary" :disabled="regis.codedisable" @click="sendCode">{{sendSureCode}}</el-button>
        </span>
          <span v-if="regis.codeTip" class="tipSpan" style="padding-left: 120px;">验证码没有填写</span>
        </div>
        <div>
          <span>新密码</span>
          <input type="password" placeholder="请设置新密码" v-model="regis.pwd" @blur="onblur('pwd')" @input="oninput('pwd')">
          <span v-if="regis.pwdTip" class="tipSpan">密码格式不正确</span>
        </div>
        <div>
          <span>重复密码</span>
          <input type="password" placeholder="再次输入以上密码" v-model="regis.surePwd" @blur="onblur('surePwd')" :readonly="regis.surePwdWrite" @input="oninput('surePwd')">
          <span v-if="regis.surePwdTip" class="tipSpan">密码不一致</span>
        </div>
        <div>
          <span></span>
          <span class="forgetLoginBut">
          <el-button type="primary" :disabled="ableRegister" @click="register">保存</el-button>
        </span>
        </div>
      </div>
    </div>

  </div>
</template>
<style>
</style>
<script>
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
          surePwdWrite:true,
          codedisable:true
        }
      }
    },
    methods:{
      register(){
        var that = this;
        that.interFace('user_pass',{
          email:that.regis.email,
          code:that.regis.code,
          pass:that.regis.pwd,
          invite:that.regis.invite,
        }).then(function(){
          that.$router.push({path: '/countCenter'});
        })
      },
      match(){  //验证函数   注册按钮是否可以点击
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
          this.regis.surePwdWrite = true;
        }else{
          this.regis.pwdTip = false;
          this.regis.surePwdWrite = false;
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
        }else if(type == 'code'){
          clearInterval(window.timer);
          this.sendSureCode = '发送验证码';
        }
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
        this.regis.code = '';
        var that = this;
        if(that.sendSureCode == '发送验证码'){
          that.interFace('user_email_pass',{email:that.regis.email}).then(function (data) {
            if(!data.body){
              that.sendSureCode = 60;
              window.timer = setInterval(function(){
                that.sendSureCode--;
                if(that.sendSureCode == -1){
                  clearInterval(window.timer);
                  that.sendSureCode = '发送验证码';
                }
              },1000);
            }
          })
        }
      }
    }
  }
</script>
<style>
  .register{
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
  .send-code button{
    width: 100px;
    /*float: right;*/
    height: 30px;
    padding:0;
    position: absolute;
    margin-left: 10px;
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
  .forgetLoginBut button{
    width:300px;
    height: 30px;
    padding:0;
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
</style>

