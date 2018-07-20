<template>
    <div class="outcurrency">
      <countCenterRigHeader>
        <div class="back" @click="backMyPro">< 返回我的资产</div>
        <span style="font-size: 14px;" v-if="$route.params.evalute">资产总值估算：{{$route.params.evalute}} CCC</span>
      </countCenterRigHeader>
      <div class="currency">
        <myPropertyTitle :title="title">
          <span style="float: right;margin-right: 20px;color: #FFFFFF;">
            可用数量:{{ableNum}}
          </span>
        </myPropertyTitle>
        <form action="">
          <div style="margin-bottom: 20px;height: 30px;line-height: 30px;position: relative;width: 371px;color: white;">
            <span style="float: left;margin-right: 10px;">提币地址</span>
            <span class="inputDiv">
              <input type="text"  @input="input('address')" v-model="address" class="inputFirst" @blur="tiList = false" @focus="tiList = true">
              <span style="float: right;position: relative;width: 36px;">
                 <span style="display: inline-block;border: 1px solid #BBBBBB;
    height: 20px;top: 5px;position: absolute;box-sizing: border-box;left: 0;"></span>
                 <img src="../../../assets/img/address.png" style="position: absolute;top: 5px;right: 10px;" alt="" @click="tiList = !tiList">
              </span>
            </span>
            <transition name="fade">
              <div class="liList" v-if="tiList">
                <ul>
                  <li style="border-bottom: 1px solid #CCCCCC;height: 30px;cursor: pointer;" @click="goAddAddress">
                    <span style="display: inline-block;width: 16px;height: 16px;border-radius: 50%;background: #AA9882;color: #FFFFFF;line-height: 14px;text-align: center;margin-left: 10px;">+</span>
                    <span style="color: #AA9882;">添加新的地址</span>
                  </li>
                  <li style="color: #AA9882;padding: 0 10px;" v-for="item in addressList" class="addresslistLi">
                    <span @click="address = item.qianbao_url;tiList = false;disable=!valid()" style="cursor: pointer">{{item.qianbao_url | cutOut(20)}}</span>
                    <span>
                      {{item.name | cutOut(3)}}地址
                    </span>
                    <span @click="delate(item.id)" style="cursor: pointer;">
                      删除
                    </span>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
          <label for="">
            <span>提币数量</span>
            <input type="number" maxlength="10" @input="input('num')" v-model="num">
          </label>
          <label for="">
            <span>交易密码</span>
            <input type="password" @input="input('pwd')" v-model="pwd" placeholder="请输入六位的数字密码">
            <span style="position: absolute;left: 72px;top: 30px;color: red;" v-if="pwdValid">请输入六位的数字密码</span>
            <span class="butt">
               <el-button type="primary" @click="sureCurrency" :disabled="disable">
                 确认
               </el-button>
            </span>
          </label>
          <div style="color: red;">
            友情提示：禁止向除{{$route.params.mark}}之外的其他资产转出，任何非{{$route.params.mark}}资产转出将不可找回
          </div>
        </form>
      </div>
      <el-dialog
        :title="'添加'+ $route.params.mark +'地址'"
        :visible.sync="dialogVisible"
        :lock-scroll="false"
        width="600px">
        <div>
          <form action="" style="width: 400px;margin: 0 auto;" class="dialogForm">
            <label for="">
              <span class="labelLeft">
                接收地址
              </span>
              <input type="text" placeholder="请填写正确的接收地址" class="labelRig" v-model="address" @input="addressInput">
            </label>
            <label>
              <span class="labelLeft">
                地址昵称
              </span>
              <input type="text" placeholder="请输入地址昵称" class="labelRig" v-model="name" @input="addressInput('addressInput')">
              <span class="addressTip" v-if="nickname">最多输入10个字符</span>
            </label>
            <div class="submitAddress" @click="addAddressCom">
              <el-button type="primary" :disabled="addDisable">添加</el-button>
            </div>
          </form>
          <div style="text-align: center;margin-top: 20px;color: red;">
            友情提示：禁止向除{{$route.params.mark}}之外的其他资产转出，任何非{{$route.params.mark}}资产转出将不可找回
          </div>
        </div>
      </el-dialog>
      <div class="tipBut">
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible1"
          width="30%">
          <span>你确定删除吗？</span>
          <span slot="footer" class="dialog-footer">
          <div>
             <el-button @click="dialogVisible1 = false">取 消</el-button>
             <el-button type="primary" @click="sureDelete">确 定</el-button>
          </div>
        </span>
        </el-dialog>
      </div>

    </div>
