<template>
  <div class="MarketTrad">
    <div class="index-wrap" v-loading="bannerLoad">
      <slide-show :slides="slides" v-on:imgIndex="skip" v-if="slides.length"></slide-show>
    </div>
    <div class="color-AA9882">
      <div class="update-sit">
        <div>最新动态</div>
        <div style="position: relative;height: 30px;line-height: 30px;">
            <span class="update-news">
              <img src="../assets/img/news.png" alt="" style="position: absolute;;margin-right:5px;top: 6px;">
              <span style="display: inline-block;">
                <scroll :prizeList="newsFirst"></scroll>
              </span>
            </span>
          <span class="more" @click="goNewsList">点击查看更多</span>
        </div>
      </div>
    </div>
    <div class="table content-center" style="max-width:1200px;" v-loading="currentCurrency.length == 0">
      <div class="table-title">
        <ul>
          <li :class="{'seleTabBg':seleTabIndex === -1}" @click="spealArea(-1)">
            <span>自选</span>
          </li>
          <li @click="spealArea(index)" v-for="item,index in exchangeArea" :class="{'seleTabBg':seleTabIndex === index}">
            <span>{{item.currency_mark}}交易专区</span>
          </li>
        </ul>
      </div>
      <table style="border-collapse:collapse;color: #000000;">
        <thead>
        <tr style="border-right: 1px solid #CCCCCC;border-left: 1px solid #CCCCCC;">
          <th></th>
          <th style="text-align: left;padding-left: 54px;">币名</th>
          <th @click="sort('new_price',sortStatus[0],0)" class="marketLeft" style="width: 250px;">
            最新价格（{{type}}）
            <img src="../assets/img/arror-up.png" alt="">
          </th>
          <th class="marketLeft" @click="sort('done_num_24H',sortStatus[1],1)">
            24H成交量
            <img src="../assets/img/arror-up.png" alt="">
          </th>
          <th class="marketLeft" @click="sort('done_money_24H',sortStatus[2],2)">
            24H成交额（{{type}}）
            <img src="../assets/img/arror-up.png" alt="">
          </th>
          <th class="marketLeft" @click="sort('change_24H',sortStatus[3],3)">
            24H涨跌
            <img src="../assets/img/arror-up.png" alt="">
          </th>
          <th class="marketLeft" @click="sort('change_7D',sortStatus[4],4)">
            7D涨跌
            <img src="../assets/img/arror-up.png" alt="">
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item,key in currentCurrency" @click="goOperation(item)" :class="{MarkettrContent:item.status == 1,MarkettrContentDis:item.status == 0}"  @mouseenter="mouseEnter(item,key)" @mouseleave="mouseLeave(item,key)">
          <td style="width: 113px;box-sizing: border-box;">
            <img src="../assets/img/starDark.png" alt="" v-if="!item.sele" @click.stop="sele(item)">
            <img src="../assets/img/starLight.png" alt=""  v-if="item.sele" @click.stop="sele(item)">
          </td>
          <td style="text-align: left;width: 203px;">
                <span style="margin-left: 20px;">
                  <img :src="item.currency_logo" alt="" style="width: 20px;vertical-align: bottom;margin-right: 9px;">
                {{item.currency_name}} {{item.currency_mark}}/{{type}}
                </span>
          </td>
          <td class="marketLeft">
            <span :class="{green:Number(item.trade.change_24H)>0,red:Number(item.trade.change_24H)<0}">
              {{item.trade.new_price}}
            </span>
            <span v-if="item.show">
              /¥{{item.trade.price_cny*item.trade.new_price | point('',true)}}
            </span>
          </td>
          <td class="marketLeft">{{item.trade.done_num_24H}}</td>
          <td class="marketLeft">{{item.trade.done_money_24H}}</td>
          <td :class="{green:Number(item.trade.change_24H)>0,red:Number(item.trade.change_24H)<0}" class="marketLeft">{{item.trade.change_24H + '%'}}</td>
          <td :class="{green:Number(item.trade.change_7D)>0,red:Number(item.trade.change_7D)<0}" class="marketLeft">{{item.trade.change_7D + '%'}}</td>
          <td>
                <span class="bott">
                  <span v-if="item.status == 1">去交易</span>
                  <span v-if="item.status == 0">敬请期待</span>
                </span>
          </td>
        </tr>
        </tbody>
        <tfoot v-if="currentCurrency.length == 0">
        <tr>
          <td colspan="7" style="text-align: center;height: 100px;">
            <img src="../assets/img/nodata.png" alt="">
            <div>暂无数据</div>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
    <div style="max-width: 1200px;margin: 0 auto;margin-bottom: 80px;">
      <div style="text-align: center;">
        <span style="font-size: 0;">
          <span class="titleLeft"></span>
          <span class="titleLeftRig"></span>
        </span>
        <span style="font-size: 18px;color: #222222;padding: 0 30px;">专业数字资产交易平台</span>
        <!--<span class="titleLeft"></span>-->
        <span style="font-size: 0;">
          <span class="titleLeftRig"></span>
          <span class="titleLeft"></span>
        </span>
      </div>
      <ul class="platForm clear">
        <li>
          <img src="../assets/img/index1.png" alt="">
          <div>
            交易
          </div>
          <div>
            币币交易 币种丰富
          </div>
        </li>
        <li>
          <img src="../assets/img/index2.png" alt="">
          <div>
            网络
          </div>
          <div>
            闪电连接 高效便捷
          </div>
        </li>
        <li>
          <img src="../assets/img/index3.png" alt="">
          <div>
            安全
          </div>
          <div>
            专业团队 安全保障
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import slideShow from './carousel';
  import scroll from './scroll.vue';
  export default{
    components: {
      slideShow,scroll
    },
    data(){
      return {
        seleTabIndex:0,
        bannerLoad: true,
        sortStatus:[{new_price:false,done_num_24H:false,done_money_24H:false,change_24H:false,change_7D:false,status:false}],
        newsFirst:[],
        exchangeArea:[],
        slides: [],
        loading: true,
        currentCurrency:[],
        type:'',
        sortType:'status',
        webResDate:{},
        mouseIndex:-1,
      }
    },
    beforeRouteLeave(to,from,next){
      clearInterval(window.timer);
      this.websocketclose()
      next()
    },
    methods:{
      sele(item){
        item.sele = !item.sele;
        var seleTradePair = item.currency_mark+'/'+this.type;
        var tradePair = JSON.parse(localStorage.getItem('tradePair'));
        if(item.sele){
          tradePair.push(seleTradePair)
        }else{
          tradePair.splice(tradePair.indexOf(seleTradePair),1)
        }
        localStorage.setItem('tradePair',JSON.stringify(tradePair))
      },
      initWebSocket(){
        if(window.location.host.indexOf('192.168') == -1 && window.location.host.indexOf('127.0') == -1){
          var webSocketUrl = this.resUrl('online');
        }else{
          var webSocketUrl = this.resUrl()
        }
        webSocketUrl.then((res)=>{
          var webSocketUrl = res.ws;
          this.websock = new WebSocket(webSocketUrl);
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
          this.websock.onopen = this.websocketopen;
        })
      },
      websocketonmessage(e){
        var response = JSON.parse(e.data);
        if(response.login == 'success'){
          this.websock.send(JSON.stringify({type:'login',name:'home'}));
          return;
        };
        if(response.type && response.type == "ping"){
          this.websock.send(JSON.stringify({type:'pong'}));
          return;
        }
        if(!response.login || response.login != 'success'){
          this.handWebRes(response)
        }
      },
      websocketclose(e){
        this.websock.close();
      },
      handWebRes(data){
        if(!this.type){
          this.type = data.body.home[0].currency_mark;
        }
        var that = this;
        that.webResDate = data;
//        var tradePair = localStorage.getItem('tradePair');
//        for(var i =0;i<data.body.home.length;i++){
//          if(data.body.home[i].currency_mark == this.type){
//            if(this.sortType){
//              this.currentCurrency = data.body.home[i].list.sort(function(a,b){
//                if(that.sortType == 'status'){
//                  if(!that.sortStatus[that.sortType]){
//                    return b[that.sortType] - a[that.sortType];
//                  }else{
//                    return a[that.sortType] - b[that.sortType];
//                  }
//                }else{
//                  if(!that.sortStatus[that.sortType]){
//                    return b['trade'][that.sortType] - a['trade'][that.sortType];
//                  }else{
//                    return a['trade'][that.sortType] - b['trade'][that.sortType];
//                  }
//                }
//              })
//            }else{
//              this.currentCurrency = data.body.home[i].list;
//            }
//            this.currentCurrency.map(function(item){
//              if(tradePair.indexOf(item.currency_mark+'/'+that.type)>-1){
//                item.sele = true;
//              }else{
//                item.sele = false;
//              }
//            })
//            break;
//          }
//        }

        if(this.mouseIndex>-1){
          this.currentCurrency[this.mouseIndex].show = true;
        }
        if(!this.exchangeArea.length){
          this.exchangeArea = data.body.home.map(function(data){
            var obj = {area_currency_id:data.area_currency_id,currency_mark:data.currency_mark}
            return obj;
          })
        }
        this.handleShowData(data,this.seleTabIndex)
      },
      handleShowData(data,seleTabIndex){
        var tradePair = localStorage.getItem('tradePair');
        var arr = [];
//        筛选自选的元素，添加sele属性
        for(var i = 0;i<data.body.home.length;i++){
          var currentArea = data.body.home[i].currency_mark;
          if(this.exchangeArea[seleTabIndex]){
            if(data.body.home[i].currency_mark == this.exchangeArea[seleTabIndex].currency_mark){
              this.currentCurrency = data.body.home[i].list.map(function(item){
                item.symbol = item.currency_mark+'/'+currentArea;
                if(tradePair.indexOf(item.symbol)>-1){
                  item.sele = true;
                }else{
                  item.sele = false;
                }
                return item;
              })
              break;
            }
          }else{
            arr = arr.concat(data.body.home[i].list.filter(function(item){
              item.symbol = item.currency_mark+'/'+currentArea;
              if(tradePair.indexOf(item.symbol)>-1){
                item.sele = true;
                return true;
              }
            }))
            this.currentCurrency = arr;
          }
        }
//        排序
        if(this.sortType){
          this.currentCurrency = this.currentCurrency.sort(function(a,b){
            if(that.sortType == 'status'){
              if(!that.sortStatus[that.sortType]){
                return b[that.sortType] - a[that.sortType];
              }else{
                return a[that.sortType] - b[that.sortType];
              }
            }else{
              if(!that.sortStatus[that.sortType]){
                return b['trade'][that.sortType] - a['trade'][that.sortType];
              }else{
                return a['trade'][that.sortType] - b['trade'][that.sortType];
              }
            }
          })
        }
      },
      spealArea(index){
        if(this.seleTabIndex == index){
          return;
        }else{
          this.seleTabIndex = index;
          this.type = that.webResDate.body.home[index].currency_mark;
          this.sortStatus = [{new_price:false,done_num_24H:false,done_money_24H:false,change_24H:false,change_7D:false}];
          this.handleShowData(this.webResDate,this.seleTabIndex)
        }
      },
      sort(type){
        var that = this;
        this.sortStatus[type] = !this.sortStatus[type];
        this.sortType = type;
        this.currentCurrency.sort(function(a,b){
          if(!that.sortStatus[type]){
            return b['trade'][type] - a['trade'][type];
          }else{
            return a['trade'][type] - b['trade'][type];
          }
        })

      },
      skip(index){
        if(this.slides[index].url){
          var that = this;
          window.open(that.slides[index].url)
        }
      },
      goNewsList(){
        this.$router.push({path:'newst'})
      },
      goOperation(data){
        if(data.status == 0){
          return;
        }
        this.$router.push({name:'MarkTradExchange',params:{area_currency_id:this.type,currency_mark:data.currency_mark}})
      },
      mouseEnter(item,index){
        this.mouseIndex = index;
        this.$set(item,'show',true)
      },
      mouseLeave(item,index){
        this.$set(item,'show',false);
        this.mouseIndex = -1;
      },
      websocketopen(){},
    },
    created(){
      var that = this;
      that.interFace('banner').then(function (data) {
        console.log(data)
        that.slides = data;
        that.bannerLoad = false;
      });
      that.interFace('trend_list',{
        type:1,
        list:0,
        value:4
      }).then(function (data) {
        that.newsFirst = data.array;
      });
      var tradePair = localStorage.getItem('tradePair');
      if(!tradePair || tradePair == 'undefined'){
        localStorage.setItem('tradePair',JSON.stringify([]));
      }
      this.initWebSocket()
    }
  }
