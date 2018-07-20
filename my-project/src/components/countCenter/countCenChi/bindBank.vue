<template>
    <div>
      <contenthead :step="[true,true,true,false]" :stepIndex="1"></contenthead>
      <div class="bank">
        <certifytitle :title="title"></certifytitle>
        <!--<form action="" class="formInputBank" v-if="!bank_card">-->
        <form action="" class="formInputBank" v-if="!$store.state.bank_card">
          <div>
            <input type="text" placeholder="请输入姓名" v-model="form.userName" @input="writeInfo('userName')" readonly>
          </div>
          <div>
            <input type="text" placeholder="请输入身份证" v-model="form.idCard" @input="writeInfo('idCard')" readonly>
          </div>
          <div>
            <input type="text" placeholder="请输入卡号" v-model="form.bankNum" @input="writeInfo('bankNum')">
          </div>
          <div>
            <input type="text" placeholder="请输入银行预留手机号" v-model="form.userPhone" @input="writeInfo('userPhone')">
          </div>
          <div class="codeInputBank">
            <input type="text" placeholder="输入验证码" v-model="form.code" @input="writeInfo('code')">
            <span style="float: right;" class="codeButton">
              <el-button type="primary" :disabled="form.codeDis" @click="getCode">{{sendSureCode}}</el-button>
            </span>
          </div>
          <div class="submitBank">
            <el-button type="primary" :disabled="form.subDis" @click="bindCard">绑定银行卡</el-button>
          </div>
        </form>
        <!--<div style="margin-top: 20px;" v-if="bank_card">-->
        <div style="margin-top: 20px;" v-if="$store.state.bank_card">
          <ul class="bankListStyle">
            <li v-for="item in bankList">
              <span style="display: inline-block;width: 20%;">
                {{item.bankname}}
              </span>
              <span style="display: inline-block;width: 20%;">
                尾号{{item.bank_card}}
              </span>
              <span class="ulListBank">
                <el-button type="primary" @click="boxShow(item.id)">删除</el-button>
              </span>
            </li>
          </ul>
          <div class="addBank">
            <!--<el-button type="primary" @click="bank_card = false;">+  添加银行卡</el-button>-->
            <el-button type="primary" @click="$store.state.bank_card = false">+  添加银行卡</el-button>
          </div>
        </div>
        <el-dialog
          :visible.sync="centerDialogVisible"
          width="40%"
          center>
          <div style="text-align: center;font-size: 16px;">确认删除该银行卡？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureDele">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>
