<template>
  <div style="height:70px;">
    <div class="header">
      <div class="h-center content-center">
        <div @click="companyImg">
          <img src="../assets/img/logo.png" alt="" style="cursor: pointer">
        </div>
        <div class="header-rigth" v-show="!topMessage">
          <ul class="color-white-CEC6BE clear" >
            <li><router-link to="/MarketTrad" :class="{'topMarketTrade':topMarkeTrade}">行情交易</router-link></li>
            <li><router-link to="/countCenter">账户中心</router-link></li>
            <li><router-link to="/newst">最新动态</router-link></li>
            <li><router-link to="/downloadCenter">下载中心</router-link></li>
          </ul>
          <div class="h-rigth" style="font-size: 0px" v-if="!$store.state.user_find_data.head">
            <span style="font-size: 12px;"><router-link to="/login">登录</router-link></span>
            <span style="padding: 0;margin: 0 11px 0 11px;font-size: 12px;"></span>
            <span style="font-size: 12px"><router-link to="/register">注册</router-link></span>
          </div>
          <el-popover
            ref="popover4"
            placement="bottom"
            width="600"
            trigger="hover">
            <div>
              <div class="imgRefesh clear">
                <span>我的数字资产一览</span>
                <el-checkbox v-model="checked" @change="checkboxchange"><span>隐藏零余额币种</span></el-checkbox>
                <el-button type="primary" :loading="refashLoading" @click="refash">刷新</el-button>
              </div>
              <table class="headTable">
                <tr style="text-align: center;background: #AA9882;color: #FFFFFF;">
                  <td style="width: 162px;">币名</td>
                  <td style="width: 140px;">可用数量</td>
                  <td style="width: 130px;">挂单数量</td>
                  <td>总计</td>
                </tr>
              </table>
              <div style="max-height: 400px;overflow: auto;">
                <table class="headTable">
                  <tr v-for="item in tbodyerSort" style="text-align: center">
                    <td style="width: 160px;text-align: left;"><img :src="item.currency_logo" alt="" style="width: 18px;height:18px;vertical-align: text-bottom;margin-left: 25px;margin-right: 10px;">{{item.currency_name}}{{item.currency_mark}}</td>
                    <td>{{item.num}}</td>
                    <td>{{item.forzen_num}}</td>
                    <td>{{item.num*1 + item.forzen_num*1 | point}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </el-popover>
          <div class="h-rigth" style="font-size: 0px;position: relative;width: 120px;" v-show="$store.state.user_find_data.head">
            <div style="display: inline-block;position: relative" v-popover:popover4>
              <i class="Hellodot" v-if="$store.state.noReadNews"></i>
              <img :src="$store.state.user_find_data.head" alt="" class="imgCenter" @click="goToConter">
              <abbr class="lineHello"></abbr>
            </div>
            <div class="helloSignOut" @click="signOut">
              退出登录
            </div>
          </div>
        </div>
        <div class="header-rigth h-rig-sty" v-if="topMessage">
          <div>
            <span v-if="$route.name == 'login'">
              <span style="color: #FFFFFF;">还没账号,</span>
              <router-link to="/register" tag="span" style="cursor: pointer">马上注册</router-link>
            </span>
            <span v-if="$route.name == 'logregisterin'">
              <span style="color: #FFFFFF;">已有账号,</span>
              <router-link to="/login" tag="span" style="cursor: pointer">马上登录</router-link>
            </span>
            <span>|</span>
            <span><router-link to="/MarketTrad">返回币加网</router-link></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'top',
        topMessage:false,
        topMarkeTrade:false,
        checked:false,
        tbodyer: [],
        tbodyerSort:[],
        refashLoading:false,
      }
    },
    watch:{
      '$route':function(to){
        if(to.meta.loginRegister){
          this.topMessage = this.$route.meta.loginRegister;
        }else{
          this.topMessage = false;
        }
        if(to.name == 'MarketTrad' || to.name == 'MarkTradExchange'){  //控制颜色
          this.topMarkeTrade = true;
        }else{
          this.topMarkeTrade = false;
        }

      },
      '$store.state.myPropertyStore':function(newValue,oldValue){
        if(newValue!=oldValue){
          this.tbodyer = newValue;
          this.tbodyerSort = newValue;
          this.checkboxchange(this.checked);
        }
      }
    },
    methods:{
      companyImg(){
        this.$router.push({name:'MarketTrad'})
      },
      goToConter(){
        this.$router.push({name:'countCenter'})
      },
      checkboxchange(data){
        if(data){
          this.tbodyerSort = this.tbodyer.filter(function(data){
            if(Number(data.num)){
              return data;
            }
          })
        }else{
          this.tbodyerSort = this.tbodyer;
        }
      },
      ImgData(){
        var that = this;
        that.interFace('pay_money',{}).then(function(res){
          that.refashLoading = false;
          var is_legal = [];
          var legal = [];
          for(var i = 0;i<res.array.length;i++){
            if(res.array[i].is_legal == 1){
              is_legal.push(res.array[i])
            }else{
              legal.push(res.array[i])
            }
          }
          is_legal = is_legal.sort(function(a,b){
            return b.sort_id - a.sort_id;
          })
          legal = legal.sort(function(a,b){
            return b.sort_id - a.sort_id;
          })
          that.tbodyer = is_legal.concat(legal);
          that.tbodyerSort = is_legal.concat(legal);
          that.$store.state.myPropertyStore = is_legal.concat(legal);
          that.evalute = res.money;
        })
      },
      refash(){
        this.refashLoading = true;
        this.ImgData();
      },
      signOut(){
        var that = this;
        that.$router.push({path:'/login'});
        this.interFace('sign_out',{}).then(function(res){
          sessionStorage.clear();
          that.$store.state.user_find_data = '';
        })
      }
    },
    created(){
      if(sessionStorage.getItem('loginState') == 1){  //登录
        this.ImgData();
        this.$store.state.user_find_data = JSON.parse(sessionStorage.getItem('loginInfo'))
      }else{  //没有登录
        if(sessionStorage.getItem('loginState') != 0){//loginState是undefined
          var that = this;
          if(window.location.host.indexOf('192.168') == -1 && window.location.host.indexOf('127.0') == -1){
            var url = window.location.protocol +'//'+ window.location.host;
          }else{
            var url = '/api';
          }
          this.$http.post(url + '/Api/User_index/user_find',this.qs.stringify({platform:'web'})).then(function(res){
            if(res.data.type == 530){
              sessionStorage.setItem('loginInfo','');
              sessionStorage.setItem('loginState',0);
              that.$store.state.user_find_data = '';
            }else{
              sessionStorage.setItem('loginInfo',JSON.stringify(res.data.data))
              sessionStorage.setItem('loginState',1);
              that.$store.state.user_find_data = res.data.data;
              that.ImgData();
            }
          })
        }
      }
      if(this.$route.meta.loginRegister){
        this.topMessage = this.$route.meta.loginRegister;
      }
      if(sessionStorage.getItem('noReadNews') == 1){ //noReadNews有值 有未读消息
        this.$store.state.noReadNews = true;
      }else{ //noReadNews值为0 或者没有值
        var that = this;
        this.interFace('sysmessage', {
          list: 0,
          value: 1,
          type: 0
        }).then(function (res) {
          if (res.array.length > 0) {
            sessionStorage.setItem('noReadNews', 1);
            that.$store.state.noReadNews = true;
          }else{
            that.$store.state.noReadNews = false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .topMarketTrade{
    background: #AA9882;
  }
  .header{
    background: #21201A;
    height: 70px;
    width:100%;
    font-size: 12px;
    position: fixed;
    z-index: 4;
  }
  .h-center{
    margin:0 auto;
    height: 100%;
    padding:0 5px;
    position: relative;
    line-height: 70px;
    font-size: 0;
  }
  .h-center>div:nth-of-type(1){
    vertical-align: top;
    padding-top: 13px;
    height: 70px;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    width: 86px;

  }
  .header-rigth{
    width: calc(100% - 204px);
    float: right;
    height: 100%;
  }
  .h-rig-sty{
    color: #CEC6BE;
    text-align: right;
  }
  .h-center>div{
    display: inline-block;
    font-size: 12px;

  }
  .h-center ul{
    display: inline-block;
    height: 70px;
    line-height: 70px;
  }
  .h-center li{
    float: left;
    /*margin-left:40px;*/
    margin-right: 40px;
    cursor: pointer;
  }
  .h-center ul a{
    padding:2px 14.5px 2px 15.5px;
    border-radius: 2px;
  }
  .router-link-active{
    background: #AA9882;
    color: #FFFFFF;
  }
  .h-rigth{
    display: inline-block;
    float: right;
    height: 70px;
    /*height: 100%;*/
    /*line-height: 70px;*/
  }
  .h-rigth>span{
    color: #FFFFFF;
    border:1px solid #AA9882;
    border-radius: 1px;
    padding:2px 7px;
  }
  .imgCenter{
    width: 30px;
    height: 30px;
    vertical-align: -webkit-baseline-middle;
    border-radius: 50%;
    cursor: pointer;
    margin-bottom: 8px;
  }
  .headTable{
    width: 100%;
    border-collapse: collapse;
  }
  .headTable tr{
    height: 40px;
  }
  .imgRefesh{
    margin-bottom: 15px;
    line-height: 30px;
  }
  .imgRefesh button{
    width: 85px;
    height: 25px;
    padding:0;
    float: right;
  }
  .lineHello{
    border-left: 1px solid #FFFFFF;
    height: 17px;
    display: inline-block;
    position: absolute;
    top: 28px;
    right:-11px;
  }
  .helloSignOut{
    float: right;
    color: #FFFFFF;
    border: 1px solid #AA9882;
    line-height: 22px;
    margin-top: 24px;
    padding: 0 5px;
    border-radius: 3px;
    cursor: pointer;
  }
  .Hellodot{
    display: inline-block;
    position: absolute;
    right: 0;
    top: 21px;
    border: 4px solid red;
    border-radius: 50%;
  }
</style>
