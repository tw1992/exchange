<template>
  <div class="content-center count-center">
    <div style="overflow:hidden;">
      <div class="count-left">
        <div class="c-left-top">
          <div class="person-info">
            <div>
              <!--<img :src="user.head" alt="" style="width: 42px;height: 42px;position: absolute" @click="changeImg">-->
              <img :src="$store.state.user_find_data.head" alt="" class="headImg" @click="changeImg">
              <div style="display: inline-block;margin-left: 60px;padding: 5px 0;">
                <div style="color: #FFFFFF;">
                  您好，{{$store.state.user_find_data.name}}
                </div>
                <div>
                  ID {{$store.state.user_find_data.member_id}}
                </div>
              </div>
            </div>
            <ul class="icoic">
              <li @click="clickImg('certification')">
                <img v-if="$store.state.user_find_data.status == 3" src="../assets/img/certifi.png" alt="">
                <img v-if="$store.state.user_find_data.status !=3" src="../assets/img/nocertifi.png" alt="">
              </li>
              <li @click="clickImg('bindPhone')">
                <img v-if="$store.state.user_find_data.phone" src="../assets/img/phone.png" alt="">
                <img v-if="!$store.state.user_find_data.phone" src="../assets/img/nophone.png" alt="">
              </li>
              <li @click="clickImg('setPwd')">
                <img v-if="$store.state.user_find_data.pwdtrade" src="../assets/img/pwd.png" alt="">
                <img v-if="!$store.state.user_find_data.pwdtrade" src="../assets/img/nopwd.png" alt="">
              </li>
              <li @click="clickImg('bindBank')">
                <img v-if="$store.state.user_find_data.bank_card" src="../assets/img/bankCard.png" alt="">
                <img v-if="!$store.state.user_find_data.bank_card" src="../assets/img/nobankCard.png" alt="">
              </li>
            </ul>
          </div>
          <ul class="per-service">
            <router-link :to="{name:'countCenter'}" tag="li" active-class="selesecRou firstNav" exact class="firstNavNo">
              <div class="divLine"></div>
              <span></span>
              <div>
                    <span>
                      我的资产
                     </span>
              </div>
            </router-link>
            <router-link :to="{name:'myChange'}" tag="li" active-class="selesecRou secNav" class="secNavNo">
              <div class="divLine"></div>
              <span></span>
              <div>
                    <span>
                      我的交易
                    </span>
              </div>
            </router-link>
            <router-link :to="{name:'finalRecord'}" tag="li" active-class="selesecRou thirdNav" class="thirdNavNo">
              <div class="divLine"></div>
              <span></span>
              <div>
                    <span>
                      财务记录
                    </span>
              </div>
            </router-link>
            <router-link :to="{name:'management'}" tag="li" active-class="selesecRou fourNav" class="fourNavNo">
              <div class="divLine"></div>
              <span></span>
              <div>
                    <span>
                      工单管理
                    </span>
              </div>
            </router-link>
            <router-link :to="{name:'submitOrder'}" tag="li" active-class="selesecRou sevenNav" class="sevenNavNo">
              <div class="divLine"></div>
              <span></span>
              <div>
                      <span>
                        提交工单
                      </span>
              </div>
            </router-link>
            <router-link :to="{name:'invateFri'}" tag="li" active-class="selesecRou fiveNav" class="fiveNavNo">
              <div class="divLine"></div>
              <span></span>
              <div>
                    <span>
                      邀请好友
                    </span>
              </div>
            </router-link>
            <router-link :to="{name:'myNews'}" tag="li" active-class="selesecRou sixNav" class="sixNavNo">
              <div class="divLine"></div>
              <span></span>
              <div style="position: relative">
                <i style="display: inline-block;position: absolute;left: 50px;top: 15px;border: 4px solid red;border-radius: 50%;" v-if="$store.state.noReadNews"></i>
                <span>
                      消息中心
                    </span>
              </div>
            </router-link>
            <li @click="exit" class="exitNavNo">

              <!--<router-link :to="{name:'exit'}" tag="li" active-class="selesecRou">-->
              <div class="divLine"></div>
              <div>
                <img src="" alt="">
                <span>
                    退出登录
                  </span>
              </div>
              <!--</router-link>-->
            </li>
          </ul>
        </div>
        <div class="notice">
          <div class="notice-top">
            <img src="" alt="">
            <span>币加公告</span>
            <span class="more" @click="findMore">更多</span>
          </div>
          <ul style="cursor: pointer;">
            <li v-for="item in notice" @click="goDetail(item.id)">{{item.title | cutOut(11)}}</li>
          </ul>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <router-view class="count-rigth"></router-view>
      </transition>
      <!--<transition>-->
      <!--<router-view class="count-rigth"></router-view>-->
      <!--</transition>-->
    </div>
    <tip :margintop="32"></tip>
  </div>
