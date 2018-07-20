<template>
    <div class="reword">
      <transition name="fade">
        <div v-show="show">
          <div tabindex="-1" role="dialog" aria-modal="true" aria-label="HTML 片段" class="el-message-box__wrapper" style="z-index: 2001;" @click="hideMongolia">
            <div class="el-message-box">
              <div class="el-message-box__content">
                <img src="/exchange/static/js/img/noreword1.png" alt="" style="width: 100%;display: block;" v-if="!reword">
                <!--<img src="../../static/js/img/noreword1.png" alt="" style="width: 100%;display: block;" v-if="!reword">-->
                <div class="tipImg" v-if="reword">
                  <div>
                    <img src="/exchange/static/js/img/reword1.png" alt="" v-if="grade == 1">
                    <!--<img src="../../static/js/img/reword1.png" alt="" v-if="grade == 1">-->
                    <img src="../assets/img/reword2.png" alt="" v-if="grade == 2">
                    <img src="../assets/img/reword3.png" alt="" v-if="grade == 3">
                    <img src="../assets/img/reword4.png" alt="" v-if="grade == 4 || grade == 5">
                    <span style="color: #FFFFFF;font-size: 26px;font-weight: bold;margin-left: 10px;">
                      {{grade | gradeFil}}{{title}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="v-modal" tabindex="0" style="z-index: 2000;"></div>
        </div>
      </transition>
      <div>
        <img src="/exchange/static/js/img/rewordBan.png" alt="" class="rewordBan">
        <!--<img src="../../static/js/img/rewordBan.png" alt="" class="rewordBan" >-->
      </div>
      <div class="rewordBg">
        <div style="font-size: 33px;color: #FFFFFF;padding-top: 143px;padding-left: 74px;">您有<span style="font-size: 71px;color: #FFFC01;">{{chance}}</span>次抽奖的机会</div>
        <div>
          <ul style="text-align: center">
            <li class="present" :class="{currentPic:index == 0,'border5':index !=0}">
              <img src="/exchange/static/js/img/reword1.png" alt="">
              <!--<img src="../../static/js/img/reword1.png" alt="">-->
              <span class="discript">MacBook pro</span>
            </li>
            <li class="present" :class="{currentPic:index == 1,'border5':index !=1}">
              <img src="../assets/img/noreword.png" alt="" style="margin-bottom: 16px;">
              <span class="discript">未中奖</span>
            </li>
            <li class="present" :class="{currentPic:index == 2,'border5':index !=2}">
              <img src="../assets/img/reword2.png" alt="" style="margin-bottom: 7px;">
              <span class="discript">
                iphone 8Plus
              </span>
            </li>
          </ul>
          <ul style="text-align: center;margin-top: 5px;">
            <li class="present" :class="{currentPic:index == 5,'border5':index !=5}">
              <img src="../assets/img/reword4.png" alt="" style="margin-bottom: 16px;">
              <span class="discript">
                100个 FVS
              </span>
            </li>
            <li class="present" :class="{currentPic:index == 4,'border5':index !=4}">
              <img src="../assets/img/reword3.png" alt="" style="margin-bottom: 7px;">
              <span class="discript">iPhoneX</span>
            </li>
            <li class="present" :class="{currentPic:index == 3,'border5':index !=3}">
              <img src="../assets/img/reword4.png" alt="" style="margin-bottom: 16px;">
              <span class="discript">50个 FVS</span>
            </li>
          </ul>
          <div style="text-align: center;margin-top: 55px;">
              <div style="" @click="present" class="aaaa">
                {{buttContent}}
              </div>
          </div>
        </div>
      </div>
      <div class="margin_center content-center">
        <p style="color: red;font-size: 26px;">活动规则</p>
        <ul>
          <li>
            1、购买大于1000个FVS可以参与抽奖，一天一次抽奖机会！（注:当天抽奖机会不叠加在第二天,逾期无效）
          </li>
          <li>
            2、自己成交自己的挂单不算入当天的抽奖机会
          </li>
          <li>
            3、抽奖截止时间：2月12号23:59:59
          </li>
          <li>
            <div style="display: inline-block;vertical-align: top;">
              4、活动奖品：
            </div>
            <div style="display: inline-block">
              <ul>
                <li>
                  一等奖：MacBook pro 一台
                </li>
                <li>
                  二等奖：iPhoneX 一部
                </li>
                <li>
                  三等奖：iPhone8 Plus 一部
                </li>
                <li>
                  四等奖：100个 FVS
                </li>
                <li>
                  五等奖：50个 FVS
                </li>
              </ul>
            </div>

          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default{
    data(){
        return {
          index: -1,   //样式改变控制
          stopStep:1, //总共需要转动的圈数
          step:-1,   //当前转动的圈数
          during:2,  //速度控制
          runT:'',  //转动函数
          stop:0,  //控制启停
          show:false,  //蒙层
          chance:0,
          reword:false,  //是否中奖
          title:'',  //提示语
          grade:'',  //获奖等级
          buttContent:'立即抽奖'
        }
    },
    methods:{
      present(){
        if(this.stop === 0){
          if(this.chance > 0){
            this.lottery();
          }else{
            this.$message.error('您没有抽奖机会');
          }
        }else{
          return;
        }
      },
      runF(){
          if(this.step>=(36+this.stopStep))//设置转动多少圈
          {
            this.index = this.step%6;
            this.step=this.stopStep;
            this.show = true;
            clearTimeout(this.runT);//停止转动
            this.stop = 0;
            this.chance = 0;
            return;
          }
          if(this.step>=(24+this.stopStep)){ //在即将结束转动前减速
            this.during+=1;
          }else{
            if(this.during<=2){ //控制中间转速
              this.during=2;
            }
            this.during--;
          }
          this.step++;
          this.index = this.step%6;
          this.runT=setTimeout(this.runF,this.during*50);
      },
      lottery(){
        this.stop = 1;
        var that = this;
        this.interFace('lottery',{}).then(function(res){
          var arr = [1,5,3,6,4,2];
          that.grade = res.grade;
          that.title = res.title;
          that.reword = res.grade == 6?false:true;
          that.stopStep =arr[Number(res.grade) - 1] - 1;
          that.runT=setTimeout(that.runF,100);
        })
      },
      hideMongolia(){
        this.show = false;
        if(this.grade != 6){
          this.buttContent = '已领取';
        }
      }
    },
  created(){
    var that = this;
    this.interFace('lottery_num',{}).then(function(res){
      that.chance = res.chance;
    })
  }
}
</script>
<style>
  .rewordBg{
    background: url("/exchange/static/js/img/rewordBg.png") no-repeat;
    /*background: url("../../static/js/img/rewordBg.png") no-repeat;*/
    width: 750px;
    height: 750px;
    margin: 0 auto;
    z-index: 1;
    position: relative;
  }
  .reword .el-message-box__content{
    padding:0;
  }
  .rewordBan{
    width: 100%;
    height: 350px;
  }
  @media screen and (min-width:1500px){
    .rewordBan{
      width: 100%;
      height: 440px;
    }
  }
  .reword .el-message-box{
    border: none;
    border-radius: 0;
    padding:0;
    background: none;
  }
  .present{
    background-image: url("/exchange/static/js/img/presentBox.png");
    /*background-image: url("../../static/js/img/presentBox.png");*/
    box-sizing: border-box;
    width: 226px;
    height: 150px;
    text-align: center;
    font-size: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    vertical-align: bottom;
  }
  .currentPic{
    border: 8px solid #FFFC01;
    box-sizing: border-box;
  }
  .border5{
    border: 5px solid #EFD073;
  }
  .discript{
    color: #FFFFFF;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .aaaa{
    width: 209px;
    height: 77px;
    display: inline-block;
    margin: 0 auto;
    background: url('../assets/img/presentBut.png') no-repeat;
    line-height: 77px;
    color: #FFFFFF;
    font-size: 36px;
    font-weight: bold;
    cursor: pointer;
  }
  .tipImg{
    background-image: url('/exchange/static/js/img/rewordTip.png');
    /*background-image: url('../../static/js/img/rewordTip.png');*/
    background-size: 100% 100%;
    width:100%;
    height: 266px;
  }
  .tipImg >div{
    position: relative;
    bottom: -180px;
    display: flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
  }
  .tipImg img{
    height: 48px;
  }
</style>
