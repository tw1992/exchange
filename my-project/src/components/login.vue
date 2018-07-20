<template>
  <div class="login content-center margin_center">
    <div class="login-img">
      <img src="../assets/img/logo.png" alt="">
    </div>
    <div class="login-content">
      <div style="border: 1px solid #FFFFFF;padding: 80px 0 60px 0;">
        <div class="input-content">
          <input type="text" placeholder="请输入邮箱或手机号" @input="regEmail('email')" v-model="email" style="margin-bottom: 10px;padding-left: 20px;box-sizing:border-box;
    -moz-box-sizing:border-box;-webkit-box-sizing:border-box;">
          <input type="password" placeholder="请输入密码" v-model="pwd" style="margin-bottom: 30px;padding-left: 20px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;" @keyup="regEmail($event)" >
          <div class="loginBut">
            <el-button type="primary" @click="login" :disabled="disable">登录</el-button>
          </div>
          <div class="confirm">
                <span>
                 <el-checkbox v-model="checked" @change="changeCheck"><span style="color: #FFFFFF;">记住登录名</span></el-checkbox>
                </span>
            <span style="float: right;cursor: pointer;">
                  <span @click="toToPage('forget')">忘记密码</span>
                  <span>|</span>
                  <span @click="toToPage()">立即注册</span>
                </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        email:'',
        emailTip:false,
        pwd:'',
        pwdTip:false,
        disable:false,
        checked:false
      }
    },
    methods:{
      regEmail(data){
        if(data.keyCode == 13){
          this.login();
        }
      },
      login(){
        var that = this;
        if((this.regex().email.test(this.email) || this.regex().phoneReg.test(this.email)) && this.pwd) {
          that.disable = true;
          this.interFace('user_login', {
            email: that.email,
            pass: that.pwd
          }).then(function (data) {
            that.disable = false;
            if (!data.body) {
              sessionStorage.setItem('loginState', 1);
              if (that.checked) {
                var loginName = that.email
                localStorage.setItem('menmerState', loginName);
              }
              that.$router.push({path: '/countCenter'});
            } else {
              sessionStorage.setItem('loginState', 0);
            }
          })
        }else{
          if(!(this.regex().email.test(this.email) || this.regex().phoneReg.test(this.email))){
            this.$message.error("邮箱或手机号不合法");
          }else if(!this.pwd){
            this.$message.error("请输入密码");
          }
        }
      },
      toToPage(data){
        if(data == 'forget'){
          this.$router.push({path:'/editPwd'});
        }else{
          this.$router.push({path:'/register'});
        }
      },
      changeCheck(){
        localStorage.clear();
        if(this.checked){
          if(sessionStorage.getItem('loginState') == 1){
            if(this.email){
              var loginName = this.email
              localStorage.setItem('menmerState',loginName);
            }
          }
        }
      }
    },
    created(){
      var menmerState = localStorage.getItem('menmerState');
      if(menmerState){
        this.checked = true;
        this.email = menmerState;
      }else {
        this.checked = false;
      }

    }
  }
</script>
<style scoped>
  .login{
    margin-bottom:128px!important;
    background: #2C2B27;
  }
  .login-img{
    text-align: center;
    padding-top: 63px;
    padding-bottom: 55px;
  }
  .login-img>img{
    display: block;
    margin:0 auto;
  }
  .login-content{
    width:680px;
    margin:0 auto;
    padding-bottom:127px;
    text-align: center;
  }
  .input-content{
    text-align: left;
    position: relative;
  }
  .input-content>input,.input-content>div{
    width: 100%;
    height: 30px;
    border-radius: 3px;
    border:0;
    outline: none;
  }
  .input-content{
    display: inline-block;
    width: 340px;
    vertical-align: top;
  }
  .qrcode{
    display: inline-block;
    width: 100px;
    color: white;
  }
  .qrcode-content{
    height: 100px;
    background: white;
    margin-bottom: 5px;
  }
  .confirm{
    color: #FFFFFF;
  }
  .disableLogin{
    background: #C5B39B;
    color: #FFFFFF;
  }
  .ableLogin{
    background: #6C5E4D;
    color: #999999;
  }
  .loginBut button{
    height: 30px;
    width: 340px;
    padding-bottom: 0;
    padding-top: 0px;
    line-height: 30px;
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
</style>