</template>
<script>
  import tip from './unsaveTip.vue';
  export default{
    data(){
      return {
        user:{
          head:'',
          member_id:'',
          name:'',
          pwdtrade:'',
          phone:'',
          status:''
        },
        notice: [],
        type:'my-property',
        value:'dflasjdfl',
        exitClass:false,
//              noReadNews:false,
//              noReadNews:this.$store.state.noReadNews,
      }
    },
    components:{
      tip
    },
    methods:{
      changeImg(){
        this.$router.push({name:'changeImg'})
      },
      tabPerService(data){
        this.type = data;
      },
      findMore(){
        this.$router.push('/announce')
      },
      copy(data){
        var Url2=document.getElementById("biao1");
        Url2.select(); // 选择对象
        document.execCommand("Copy"); //执行浏览器复制命令
      },
      clickImg(type){
        if(type == 'bindBank'){
          this.userType(type);
        }else{
          this.$router.push({name:type});
        }
      },
      exit(){
        var that = this;
        that.$router.push({path:'/login'});
        this.interFace('sign_out',{}).then(function(res){
          sessionStorage.clear();
          that.$store.state.user_find_data = '';
        })
      },
      goDetail(id){
        this.$router.push({name:'announceDetail',query:{id:id}})
      },
      userType(type){
        var that = this;
        this.interFace('user_type').then(function(res){   //status 1:验证通过   0不通过
          that.$store.state.bank_card = res.bank_card == 1?true:false;
          that.$router.push({name:type});
        })
      }
    },
    created(){
      var that = this;
      this.interFace('user_find',{}).then(function(res){
        that.$store.state.user_find_data = res;
        sessionStorage.setItem('loginInfo',JSON.stringify(res))
        sessionStorage.setItem('loginState',1)
      })
      this.interFace('trend_list',{list:0,value:5,type:2}).then(function(res){
        that.notice = res.array;
      })
      if(sessionStorage.getItem('noReadNews') == 1){
        that.$store.state.noReadNews = true;
      }else{
        that.$store.state.noReadNews = false;
      }
    }
  }


</script>
<style scoped>
  .selected{
    background: #C8B297;
  }
  .notselected{
    background:#A6A6A6
  }
  .count-center{
    margin:32px auto;
    /*margin-top:32px auto 0;*/
  }
  .count-left{
    width:204px;
    display: inline-block;
  }
  .count-rigth{
    width:calc(100% - 234px);
    display: inline-block;
    vertical-align: top;
    float: right;
    background: #2C2B27;
  }
  .c-left-top img{
    /*border-radius: 50%;*/
    overflow: hidden;
  }
  .c-left-top{
    background: #21201A;
    color: #CEC6BE;
  }
  .person-info{
    padding:22px;
    position: relative;
  }
  .firstNav{
    background-image: url('../../src/assets/img/wdzc1.png')!important;
  }
  .firstNavNo{
    background-image: url('../assets/img/wdzc0.png');
  }
  .secNav{
    background-image: url('../../src/assets/img/wdjy1.png')!important;
  }
  .secNavNo{
    background-image: url('../../src/assets/img/wdjy0.png')
  }
  .thirdNav{
    background-image: url('../../src/assets/img/cwjl1.png')!important;
  }
  .thirdNavNo{
    background-image: url('../../src/assets/img/cwjl0.png')
  }
  .fourNavNo{
    background-image: url('../../src/assets/img/gdgl1.png');
  }
  .fourNav{
    background-image: url('../../src/assets/img/gdgl0.png')!important;
  }
  .sevenNavNo{
    background-image: url('../../src/assets/img/tjgd1.png');
  }
  .sevenNav{
    background-image: url('../../src/assets/img/tjgd0.png')!important;
  }
  .fiveNav{
    background-image: url('../../src/assets/img/yqhy1.png')!important;
  }
  .fiveNavNo{
    background-image: url('../../src/assets/img/yqhy0.png')
  }
  .sixNav{
    background-image: url('../../src/assets/img/wdxx1.png')!important;
  }
  .sixNavNo{
    background-image: url('../../src/assets/img/wdxx0.png')
  }
  .seventNav{
    background-image: url('../../src/assets/img/exit0.png')!important;
  }
  .exitNavNo{
    background-image: url('../../src/assets/img/exit0.png')
  }
  .icoic{
    font-size: 0px;
    margin-top:22px;
  }
  .icoic>li{
    display: inline-block;
    width: 25%;
    text-align: center;
  }
  .icoic img{
    width:30px;
    cursor: pointer;
  }
  .per-service>li{
    text-align: center;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    position: relative;
    background-position: 28% 57%!important;
    background-size: 13px 13px;
    background-color:#21201A;
    background-repeat:no-repeat;
  }
  .divLine{
    box-shadow: 0 2px 3px 0 rgba(255,255,255,0.10);
    border-top:2px solid #000000;
  }
  .per-service>li>span{
    font-size: 14px;
  }
  .selesecRou{
    background-color: #373631!important;
    opacity:1;
    color: #FFFFFF;
    /*background-position:28% 50%!important;*/
  }
  .selesecRou>div:nth-of-type(2){
    /*border-left: 5px solid #AA9882;*/
    /*height: 48px;*/
  }
  .selesecRou>span:nth-of-type(1){
    display: inline-block;
    height: 95%;
    border-left: 5px solid #AA9882;
    position:absolute;
    left:0;
  }
  .notice{
    padding:14px;
    border: 1px solid #CCCCCC;
    margin: 18px 0 0px 0;
  }
  .notice li{
    margin-top:7px;
    color: #222222;
  }
  .notice-top{
    margin-bottom: 18px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #AA9882;
  }
  .more{
    font-size: 12px;
    float: right;
    cursor: pointer;
  }
  .copy-content{
    border:none;
    outline: none;
    height:100%;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    background: #353535;
    color:#FFFFFF;
  }
  .headImg{
    width: 42px;
    height: 42px;
    position: absolute;
    border-radius: 50%;
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }

</style>
