<template>
  <div class="count-r-bot">
    <table>
      <tr class="first">
        <td v-for="item in theader">{{item}}</td>
      </tr>
      <tbody v-for="(item,index) in tbodyer" v-if="tbodyer.length" class="aaa">
        <tr>
          <td style="width: 160px;text-align: left;"><img :src="item.currency_logo" alt="" style="width: 18px;height:18px;vertical-align: text-bottom;margin-left: 25px;margin-right: 10px;">{{item.currency_name}}{{item.currency_mark}}</td>
          <td>{{item.num}}</td>
          <td>{{item.forzen_num}}</td>
          <td>{{item.num*1 + item.forzen_num*1 | point}}</td>
          <td v-if="item.is_legal == 1 && item.currency_mark == 'CCC'" style="cursor: pointer;color:#CEC6BE" class="chTi">
            <el-button @click="pushBank('ch',item)" type="primary">充值</el-button>
            <el-button @click="pushBank('ti',item)" type="primary">提现</el-button>
          </td>
          <td class="chTi" v-if="item.is_legal != 1 || item.currency_mark == 'ccc'">
              <el-button @click="charge(index,item,'ch')" :disabled='item.is_rech == 0' type="primary">充币</el-button>
              <el-button @click="charge(index,item,'ti',item.currency_mark,item.currency_id)" type="primary" :disabled="item.is_refc == 0">提币</el-button>
          </td>
        </tr>
        <transition name="fade">
          <tr v-if="item.show || item.showTi">
            <td colspan="5">
              <div class="copyDiv">
                <div class="chTip" v-if="!item.okCh">
                  <span>友情提示：{{tip}}</span>
                  <span class="okCh">
                     <el-button type="primary" @click="okCh(index,item)">同意</el-button>
                  </span>
                </div>
                <div v-if="item.okCh">
                  <div v-if="item.churlStatus">
                    {{item.churl}}
                  </div>
                  <div class="copyDivSrc" v-if="!item.churlStatus">
                    <span>充币地址：</span>
                    <input type="text" v-model="item.churl" :id="'biao'+index" class="copy-content" readonly>
                  </div>
                  <div class="copyBut" v-if="!item.churlStatus">
                    <el-button type="primary" @click="copy(item,index)" :disabled="item.copyDis">{{copyCon}}</el-button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </transition>
      </tbody>
      <tfoot>
        <slot name="load"></slot>
        <slot name="nodata"></slot>
      </tfoot>
    </table>
    <div>
      <el-dialog :visible.sync="dialogFormVisible" width="600px" @close="pushNum = ''">
        <form style="width: 460px;margin: 0 auto;" class="dialogForm">
          <div>
            选择提现银行卡
          </div>
          <div style="border: 1px solid #999999;height: 40px;line-height: 40px;color: #603400;cursor: pointer;" @click="showList = !showList">
            <span style="display: inline-block;width: 30%;padding-left:10px;box-sizing: border-box;">{{selectList.bankname}}</span>
            <span style="display: inline-block;width: 30%;">尾号 {{selectList.bank_card}}</span>
            <span style="display: inline-block;width: 25%;">{{selectList.name}}</span>
            <span style="display: inline-block;width: 10%;"><i class="el-icon-caret-bottom"></i></span>
          </div>
          <!--<transition name="fade">-->
          <div style="position: relative;z-index: 3;" v-if="showList">
            <!--<transition name="fade">-->
              <ul class="ulBankList">
                <li v-for="item,index in bankList" @click="selectBank(item,index)">
                  <span style="display: inline-block;width: 30%;padding-left:10px;box-sizing: border-box;">{{item.bankname}}</span>
                  <span style="display: inline-block;width: 30%;">尾号 {{item.bank_card}}</span>
                  <span style="display: inline-block;width: 25%;">{{item.name}}</span>
                </li>
                <li style="text-align: center;" @click="$router.push({name:'bindBank'})">
                  +添加银行卡
                </li>
              </ul>
            </div>
          <!--</transition>-->
          <div style="margin-top: 30px;">
            输入提现金额
          </div>
          <div>
            <input type="number" min="100" step="1" class="inputStyle" placeholder="最低提现金额为100" v-model="inputMoney" @input="pushInput">
            <span style="display: inline-block;padding-left: 20px;">
              可用：{{withdraw.num}} 元
            </span>
          </div>
          <div style="margin-top: 30px;position: relative;">
            <span class="submitOut">
              <el-button type="primary" @click="sureSubimt" :disabled="pushDisable">确认提现</el-button>
            </span>
            <span class="bottRig">
              <div style="position: absolute;top: 0;"> 手续费率：{{withdraw.currency_fee}}%</div>
              <div style="position: absolute;bottom: 0;">实际到账：{{inputMoney*(1-withdraw.currency_fee / 100) | point(4)}}</div>
            </span>
          </div>
        </form>
      </el-dialog>
      <el-dialog
        title="充值提醒"
        :visible.sync="centerDialogVisible1"
        width="600px"
        center>
        <div style="width: 400px;margin: 0 auto;">
          <div style="color: #292929;font-size: 15px;">
            CCC充值请联系客服，联系方式如下：
          </div>
          <div>
          </div>
          <div class="clear">
            <span style="display: inline-block;width: 150px;">
              <div style="text-align: center;color:#603400;">
                QQ：
                <a target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&uin='+ bottomConfig.server_qq +'&site=qq&menu=yes'" class="cursor" style="color: #603400;">
                {{bottomConfig.server_qq}}
              </a>
              </div>
              <img :src="bottomConfig.server_qq_qrcode" alt="" style="width: 150px;height: 150px;">
              <!--<img src="../../../assets/img/address.png" alt="" style="width: 150px;height: 150px;">-->
              <div style="text-align: center;">QQ二维码</div>
            </span>
            <span style="float:right; display: inline-block;width: 150px;">
               <div style="text-align: center;color:#603400;">
                微信：{{bottomConfig.server_wechat}}
               </div>
               <img :src="bottomConfig.server_wechat_qrcode" alt="" style="width: 150px;height: 150px;">
              <!--<img src="../../../assets/img/address.png" alt="" style="width: 150px;height: 150px;">-->
              <div style="text-align: center;">微信二维码</div>
            </span>
          </div>
        </div>

      </el-dialog>
    </div>
  </div>
  </div>