</template>
<script>
    import countCenterRigHeader from '../common/countCenterRigHeader.vue';
    import myPropertyTitle from '../common/certifyTitle.vue';
    export default{
      data(){
        return {
          code1:'',
          codeTip1:'短信验证',
          title: '',
          type:'BTC',
          disable:true,
          pwd:'',
          address:'',
          num:'',
          addressList:[],
          dialogVisible:false,//弹框控制
          dialogVisible1:false,//弹框控制
          safePwd:'',
          name:'',
          codeTip:'短信验证',
          code:'',
          addDisable:true,
          addAddressId:'',
          tiList:false,
          deleteId:'',
          codeDisalbed:false,
          codeDisalbed1:false,
          str:false,
          nickname:false,
          pwdValid:false,//密码格式提示
          ableNum:0
        }
      },
      beforeRouteLeave(to,from,next){
          sessionStorage.removeItem('currency_fee');
          next();
      },
      methods:{
        seleAddress(){   //点击图标  选择提币地址
          var that = this;
          sessionStorage.setItem("mark", that.$route.params.mark);
            this.interFace('select_currency_url',{
              currency_id:that.$route.params.id
            }).then(function(res){
              that.addressList = res;
            })
        },
        valid(){
          var judge = this.pwd && this.address && this.num;  //都有值  按钮可以点击
          if(judge){
            return true;
          }
          return false;
        },
        input(type){
          console.log(type)
          switch(type){
            case 'pwd':
              if(this.regex().exchangePwd.test(this.pwd)){
                this.pwdValid = false;
              }else{
                this.pwdValid = true;
              }
              break;
          }
          if(this.valid()){
            this.disable = false;
          }else{
            this.disable = true;
          }
        },
        sureCurrency(){
          var that = this;
          that.disable = true;
          this.interFace('tcoin',{
            currency_id:that.$route.params.id,
            num:that.num,
            url:that.address,
            pwdtrade:that.pwd
          }).then(function(res){
            that.disable = false;
            if(!res.body){
              that.$notify({
                title: '提币成功',
                type: 'success',
                duration:2000
              });
              that.num = '';
              that.address = '';
              that.code1 = '';
              that.pwd = '';
            }else{
              that.$notify.error({
                title: '提币失败',
              });
            }
          })
        },
        addressInput(type){
          switch(type)
          {
            case 'addressInput':
              this.nickname = this.name.length>10?true:false;
              this.name = this.name.length>10?this.name.slice(0,10):this.name;
              if(this.nickname)return;
              break;
          }
          if(this.name && this.address){
            this.addDisable = false;
          }else{
            this.addDisable = true;
          }
        },
        addAddressCom(){
          var that = this;
          that.addDisable = true;
          this.interFace('insert_currency_url',{
            currency_id:this.$route.params.id,
            url:that.address,
            name:that.name,
          }).then(function(res){
            that.addDisable = false;
            that.dialogVisible = false;
            that.tiList = false;
            that.$notify({
              title: '添加地址成功',
              type: 'success',
              duration:2000
            });
            that.seleAddress();
          })
        },
        backMyPro(){
          this.$router.push({name:'countCenter'})
        },
        delate(id){
          this.dialogVisible1 = true;
          this.deleteId = id;
        },
        sureDelete(){
          var that = this;
          this.dialogVisible1 = false;
          this.interFace('delete_currency_url',{
            id:that.deleteId
          }).then(function(res){
            function match(){
              for(var i = 0;i<that.addressList.length;i++){
                if(that.addressList[i].id == that.deleteId){
                  break;
                }
              }
              return i;
            }
            that.addressList.splice(match(),1)
            that.$notify({
              title: '删除成功',
              type: 'success',
              duration:2000
            });
            that.seleAddress();
          })
        },
        goAddAddress(id){
          this.dialogVisible = true;
        }
      },
      created(){
        this.seleAddress();
        this.title = '提币'+this.$route.params.mark +'   '+ '手续费：'+sessionStorage.getItem('currency_fee') + ' + 矿工费';
        sessionStorage.getItem('currency_fee');
        this.ableNum = sessionStorage.getItem('ableNum')
      },
      components:{countCenterRigHeader,myPropertyTitle}
    }