<script>
  import contenthead from '../common/countCenRigHeadCertify.vue';
  import certifytitle from '../common/certifyTitle.vue';
    export default{
        data(){
            return {
              title: '您尚未绑定银行卡，无法进行人民币充提操作',
              form:{
                userName:'',
                bankNum:'',
                userPhone:'',
                code:'',
                codeDis:true,
                subDis:true,
                idCard:''
              },
              sendSureCode:'获取验证码',
              bankList:[],
              centerDialogVisible:false,
              deleteId:'',
              bank_card:false,
              timer:'',
            }
        },
        methods:{
          userType(){
            var that = this;
            this.interFace('user_type').then(function(res){   //status 1:验证通过   0不通过
              that.form.idCard = res.idcard;
              that.form.userName = res.name;
              if(res.bank_card == 1){
                that.$store.state.bank_card = true;
                that.$store.state.user_find_data.bank_card = true;
//                that.bank_card = true;
                that.title = '您已绑定银行卡，请使用以下的银行卡进行资金充提';
                that.select_member_back_card();
              }else{
                that.$store.state.user_find_data.bank_card = false;
                that.$store.state.bank_card = false;
//                that.bank_card = false;
                if(res.idcard){
                  that.form.bankNum = '';
                  that.form.userPhone = '';
                  that.form.code = '';
                }
              }
            })
          },
          boxShow(id){
            this.deleteId = id;
            this.centerDialogVisible = true;
          },
          sureDele(){
            var that = this;
            this.interFace('delete_member_back_card',{
              card_id:this.deleteId
            }).then(function(res){
              if(!res.body){
                that.$notify({
                  title: '删除成功',
                  type: 'success'
                });
                that.centerDialogVisible = false;
              }else{
                that.$notify.error({
                  title: res.body,
                });
              }
              that.userType()
            })
          },
          bindCard(){
            if(!this.form.idCard|| !this.form.userName){
              this.$notify.error({
                title: '请先进行身份认证',
              });
              return;
            }
            var that = this;
            that.form.subDis = true;
            this.interFace('insert_member_back_card',{
              card:this.form.bankNum,
              phone:this.form.userPhone,
              code:this.form.code
            }).then(function(res){
              that.form.subDis = false;
              console.log(res)
              if(!res.body){
                that.$notify({
                  title: '银行卡绑定成功',
                  type: 'success'
                });
                that.form.bankNum = '';
                that.form.userPhone = '';
                that.form.code = '';
                that.userType();
              }else{
                that.$notify.error({
                  title: res.body,
                });
              }
            })
          },
          select_member_back_card(){
            var that = this;
            this.interFace('select_member_back_card',{}).then(function(res){
              that.bankList = res;
            })
          },
          getCode(){
            var that = this;
            this.form.codeDis = true;
            this.interFace('code_member_back_card',{
              phone:this.form.userPhone
            }).then(function(res){
              if(!res.body){
                that.sendSureCode = 60;
                that.timer = setInterval(function(){
                  that.sendSureCode--;
                  if(that.sendSureCode == -1){
                    clearTimeout(that.timer);
                    that.sendSureCode = '发送验证码';
                    that.form.codeDis = false;
                  }
                },1000);
                that.$notify({
                  title: '手机验证码发送成功',
                  type: 'success'
                });
              }else{
                that.$notify.error({
                  title: res.body,
                });
                that.form.codeDis = false;
              }
            })
          },
          reg(){
            console.log(this.regex().code)
            if(this.form.userName && this.form.bankNum && this.regex().phoneReg.test(this.form.userPhone) && this.regex().code.test(this.form.code)){
              this.form.subDis = false;
            }else{
              this.form.subDis = true;
            }
          },
          writeInfo(type){
            switch(type)
            {
              case 'userPhone':
                if(this.regex().phoneReg.test(this.form.userPhone)){
                  this.form.codeDis = false;
                }else{
                  this.form.codeDis = true;
                }
                break;
            }
            this.reg();
          }
        },
        components: {
          contenthead,certifytitle
        },
      created(){
        this.userType()
      }
    }
</script>
<style>
  .bank{
    margin:29px 30px 86px;
    color: #FFFFFF;
  }
  .formInputBank>div{
    width:300px;
    margin-top: 30px;
    height: 38px;
  }
  .formInputBank >div >input{
    width:100%;
    height: 100%;
    padding-left: 10px;
    border-radius: 3px;
    border: none;
    outline: none;
    box-sizing: border-box;
  }
  .formInputBank button{
    width:100%;
    height: 38px;
  }
  .codeInputBank input{
    width:170px!important;
  }
  .codeInputBank{
    margin-bottom: 30px;
  }
  .bankListStyle li{
    padding: 10px;
    border: 1px solid #6C6863;
    border-bottom: none;
  }
  .bankListStyle li:nth-last-of-type(1){
    border-bottom: 1px solid #6C6863;
  }
  .ulListBank{
    display: inline-block;
    width: 55%;
    text-align: right;
  }
  .ulListBank button{
    width:100px;
    height: 30px;
    padding:0;
  }
  .bank .dialog-footer button{
    width: 100px;
  }
  .addBank{
    width:200px;
    height: 40px;
    margin:0 auto;
    margin-top: 30px;
  }
  .addBank button{
    width:100%;
    height: 100%;
    padding:0;
  }
  .codeButton button{
    width:112px;
  }
 .bank .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
   color: #999999;
   background: #4E4C4A;
   border-color:#4E4C4A;
  }
</style>