</template>
<script>
    export default{
        props:{
          theader:{
            default:function(){return ['币名','可用数量','挂单数量','总计','操作']},
          },
          tbodyer:{
            default:function(){
              return []
            }
          },
          money:{
            default:''
          }
        },
        data(){
            return {
              tip:'',
              pushNum:'',
              pushDisable:true,
              dialogFormVisible:false,
              centerDialogVisible1:false,
              copyCon:'复制',
              selectList:{},
              bankList:[],
              showList:false,
              codes:'',
              withdraw:{},
              accountMoney:'',
              inputMoney:'',
              bottomConfig:{}
            }
        },
        methods:{
          bottom(){
            var that = this;
            this.interFace('bottom',{}).then(function(res){
              console.log(res)
              that.bottomConfig = res.config;
            })
          },
          pushBank(type,value){
            if(type == 'ch'){
              this.centerDialogVisible1 = true;
              this.bottom();
            }else{
              this.withdraw = value;
              this.select_member_back_card();
            }
          },
          copy(data,index){
            if(data.churl){
              if(this.copyCon == '重新获取'){
                this.bpay(data,index);
              }else{
                let Url2= document.getElementById("biao"+index);
                Url2.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                this.$notify({
                  title: '复制成功',
                  type: 'success'
                });
              }
            }else{
              this.$notify.error({
                title: '没有获取到地址，复制失败',
              });
            }
          },
          bpay(item,index){
            var that = this;
            this.$set(this.tbodyer[index], 'copyDis',true);
            this.interFace('bpay',{
              currency_id:item.currency_id
            }).then(function(res){
              that.$set(that.tbodyer[index], 'copyDis',false);
              if(!res.type && res.type!=0){
                that.copyCon = '复制';
                that.$set(that.tbodyer[index],'churl',res);
              }else{
                that.copyCon = '重新获取';
                that.$set(that.tbodyer[index],'churl',res.body);
              }
            })
          },
          okCh(index,item){
            this.$set(this.tbodyer[index],'okCh',true);
            if(item.show){
              this.bpay(item,index);
            }else if(item.showTi){
            }
          },
          charge(index,item,type){   //充币
            if(type == 'ch'&& item.is_rech == 0 || type == 'ti'&& item.is_refc == 0){ //不支持充币或提币
              return;
            }
            if(this.tbodyer[index]['okCh']){
              this.tbodyer[index]['okCh'] = false;
            }
            if(type == 'ch'){
              this.tip = '禁止充值除'+item.currency_mark+'之外的其他资产，任何非'+item.currency_mark+'资产充值将不可找回';
              for(var i = 0;i<this.tbodyer.length;i++){
                if(i == index){
                  if(this.tbodyer[index]['show']){
                    this.tbodyer[index]['show'] = false;
                  }else{
                    this.$set(this.tbodyer[index], 'show',true);
                  }
                }else{
                  this.$set(this.tbodyer[i], 'show',false);
                }
              }
            }else{
              this.$set(this.tbodyer[index], 'show',false);
              sessionStorage.setItem('ableNum',item.num)
              if(item.is_fee == '0'){
                sessionStorage.setItem('currency_fee',item.currency_fee + '%')
              }else{
                sessionStorage.setItem('currency_fee',item.currency_fee + '个')
              }
              this.$router.push({name:'myPropertyCurrency',params:{id:item.currency_id,mark:item.currency_mark,evalute:this.money}})
            }
          },
          currency(mark,id){   //提币
            this.$router.push({name:'myPropertyCurrency',params:{id:id,mark:mark,evalute:this.money}})
          },
          pushInput(){
            if(this.inputMoney > this.withdraw.num*1){
              this.inputMoney = parseInt(this.withdraw.num);
            }
            if(this.inputMoney >= 100){
              this.pushDisable = false;
            }else{
              this.pushDisable = true;
            }
          },
          surePush(){
            var that = this;
            this.pushDisable = true;
            this.interFace('tichu_push',{
              value:that.pushNum
            }).then(function(res){
              that.pushDisable = false;
              if(!res.body){
                that.$notify({
                  title: '一键push成功',
                  type: 'success'
                });
                that.dialogFormVisible = false;
              }else{
                that.$notify.error({
                  title: '一键push失败',
                });
              }
            })
          },
          selectBank(item,index){
            this.selectList = this.bankList[index];
            this.showList = false;
          },
          select_member_back_card(){
            var that = this;
            this.interFace('select_member_back_card',{}).then(function(res){
              if(res.length>0){
                that.dialogFormVisible = true;
                that.bankList = res;
                that.selectList = res[0];
              }else{
                that.dialogFormVisible = false;
                that.$router.push({name:'bindBank'})
              }
            })
          },
          sureSubimt(){
            if(this.inputMoney != parseInt(this.inputMoney)){
              this.$notify({
                title: '提现金额只能是整数',
                type: 'warning'
              });
              return;
            }
            var that = this;
            this.pushDisable = true;
            this.interFace('withdraw',{
              value:this.inputMoney,
              bank_card_id:this.selectList.id,
            }).then(function(res){
              that.pushDisable = false;
              that.inputMoney = '';
              that.pushInput();
              if(!res.body){
                that.$notify({
                  title: res,
                  type: 'success'
                });
                that.dialogFormVisible = false;
                that.$emit('update')
              }else{
                that.$notify.error({
                  title: res.body,
                });
              }
            })
          }
        }
    }