</script>
<style>

  .el-table .aaabbbccc {
    background: red;
  }
  .index-wrap {
    overflow: hidden;
    height: 400px;
    min-width: 1000px;
  }
  .update-sit{
    width: 580px;
    margin: 0 auto;
    padding:12px 0 20px 0px;
    color: #D6CEC6;
  }
  .update-news{
    background: #FFFFFF;
    display: inline-block;
    width: 470px;
    height: 24px;
    line-height: 24px;
    position: relative;
    z-index: 3;
    padding-left:10px;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    color:#999999;
    margin-top: 3px;
  }
  .MarketTrad .more{
    height: 30px;
    width: 116px;
    background: #21201A;
    display: inline-block;
    line-height: 30px;
    position: absolute;
    right: 0px;
    z-index: 2;
    text-align: center;
    color:#FFFFFF;
    cursor: pointer;
  }
  .table-title{
    height: 50px;
    line-height: 50px;
    background: #AA9882;
    color: #FFFFFF;
  }
  .tabLine{
    border: 1px solid #E2CDAA;
    width: 72px;
    position: relative;
    left:0;
  }
  .MarketTrad .left{
    transition: all 0.5s;
  }
  .table-title ul li{
    display: inline-block;
    cursor: pointer;
    width:113px;
    text-align: center;
  }
  .MarketTrad .table{
    margin: 70px auto 77px;
  }
  .MarketTrad .table>div,.MarketTrad .table>table{
    width:100%;
  }
  .MarketTrad thead{
    color: #494949;
    cursor: pointer;
  }
  .MarketTrad thead>tr{
    height: 50px;
  }
  .MarketTrad tbody>tr{
    height: 40px;
    border: 1px solid #CCCCCC;
  }
  .MarketTrad tbody{
    text-align: center;
  }
  .bott{
    border: 1px solid #D5A971;
    border-radius: 2px;
    width: 60px;
    height: 22px;
    color: #D5A971;
    text-align: center;
    display: inline-block;
    line-height: 22px;
    cursor: pointer;
  }
  .MarkettrContent{
    cursor: pointer;
  }
  .MarkettrContentDis{
    cursor: not-allowed;
  }
  .MarkettrContent:hover{
    background: #E1E1E1;
  }
  tbody .cell{
    color:rgb(0, 0, 0)
  }
  .cell{
    cursor: pointer;
    text-align: center;
  }
  .MarketTrad .el-table th, .el-table th.is-leaf{
    border-bottom: 1px solid #e6ebf5
  }
  .MarketTrad .el-table td, .el-table th{
    padding:8px 0;
  }
  .green{
    color:rgb(0, 153, 102);
  }
  .red{
    color:#CC0000;
  }
  .marketLeft{
    text-align: left;
  }
  .seleTabBg{
    background: white!important;
    color: #494949;
  }
  .titleLeft{
    display: inline-block;
    border-bottom: 1px solid #E1CCAA;
    width: 100px;
    overflow: hidden;
    margin-bottom: 4px;
  }
  .titleLeftRig{
    display: inline-block;
    height: 9px;
    border-left: 1px solid #E1CCAA;
  }
  .platForm{
    margin-top: 35px;
  }
  .platForm li{
    float: left;
    width: 33.33%;
    text-align: center;
  }
  .platForm li div:nth-of-type(1){
    color: #222222;
    font-size: 18px;
  }
  .platForm li div:nth-of-type(2){
    color: #999999;
    font-size: 12px;
  }
</style>
