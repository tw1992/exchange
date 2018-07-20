<template>
  <div id="footer">
    <div class="f-conter fixed-width content-center">
      <ul class="clear color-white-f">
        <li>
          币加文化
          <ul>
            <li v-for="item in culture" @click="goToTemplate(item.id)">
              <span class="cursor">{{item.title}}</span>
            </li>
          </ul>
        </li>
        <li>
          温馨提示
          <ul>
            <li v-for="item in tip" @click="goToTemplate(item.id)">
              <span class="cursor">{{item.title}}</span>
            </li>
          </ul>
        </li>
        <li>
          联系我们
          <ul>
            <li><a target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&uin='+ config.server_qq +'&site=qq&menu=yes'" class="cursor">客服QQ：{{config.server_qq}}</a></li>
            <li>
              <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=97c73aed6f3c6e531340c7cadc7f8afb097c8d1bdf4b661060d32078d42ea8b2">
                官网Q群：{{config.server_qqgroup}}
              </a>
              <!--<a target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&uin=' + config.server_qqgroup + '&site=qq&menu=yes'" class="cursor">官网Q群：{{config.server_qqgroup}}</a>-->
            </li>
            <li>
              <span class="cursor">企业邮箱：{{config.server_email}}</span></li>
          </ul>
        </li>
      </ul>
      <div>
        <ul class="friend_link">
          <li style="font-size: 15px;color: #FFFFFF;">友情链接</li>
          <li v-for="item in friend_link">
            <a :href="item.url" target="_blank" class="cursor">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="line fixed-width content-center"></div>
    <div class="color-white-CEC6BE address fixed-width content-center clear">
          <span class="addre">
            <div>
              Copyright 2017 Block chain All Rrights Resereved. Powered by Block chain
            </div>
          </span>
      <span class="contact color-black-21201A cursor">
            <img src="../assets/img/service.png" alt="" style="vertical-align: middle;">
            <span style="margin-left: 15px;">
              <a target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&uin='+ config.server_qq +'&site=qq&menu=yes'" class="cursor" style="color: #FFFFFF;">
                联系客服
              </a>
              </span>
           </span>
    </div>
    <div style="position: fixed;bottom: 100px;right: 50px;">
      <ul style="width: 50px;" class="serAdeTop">
        <!--<li @click="serAdeTop('rank')" class="rankImg" v-if="$store.state.user_find_data.head">-->
          <!--<img src="../../static/js/img/fvs.png" alt="">-->
          <!--&lt;!&ndash;<img src="/exchange/static/js/img/fvs.png" alt="">&ndash;&gt;-->
        <!--</li>-->
        <li @click="serAdeTop('ser')" class="contactImg">
              <span class="topChi">
                <a target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&uin='+ config.server_qq +'&site=qq&menu=yes'" class="cursor" style="color: #FFFFFF;">
                联系客服
              </a>
              </span>
        </li>
        <li @click="serAdeTop('ade')" class="adviceImg" v-if="$store.state.user_find_data.head">
          <span class="topChi">意见反馈</span>
        </li>
        <li @click="serAdeTop('top')" class="topImg">
          <span class="topChi">返回顶部</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        config:{},
        friend_link:{},
        page:[],
        tip:[],
        culture:[]
      }
    },
    methods:{
      goToTemplate(id){
        this.$router.push({name:'about',params:{ id: id }})
      },
      serAdeTop(type){
        if(type == 'top'){
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }else if(type == 'ade'){
          this.$router.push({name:'advice'})
        }else if(type == 'rank'){
          this.$router.push({name:'reword'})
        }
      },
    },
    created(){
      var that = this;
      this.interFace('bottom',{}).then(function(res){
        that.config = res.config;
        that.friend_link = res.friend_link;
        that.page = res.page;
        that.tip = res.page.splice(3,5);
        that.culture = res.page.splice(0,3);
        document.title = res.config.web_title;
        document.querySelector('meta[name="keywords"]')['content'] = res.config.web_keywords;
        document.querySelector('meta[name="description"]')['content'] = res.config.web_description;
      })
    }
  }


</script>
<style>
  #footer{
    min-width: 1000px;
    background:#21201A;
    padding:40px 0 23px 0;
    font-size: 12px;
  }
  .fixed-width{
    margin:0 auto;
  }
  .f-conter{
    padding:0px 5px;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
  }
  .f-conter > ul > li{
    float: left;
    width: 33%;
    font-size: 15px;
  }
  .f-conter>ul ul{
    color: #CEC6BE;
    font-size: 12px;
    margin-top: 20px;
  }
  .f-conter>ul>li li{
    margin-bottom: 16px;
  }
  .line{
    border-bottom: 2px solid #CEC6BE;
    margin:20px auto;
  }
  .addre{
    float: left;
  }
  .contact{
    float: right;
    background: #AA9882;
    width:124px;
    height: 28px;
    line-height: 28px;
    text-align: right;
    /*padding:6px 20px 5px 50px;*/
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    padding-right:20px;
    /*color: black;*/
  }
  .cursor{
    cursor: pointer;
  }
  .rankImg{
    position: relative;
    background: none!important;
  }
  .rankImg img{
    position: absolute;
    left: -8px;
    top:-41px;
  }
  .serAdeTop li{
    height: 50px;
    background: #000000;
    color: #FFFFFF;
    padding:8px 10px 10px 8px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    width: 100%;
  }
  .serAdeTop .contactImg{
    background-image: url("../assets/img/contact.png");
  }
  .serAdeTop .adviceImg{
    background-image: url("../assets/img/saveWord.png");
  }
  .serAdeTop .topImg{
    background-image: url("../assets/img/top.png");
  }
  .serAdeTop li{
    background-repeat: no-repeat;
    background-position: 50%;
    transition: all .3s ease;
  }
  .topChi{
    opacity: 0;
    transition: all .3s ease;
  }
  .serAdeTop li:hover .topChi{
    opacity: 1;
    color: #FFFFFF;
  }
  .serAdeTop li:hover{
    background-position: -110%;
    color: #000000;
  }
  .friend_link{
    margin-top: 10px;
  }
  .friend_link li{
    display: inline-block;
    margin-right: 30px;
  }
</style>