</script>
<style scoped>
  .copyDiv{
    background: #353535;
    height:40px;
    line-height: 40px;
    padding: 0 25px;
  }
  .copyDivSrc{
    display: inline-block;
    float: left;
    text-align: left;
    width: 80%;
  }
  .count-r-bot{
    padding:26px 30px 33px 30px;
    color: #FFFFFF;
    letter-spacing: 0;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
  }
  .count-r-bot>table{
    width:100%;
    border-collapse: collapse;
  }
  .first{
    background: #AA9882;
  }
  .count-r-bot tr{
    height: 40px;
    text-align: center;
  }
  .count-r-bot td{
    border-bottom: 1px solid #6C6863;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  .chTip{
    text-align: left;
    color: red;
  }
  .okCh button,.copyBut button{
    /*width: 78px;*/
    height: 21px;
    line-height: 21px;
    padding-top: 0;
    padding-bottom: 0px;
    display: inline-block;
    float: right;
    margin-top: 10px;
  }
  .copy-content{
    width:400px;
    background: #353535;
    border: none;
    outline: none;
    color:#FFFFFF;
  }
  .chTi span{
    cursor: pointer;
    color: #CEC6BE;
  }
  .chTi > span:nth-of-type(1){
    margin-right: 22px;
  }
  .chTi button{
    height: 25px;
    padding:0 10px 0 10px;
    background: none;
    border:0px;
    border-radius: 3px;
    color: rgb(206, 198, 190);
    outline: none;
  }
  .chTi .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #666666;
    background: none!important;
    /*border-color:#4E4C4A;*/
  }
  .dialogForm button{
    width: 300px;
    height: 30px;
    line-height: 30px;
    padding:0;
  }
  .dialogForm .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A!important;
    border-color:#4E4C4A;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  .submitOut{
    display: inline-block;
    width: 250px;
  }
  .submitOut button{
    width: 100%;
    height: 40px;
    padding:0;
  }
  .ulBankList{
    margin-top: 10px;
    max-height: 160px;
    overflow: auto;
    position: absolute;
    width: 100%;
    background: white;
    /*z-index: 3;*/
  }
  .ulBankList li{
    border: 1px solid #999999;
    border-bottom: none;
    height: 40px;
    line-height: 40px;
    color: #777777;
    cursor: pointer;
  }
  .ulBankList li:nth-last-of-type(1){
    border-bottom: 1px solid #999999;
  }
  .ulBankList li:hover{
    background: #F4F4F4;
  }
  .bottRig{
    display: inline-block;
    width: 200px;
    height: 40px;
    position: absolute;
    padding-left:25px;
    box-sizing: border-box;
  }
  .inputStyle{
    width: 250px;
    height: 40px;
    border: 1px solid #999999;
    outline: none;
    border-radius: 3px;
    padding-left: 10px;
    box-sizing: border-box;
  }
</style>