</script>
<style>
  .outcurrency .el-dialog__header{
    border-bottom:1px solid #CCCCCC;
  }
  .back{
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
  }
  .currency{
    margin:26px 30px 74px 30px;
  }
  .outcurrency form{
    margin:22px 10px;
  }
  .currency label{
    display: block;
    color: #FFFFFF;
  }
  .currency label>input,.tCodeInput{
    width: 300px;
    height: 30px;
    border:none!important;
    padding:0 0 0 10px;
    box-sizing: border-box;
    outline: none;
    border-radius: 3px;
    margin-bottom: 20px;
  }
  .currency label>span{
    display: inline-block;
    margin-right: 10px;
  }
  .currency .butt{
    width: 160px;
    height: 30px;
    float: right;
    border-radius: 3px;
    outline: none;
    border: none;
  }
  .butt button{
    width: 160px;
    height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .currency .inputDiv{
    float: left;
    background: #FFFFFF;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    display: inline-block;
    width: 300px;
    margin-left: 3px;
    height: 30px;
  }
  .inputDiv>input{
    padding-left:10px;
  }
  .inputFirst{
    border: none;
    outline: none;
    height: 30px;
    width: 250px;
    position: absolute;
  }
  .currency .disable{
    color: #999999;
    background: #6C5E4D;
  }
  .currency .able{
    color: #FFFFFF;
    background: #C5B39B;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
     -webkit-appearance: none !important;
    margin: 0;
  }
  .labelLeft{
    display: inline-block;
    text-align: right;
    width:80px;
    color:#292929;
  }
  .labelRig{
    width:300px;
    height: 100%;
     -webkit-border-radius:3px;
     -moz-border-radius:3px;
    border-radius:3px;
    border:1px solid #999999;
    outline: none;
    padding-left:10px;
    box-sizing: border-box;
  }
  .dialogForm label{
    height: 30px;
    display: block;
    margin-bottom: 20px;
  }
  .codeLable button{
    width:86px;
    height: 30px;
    outline: none;
    padding:0;
  }
  .submitAddress button{
    width: 300px;
    height:30px;
    padding:0;
    margin-left:83px ;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .addresslistLi >span{
    display: inline-block;
  }
  .addresslistLi >span:nth-of-type(1){
    width: 170px;
  }
  .addresslistLi >span:nth-of-type(2){
    width: 70px;
  }
  .liList{
    background: #FFFFFF;
    position: absolute;
    top: 37px;
    left: 70px;
    width: 300px;
    border-radius: 5px;
  }
  .liList li{
    border-bottom:1px solid #CCCCCC;
  }
  .tipBut button{
    height: 30px;
    line-height: 30px;
    padding:0 20px;
  }
  .tipBut  .el-dialog__header{
    border-bottom: none!important;
  }
  .addressTip{
    display: inline-block;
    margin-left: 94px;
    color: red;
  }
  .tCode button{
    width: 80px;
    height: 30px;
    padding: 0;
    /*padding-bottom: 0;*/
    float: right;
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
</style>
