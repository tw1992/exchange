<template>
  <div id="container" class="margin_center content-center">
    <div class="header">
      <ul class="ulTop">
        <li v-for="item,index in webDate.body.home" @click="chooseSpicalArea(item,index)">
          {{item.currency_mark}}交易专区
        </li>
        <div class="underLine" ref='underline' v-if="webDate.body.home"></div>
      </ul>
    </div>
    <div>
      <ul class="ulCenter">
        <li class="firstLi" @click="downList(firstData)">
          <div>
            <div style="white-space:nowrap;">{{firstData.currency_name}}</div>
            <div>{{firstData.currency_mark}}/{{areaId}}</div>
          </div>
          <div class="num">
            <span style="font-size: 22px;">{{firstData.trade.new_price}}</span>
            <span style="font-size: 14px;" :class="{green:(firstData.trade.change_24H) > 0,'red':(firstData.trade.change_24H) < 0}">{{(firstData.trade.change_24H) > 0?'+'+firstData.trade.change_24H:firstData.trade.change_24H}}%</span>
          </div>
          <div class="arrow" ref="arrow">
            <img src="../assets/img/Rectangle.png" alt="">
          </div>
          <div style="color: #999999;">
            约合 {{firstData.trade.new_price?firstData.trade.new_price*firstData.trade.price_cny:'0' | point}} CNY
          </div>
          <transition name="fade">
            <ul class="liUl" v-if="listDownUp">
              <li v-for="(item,key) in changeSpecialArea" :class="{'listBackCo':listBackground == key}" @click="chooseList(item,key)">
                <div class="liUlfirdiv">
                  <div>{{item.currency_name}}</div>
                  <div>{{item.currency_mark}}/{{areaId}}</div>
                </div>
                <div class="num">
                  <span>{{item.trade.new_price || '0.00000000'}}</span>
                  <span :class="{green:(item.trade.change_24H) > 0,'red':(item.trade.change_24H) < 0}">{{(item.trade.change_24H)>0?'+'+item.trade.change_24H:item.trade.change_24H}}%</span>
                </div>
                <div style="color: #999999;">
                  约合 {{firstData.trade.new_price?firstData.trade.new_price*firstData.trade.price_cny:'0' | point}} CNY
                </div>
              </li>
            </ul>
          </transition>
        </li>
        <li class="width">
          <div>最低({{areaId}})</div>
          <div>{{firstData.trade.min_price}}</div>
          <div style="color: #999999;">约合 {{firstData.trade.min_price?firstData.trade.min_price*firstData.trade.price_cny:'0' | point}} CNY</div>
        </li>
        <li class="width">
          <div>最高({{areaId}})</div>
          <div>{{firstData.trade.max_price}}</div>
          <div style="color: #999999;">约合 {{firstData.trade.max_price?firstData.trade.max_price*firstData.trade.price_cny:'0' | point}} CNY</div>
        </li>
        <li class="width">
          <div>24H成交量</div>
          <div>{{firstData.trade.done_num_24H}}</div>
        </li>
      </ul>
    </div>
    <div style="border: 1px solid #CCCCCC;margin: 10px 0;">
      <div class="echart-tops clear">
        <div id="kline_container"></div>
      </div>
    </div>
    <div class="clear">
      <div class="buyleft">
        <div class="left-top">
          <ul class="buySellHead">
            <li @click="buySell('buy')"><span style="color: #009966;font-size: 16px;" class="buyAndSellStyle" :class="{borderBottom:buySellType=='buy'}">买入</span></li>
            <li @click="buySell('sell')"><span style="color: #CC0000;font-size: 16px;" class="buyAndSellStyle" :class="{borderBottom:buySellType=='sell'}">卖出</span></li>
          </ul>
        </div>
        <div class="left-content">
          <div class="con-fir">
            <span>可用：{{ableBuySell}}{{buySellType == 'buy'? areaId : currencyId}}</span>
          </div>
          <ul class="buyDetail">
            <li>
              <span>{{buySellWord.price}}</span>
              <input class="inputSty"  :placeholder="placemodel.buy" type="number" v-model="inputmodel.buy" @input="buySellInput('price',inputmodel.buy)"/>
            </li>
            <li>
              <span>{{buySellWord.num}}</span>
              <input class="inputSty" :placeholder="placemodel.num" v-model="inputmodel.num" type="number" @input="buySellInput('num',inputmodel.num)"/>
            </li>
            <li>
              <span>交易总额</span>
              <input class="inputSty" :placeholder="placemodel.totalPrice" v-model="inputmodel.totalPrice" @input="buySellInput('total',inputmodel.totalPrice)" readonly/>
            </li>
          </ul>
          <ul class="ex-button">
            <li v-for="(item,key) in percent" class="ulLiBtn">
              <el-button size="mini" :type="key == seleIndex? 'primary':''" @click="seleBut(key)">{{item.data1}}</el-button>
            </li>
          </ul>
          <div style="color:rgb(170, 152, 130);">手续费:{{inputmodel.handFee | point}} {{buySellType == 'buy'?currencyId:areaId}}</div>
          <div class="sureBuy">
            <!--<el-tooltip :disabled="false" content="请先进行登录" placement="bottom" effect="dark">-->
            <!--<el-button @click="buyOrSell" type="primary" :disabled="true">{{buySellWord.butt}}</el-button>-->
            <!--</el-tooltip>-->
            <el-button @click="buyOrSell" type="primary">
              {{buySellWord.butt}}
            </el-button>
            <!--<el-button @click="buyOrSell" type="primary" :disabled="login || exchangeDisable">-->
            <!--{{buySellWord.butt}}-->
            <!--</el-button>-->
          </div>
          <div style="color: #AA9882;">
            <span>交易费率 {{buy_fee*1 + '%'}}</span>
            <span style="float: right;cursor: pointer;" @click="noInputPwd">免输入交易密码</span>
          </div>
        </div>
      </div>
      <div class="buyrigth">
        <table style="border: none;border-collapse: collapse;" class="gear">
          <thead class="right-top">
          <tr>
            <th>档位</th>
            <th>价格({{areaId}})</th>
            <th>数量</th>
            <th>交易额({{areaId}})</th>
            <th class="seleCombine">
              <el-select v-model="value6" placeholder="深度" size="mini" @change="changePoint">
                <el-option
                  v-for="item in combineData"
                  :key="item.len"
                  :label="item.len"
                  :value="item.len">
                  <span style="float: left">{{ item.len }}位</span>
                </el-option>
              </el-select>
            </th>
          </tr>
          </thead>
          <tbody style="margin-bottom: 20px;" id="data-list-content">
          <tr v-for="item,index in sellDate">
            <td>卖{{sellDate.length - index}}</td>
            <td @click="tbodyTdClick('sell','price',item.price)" style="cursor: pointer;">{{item.price}}</td>
            <td @click="tbodyTdClick('sell','num',item.num)" style="cursor: pointer;">{{item.num}}</td>
            <td>{{item.price * item.num |point}}</td>
          </tr>
          </tbody>
          <tbody id="data-list-content-button">
          <tr v-for="item,index in buyDate">
            <td>买{{index + 1}}</td>
            <td @click="tbodyTdClick('buy','price',item.price)" style="cursor: pointer;">{{item.price}}</td>
            <td @click="tbodyTdClick('buy','num',item.num)" style="cursor: pointer;">{{item.num}}</td>
            <td>{{item.price * item.num |point}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div style="background: #2C2B27;color: #FFFFFF;margin-top: 10px;">
      <div>
        <ul class="my-table-top">
          <li @click="mySellBuy('pend',0)">
            我的挂单
          </li>
          <li @click="mySellBuy('success',1)">
            我的成交
          </li>
          <div class="underLine1" ref="underLine1"></div>
        </ul>
      </div>
      <div style="width: 100%;padding: 25px 30px;box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;">
        <table style="width: 100%;border-collapse: collapse;">
          <thead style="background: #AA9882;text-align: center;">
          <tr style="height: 40px;" v-show="type=='pend'">
            <td>挂单时间</td>
            <td>挂单类型</td>
            <td>挂单价格</td>
            <td>挂单数量</td>
            <td><span>操作</span></td>
          </tr>
          <tr style="height: 40px;" v-show="type=='success'">
            <td>成交时间</td>
            <td>成交类型</td>
            <td>成交价格</td>
            <td>成交均价</td>
            <td>成交数量</td>
            <td><span>成交金额</span></td>
          </tr>
          </thead>
          <!--<transition-group name="list" tag="tbody" style="text-align: center;" class="my-tbody">-->
          <transition-group tag="tbody" style="text-align: center;" class="my-tbody">
            <tr v-for="(item,index) in showMyOrAndTraDate" :key="item.orders_id" class="list-item">
              <td>{{type=='pend'?item.add_time:item.trade_time | time}}</td>
              <td>{{item.type | exchangeType}}{{currencyId}}</td>
              <td>{{item.price}}</td>
              <td v-if="type=='success'">{{item.average_price | point}}</td>
              <td>{{type=='pend'?(item.num - item.trade_num):item.status==2?(item.trade_num |point ):'≈'+(item.trade_num | point ) + '/'+ (item.num | point )}}</td>
              <td @click="cancelOrder(item,index)" v-if="type == 'pend'">
                    <span class="cancelOrder">
                      <el-button type="primary" size="small" :disabled="item.disable">撤单</el-button>
                    </span>
              </td>
              <td v-show="type=='success'">{{item.average_price * item.trade_num | point}}</td>
            </tr>
          </transition-group>
          <tfoot v-if="login">
          <tr>
            <td colspan="5" style="text-align: center;height: 150px;">
              您还没有登录，请先进行<span style="color: red;cursor: pointer" @click="$router.push({name:'login'})">登录</span>
            </td>
          </tr>
          </tfoot>
          <tfoot v-if="showMyOrAndTraDate.length==0 && !login">
          <tr>
            <td :colspan="type=='pend'?'5':'7'" style="text-align: center;padding-top: 20px;">
              <img src="../assets/img/nodata.png" alt="">
              <div>暂无数据</div>
            </td>
          </tr>
          </tfoot>
        </table>
        <div style="text-align: center;margin-top: 20px;" v-if="page.total != 0">
          <el-pagination
            background
            @current-change="getOrderTeade"
            :current-page.sync="page.current"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="page.total*10">
          </el-pagination>
        </div>
      </div>

    </div>
    <div style="border: 1px solid  #EDEDED;margin-top: 50px;">
      <div style="height: 40px;background:  #21201A;color: #FFFFFF;line-height: 40px;padding-left: 31px;font-size: 14px;">
        最新成交
      </div>
      <table style="width: 100%;text-align: center;border-collapse: collapse" class="newstex" v-loading="newstChange">
        <tr>
          <td>成交时间</td>
          <td>成交类型</td>
          <td>成交价格</td>
          <td>成交数量</td>
          <td>成交金额</td>
        </tr>
        <tr v-for="item in newstexchange">
          <td>{{item.add_time | time}}</td>
          <td :class="{'green':item.type == 'buy','red':item.type == 'sell'}">{{item.type | exchangeType}}</td>
          <td>{{item.price}}</td>
          <td>{{item.num}}</td>
          <td :class="{'green':item.type == 'buy','red':item.type == 'sell'}">{{item.price*item.num | point}}</td>
        </tr>
        <tfoot v-if="newstexchange.length==0">
        <tr>
          <td colspan="5" style="text-align: center;padding:20px 0;">
            <img src="../assets/img/nodata.png" alt="">
            <div>暂无数据</div>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>


    <el-dialog title="输入交易密码" :visible.sync="dialogFormVisible" width="500px" @close="close">
      <form style="width: 300px;margin: 0 auto;" class="dialogForm">
        <div>
          <div style="color:#FFFFFF;text-align: center;" v-if="login">
            您还没有登录，请先进行登录
          </div>
          <div>
            <input type="password" style="width: 100%;height: 28px;outline: none;border: none;border-radius: 3px;padding-left: 10px;box-sizing: border-box;" v-model="form.pwd" ref="exchangePwdInput">
            <span class="forPwd" @click="forgetPwd">忘记密码</span>
            <el-button @click="dialogSure" type="primary" :disabled="!form.pwd || exchangeDisable">确定</el-button>
          </div>
        </div>
      </form>
    </el-dialog>
    <el-dialog title="免输入交易密码设置" :visible.sync="dialogFormVisible1" width="500px" @close="formPwd.inputCode='';">
      <form style="width: 300px;margin: 0 auto;" class="dialogForm">
        <div style="width: 100%;border:1px solid #979797;" class="exInputDia">
          <el-radio-group v-model="radio2" @change="changePwdType">
            <div class="elRadio">
              <el-radio :label="2">不验证</el-radio>
              <span class="elRadioSpan">交易密码</span>
            </div>
            <div class="elRadio">
              <el-radio :label="1">每两个小时验证一次</el-radio>
              <span class="elRadioSpan">交易密码</span>
            </div>
            <div style="padding: 8px 10px;width:300px;box-sizing: border-box;">
              <el-radio :label="0">每次都验证</el-radio>
              <span class="elRadioSpan">交易密码</span>
            </div>
          </el-radio-group>
        </div>
        <div style="margin: 30px 0 20px 0;">
          <input type="number" placeholder="请输入验证码" class="codeStylePwd" v-model="formPwd.inputCode" @input="inputCode">
          <span class="reSendCodePwd">
              <el-button type="primary" :disabled="formPwd.codeDisable"  @click="sendCode" >{{sendSureCode}}</el-button>
            </span>
        </div>
        <div>
          <el-button @click="editPwdStatus" type="primary" :disabled="formPwd.disable">确定</el-button>
        </div>
      </form>
    </el-dialog>
  </div>
</template>
<script>
  import 'jquery'
  import Kline from 'kline';
  export default{
    data () {
      return {
        radio2: 0,
        setPwdType:{},
        page:{
          current:1,
          total:0
        },
        items: [],
        changeSpecialArea:[],  //货币列表
        placemodel:{buy:'0.0000',num:0,totalPrice:'交易总额必须不小于0.0001才能交易'},
        inputmodel:{buy:'',num:'',totalPrice:'',handFee:0},
        buyDateOri:[],
        buyDate:[],
        newstexchange:[],
        percent:[{data1:'1/5'},{data1:'2/5'},{data1:'3/5'},{data1:'4/5'},{data1:'全部'}],
        seleIndex:-1,
        areaId:this.$route.params.area_currency_id,  //areaId  currencyId
        currencyId:this.$route.params.currency_mark,  //
        listDownUp:false,
        firstData:{trade:{}},
        listBackground:0,
        type:'pend',
        sellDateOri:[],
        sellDate:[],
        myOrderAndTradeDate:[],
        showMyOrAndTraDate:[],
        buySellType:'buy',
        login:false,
        exchangeDisable:false,
        ableBuySell:'',
        dialogFormVisible:false,//弹框控制
        dialogFormVisible1:false,//弹框控制
        form: {
          pwd: ''
        },
        formPwd: {
          pwd: '',
          inputCode:"",
          pwdType:'noNeed',
          disable:true,
          codeDisable:false,
        },
        timer:'',
        buySellWord:{
          price:'买入价格',
          num:'买入数量',
          butt:'确认买入'
        },
        webDate:{body:{}},
        kline:{},
        buy_fee:'',
        scrollTop:'',
        newstChange:true,
        buyPrice:'',//用户点击输入密码的的时候的价格
        sendSureCode:'发送邮箱验证码',
        combineData:[{len:4},{len:3},{len:2},{len:1}],
        value6:4,
        inputValuePoint:4,
      }
    },
    created(){
      this.$nextTick(function(){
        var that = this;
        setTimeout(function(){
          var clientWidth = document.body.clientWidth;
          clientWidth = clientWidth>1170?1170:clientWidth;
          clientWidth = clientWidth<1000?1000:clientWidth;
          that.kline = new Kline({
            element: "#kline_container",
            width: clientWidth,
            height: 600,
            theme: 'dark', // light/dark
            language: 'zh-cn', // zh-cn/en-us/zh-tw
            ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
            symbol: that.areaId + '/' + that.currencyId,
            symbolName: that.areaId + '/' + that.currencyId,
            type: "poll",
            url: (window.location.host.indexOf('192.168') == -1 && window.location.host.indexOf('127.0') == -1)?window.location.protocol+"//"+window.location.host+"/Api/Area/getOrdersKline1":'http://www.bjex.io/Api/Area/getOrdersKline1',
            limit: 1000,
            intervalTime: 5000,
            debug: false,
            showTrade: false,
            onResize: function(width, height){}
          });

          that.kline.draw();
        },100)
      });
      var that = this;
      that.area_currency_member(that.$route.params.currency_mark,that.$route.params.area_currency_id);
      this.initWebSocket()
    },
    beforeRouteLeave(to,form,next){
      this.kline.pause();
      this.websocketclose();
      next();
    },
    methods:{
      initWebSocket(){
        if(window.location.host.indexOf('192.168') == -1 && window.location.host.indexOf('127.0') == -1){
//            var webSocketUrl = 'wss:'+this.resUrl('online').ws;
          var webSocketUrl = this.resUrl('online')
        }else{
//            var webSocketUrl = "ws:"+ this.resUrl().ws;
          var webSocketUrl = this.resUrl()
        }
        webSocketUrl.then((res)=>{
          var webSocketUrl = res.ws;
          this.websock = new WebSocket(webSocketUrl);
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
        })
      },
      websocketonmessage(e){
        var response = JSON.parse(e.data);
        if(response.type && response.type == "ping"){
          this.websock.send(JSON.stringify({type:'pong'}));
          return;
        }
        if(response.login == 'success'){
          var room_id = this.$route.params.area_currency_id  + '/' + this.$route.params.currency_mark;
          this.websock.send(JSON.stringify({type:'login',name:'currency',room_id:room_id}));
          return;
        }
        if(response.login == 'out_success'){
          this.scrollTop = '';
          this.websock.send(JSON.stringify({type:'login',name:'currency',room_id:this.areaId  + '/' + this.currencyId}));
          return;
        }
        if(!response.login || response.login != 'success'){
          this.handWebRes(response)
        }
      },
      websocketclose(e){
        this.websock.close();
      },
      changePoint(data){
        this.buyDate = this.combine(this.buyDateOri,data);
        this.sellDate = this.combine(this.sellDateOri,data);
      },
      combine(item,type){
        var item = JSON.parse(JSON.stringify(item));
        var arr = [];
        var obj = [];
        for(var i = 0;i<item.length;i++){
          var arrPrice = item[i].price.split('.');
          if(arrPrice.length){
            var itemValue = arrPrice[0] + '.' + arrPrice[1].slice(0,type);
          }else{
            var itemValue = item[i].price;
          }
          var index = arr.indexOf(itemValue);
          if(index == -1){
            arr.push(itemValue);
            item[i].price = itemValue;
            obj.push(item[i]);
          }else{
            obj[index].num = obj[index].num + item[i].num;
          }
        }
        return obj;
      },
      handWebRes(response){
        this.newstChange = false;
        var that = this;
        var indexUnderLine = 0;
        this.webDate = response;
        this.buyDateOri = response.body.list.buy;
        this.sellDateOri = response.body.list.sell;
        this.buyDate = this.combine(this.buyDateOri,this.value6);
        this.sellDate = this.combine(this.sellDateOri,this.value6);
        this.newstexchange = response.body.list.orders.body;
        this.changeSpecialArea = response.body.home.filter(function(data,index){
          if(data.currency_mark == that.areaId){
            indexUnderLine = index;
            return data;
          }
        })[0].list;
        this.changeSpecialArea.filter(function(data,index){
          if(data.currency_mark == that.currencyId){
            that.firstData = data;
            that.listBackground = index;
          }
        });
        var div = document.getElementById('data-list-content');
        if(!that.scrollTop){
          setTimeout(function(){
            that.scrollTop = that.sellDate.length * 21 - 190;
            div.scrollTop = that.scrollTop;
          })
          that.$nextTick(function(){
            if(that.$refs.underline){
              that.$refs.underline.style.left = 145*indexUnderLine + 'px';
            }
          })
        }
      },
      noInputPwd(){   //点击文字  弹出框
        if(!this.login){
          this.radio2 = Number(this.setPwdType.pwdtrade_type);
          this.dialogFormVisible1 = true;

          clearTimeout(this.timer);
          this.sendSureCode = '发送邮箱验证码';
          this.formPwd.codeDisable = false;

        }else{
          this.$notify({
            title: '请先进行登录',
            type: 'warning'
          });
        }
      },
      changePwdType(data){
        this.radio2 = data;
      },
      inputCode(){
        var reg = this.regex().code;
        if(reg.test(this.formPwd.inputCode)){
          this.formPwd.disable = false;
        }else{
          this.formPwd.disable = true;
        }
      },
      editPwdStatus(){   //发送请求 修改状态
        this.formPwd.disable = true;
        var that = this;
        this.interFace('pwdtrade_type',{
          type:this.radio2,
          code:this.formPwd.inputCode,
        }).then(function(res){
          that.formPwd.disable = false;
          if(!res.body){
            that.$notify({
              title: '设置成功',
              type: 'success'
            });
            that.dialogFormVisible1 = false;
            that.formPwd.inputCode='';
            that.area_currency_member(that.currencyId,that.areaId);

          }
        })
      },
      sendCode(){   //获取验证码
        var that = this;
        this.formPwd.codeDisable = true;
        this.interFace('pwdtrade_email',{}).then(function(res){
          if(!res.body){
            that.sendSureCode = 60;
            that.timer = setInterval(function(){
              that.sendSureCode--;
              if(that.sendSureCode == -1){
                clearTimeout(that.timer);
                that.sendSureCode = '发送验证码';
                that.formPwd.codeDisable = false;
              }
            },1000);
            that.$notify({
              title: '邮箱验证码发送成功',
              type: 'success'
            });
          }else{
            that.formPwd.codeDisable = false;
          }
        })
      },
      forgetPwd(){
        this.$router.push({name:'forgetChangePwd'})
      },
      dialogSure(){   //输入密码之后确认买入  或卖出
        this.dialogFormVisible = true;
        this.exchangeTrade()
      },
      exchangeTrade(){
        var that = this;
        var type = this.buySellType== 'buy'?'buy':'sell';
        that.exchangeDisable = true;
        this.interFace('currency_trade',{
          area_name:that.areaId,
          currency_name:that.currencyId,
          tradeprice:that.buyPrice,
          tradenum:that.inputmodel.num,
          tradepwd:that.form.pwd,
          trade:type
        }).then(function(res){
          that.exchangeDisable = false;
          if(!res.body){
            that.$notify({
              title: '挂单成功',
              type: 'success'
            });
            that.dialogFormVisible = false;
            that.form.pwd = '';
            that.inputmodel.buy = '';
            that.inputmodel.num = '';
            that.inputmodel.totalPrice = '';
            that.inputmodel.handFee = 0;
            if(that.type == 'pend'){
              that.area_currency_member(that.currencyId,that.areaId);
            }
          }else{
            that.$notify.error({
              title: res.body,
            });
          }
        })
      },
      close(){
        this.form.pwd = '';
      },
      tbodyTdClick(type1,type2,priceNum){
        this.buySellInput(type2,String(priceNum))
      },
      buySellInput(type,value){
        this.seleIndex = -1;
        switch(type)
        {
          case 'price':
            this.inputmodel.buy = value;
            var pointBit = value.split('.')[1];
            if(pointBit && pointBit.length>this.inputValuePoint){
              this.inputmodel.buy = value.split('.')[0]+'.'+pointBit.slice(0,this.inputValuePoint)
            }
            if(this.inputmodel.num*1){
              this.inputmodel.totalPrice = this.inputmodel.num * value == 0?'':this.inputmodel.num * value;
              if(this.inputmodel.totalPrice*1){
                this.inputmodel.totalPrice = this.inputmodel.totalPrice.toFixed(this.inputValuePoint)
              }
            }else{
              this.inputmodel.totalPrice = '';
            }
            break;
          case 'num':
            this.inputmodel.num = value;
            var pointBitNum = value.split('.')[1];
            if(pointBitNum && pointBitNum.length>this.inputValuePoint){
              this.inputmodel.num = value.split('.')[0]+'.'+pointBitNum.slice(0,this.inputValuePoint)
            }
            if(this.inputmodel.buy){
              if(this.inputmodel.buy * this.inputmodel.num){
                this.inputmodel.totalPrice = this.inputmodel.buy * this.inputmodel.num
              }else{
                this.inputmodel.totalPrice = '';
                return;
              }
              this.inputmodel.totalPrice = this.inputmodel.totalPrice.toFixed(this.inputValuePoint)
            }else{
              this.inputmodel.totalPrice = '';
            }
            break;
        };
        this.handFeeFn();
      },
      handFeeFn(){
        if(this.inputmodel.totalPrice *1){
          if(this.buySellType == 'buy'){
            this.inputmodel.handFee = this.inputmodel.num * this.buy_fee / 100;
          }else{
            this.inputmodel.handFee = this.inputmodel.totalPrice * this.buy_fee / 100;
          }
        }else{
          this.inputmodel.handFee = 0;
        }
      },
      seleBut(index){
        this.seleIndex = index;
        if(this.buySellType == 'buy'){
          this.inputmodel.totalPrice = this.ableBuySell / 5 * (index + 1);
          if(this.inputmodel.totalPrice*1){
            if(this.inputmodel.buy*1){
              this.inputmodel.num = this.inputmodel.totalPrice / this.inputmodel.buy;
              this.handFeeFn();
            }else{
              if(this.inputmodel.num*1){
                this.inputmodel.buy = this.inputmodel.totalPrice / this.inputmodel.num;
                this.handFeeFn();
              }else{
                this.inputmodel.buy = '';
              }
            }
          }else{
            if(this.inputmodel.buy){
              this.inputmodel.num = '';
            }
          }
        }else{
          this.inputmodel.num = this.ableBuySell / 5 * (index + 1);
          if(this.inputmodel.num*1){
            if(this.inputmodel.buy*1){
              this.inputmodel.totalPrice = this.inputmodel.num * this.inputmodel.buy;

            }else{
              this.inputmodel.totalPrice = '';
            }
          }else{
            this.inputmodel.totalPrice = '';
          }
          this.handFeeFn();
        }
      },
      chooseList(data,index){  //选择下拉列表
        if(data.currency_id != this.firstData.currency_id){
          this.websock.send(JSON.stringify({type:'out',name:'currency',room_id:this.areaId  + '/' + this.currencyId}));
          this.firstData = data;
          this.listBackground = index;
          this.currencyId = data.currency_mark;
          var that  = this;
          if(!this.login){
            this.area_currency_member(this.currencyId,this.areaId);
          }
          this.kline.setSymbol(that.areaId+'/'+that.currencyId);
          this.inputmodel = {buy:'',num:'',totalPrice:'',handFee:0};
        }else{return}
      },
      downList(){   //小箭头旋转
        if(!this.listDownUp){
          this.$refs.arrow.style.transform = 'rotate(180deg)';
        }else{
          this.$refs.arrow.style.transform = 'rotate(0deg)';
        }
        this.listDownUp = !this.listDownUp;
      },
      chooseSpicalArea(data,index){  //选择交易区
        if(data.currency_mark == this.areaId){
          return;
        }else{
          this.websock.send(JSON.stringify({type:'out',name:'currency',room_id:this.areaId + '/' + this.currencyId}));
          this.areaId = data.currency_mark;
          this.$refs.underline.style.left = 145*index + 'px';
          var that = this;
          this.listBackground = 0;
          this.currencyId = this.firstData.currency_mark;
          this.changeSpecialArea = this.webDate.body.home.filter(function(data){
            if(data.currency_mark == that.areaId){
              return data;
            }
          })[0].list;
          this.firstData = this.changeSpecialArea[that.listBackground];
          this.currencyId = this.firstData.currency_mark;
          this.getOrdersMember_name();
          this.kline.setSymbol(that.areaId+'/'+that.currencyId);
          this.inputmodel = {buy:'',num:'',totalPrice:'',handFee:0};
        }
      },
      area_currency_member(currencyId,areaId){  //获取我的挂单和我的成交
        var that = this;
        this.interFace('area_currency_member',{
          currency_name:currencyId,
          area_currency_name:areaId
        }).then(function (res) {
          if(res.body && res.body == "未登录"){
            that.login = true;
            return;
          }
          that.radio2 = Number(res.member.pwdtrade_type);
          that.setPwdType = res.member;
          that.myOrderAndTradeDate = res;
          if(that.type == 'pend'){
            that.showMyOrAndTraDate = res.orders.body;
            that.page.total = res.orders.list;
          }else{
            that.showMyOrAndTraDate = res.trade.body;
            that.page.total = res.trade.list;
          }
          if(that.buySellType == 'buy'){
            that.ableBuySell = res.area_currency.num;
            that.buy_fee = res.buy_fee;
          }else{
            that.ableBuySell = res.currency.num;
            that.buy_fee = res.sell_fee;
          }
        })
      },
      mySellBuy(data,index){  //点击我的挂单  我的成交
        if(data == this.type){
          return;
        }else{
          this.type = data;
          this.$refs.underLine1.style.left = 0 + 94*index + 'px';
          if(this.page.current != 1){
            this.page.current = 1;
          }else{
            this.getOrdersMember_name();
          }
        }
      },
      getOrdersMember_name(){
        if(sessionStorage.getItem('loginState') == 1){
          var that = this;
          this.interFace('getOrdersMember_name',{
            type:that.type == 'pend'?'orders':'status',
            list:that.page.current - 1,
            value:5,
            currency_name:that.currencyId,
            area_currency_name:that.areaId,
          }).then(function(res){
            that.showMyOrAndTraDate = res.body
          })
        }
        else{
          return
        }
      },
      getOrderTeade(data){
        this.page.current = data;
        this.getOrdersMember_name()
      },
      buySell(data){  //获取买入 卖出
        if(this.buySellType == data){
          return
        }else{
          this.seleIndex = -1;
          this.buySellType = data;
          this.inputmodel = {buy:'',num:'',totalPrice:'',handFee:0};
          if(data == 'buy'){
//            this.$refs.buySell.style.left = '98px';
            this.buySellWord = {
              price:'买入价格',
              num:'买入数量',
              butt:'确认买入'
            }
            this.ableBuySell = this.myOrderAndTradeDate.area_currency.num;
            this.buy_fee = this.myOrderAndTradeDate.buy_fee;
          }else{
//            this.$refs.buySell.style.left = '343px';
            this.buySellWord = {
              price:'卖出价格',
              num:'卖出数量',
              butt:'确认卖出'
            }
            this.ableBuySell = this.myOrderAndTradeDate.currency.num;
            this.buy_fee = this.myOrderAndTradeDate.sell_fee;
          }
        }
      },
      buyOrSell(){
        var that =this;

        if(this.login || this.exchangeDisable){
          that.$message({
            message: '请先进行登录',
            type: 'warning'
          });
          return
        }
        if(this.inputmodel.buy && this.inputmodel.num && this.inputmodel.totalPrice >= 0.0001){
          if(that.setPwdType.pwdtrade_type == '2'){//不验证
            that.buyPrice = this.inputmodel.buy;
            this.exchangeTrade();
          }else if(that.setPwdType.pwdtrade_type == '0'){  //每次都验证
            this.dialogFormVisible = true;
            this.$nextTick(function(){
              that.$refs.exchangePwdInput.focus();
              that.buyPrice = this.inputmodel.buy;
            })
          }else if(that.setPwdType.pwdtrade_type == '1'){  //两小时之内验证
            var timestamp = Date.parse(new Date());
            if(timestamp>that.setPwdType.pwdtrade_time*1000){
              this.dialogFormVisible = true;
              this.$nextTick(function(){
                that.$refs.exchangePwdInput.focus();
                that.buyPrice = this.inputmodel.buy;
              })
            }else{
              that.buyPrice = this.inputmodel.buy;
              this.exchangeTrade();
            }
          }
        }else{
          var tip = '';
          if(!this.inputmodel.buy){
            tip = '请先输入交易价格,才能交易'
          }else if(!this.inputmodel.num){
            tip = '请先输入交易数量,才能交易'
          }else if(this.inputmodel.totalPrice*1 < 0.0001){
            tip = '交易总额必须不小于0.0001,才能交易'
          }
          that.$message({
            message: tip,
            type: 'warning'
          });
        }
      },
      cancelOrder(item,index){  // 撤单
        var that = this;
        that.showMyOrAndTraDate[index].disable = true;
        this.interFace('cancel',{
          order_id:item.orders_id
        }).then(function(){
          that.showMyOrAndTraDate[index].disable = false;
          that.showMyOrAndTraDate.splice(index, 1);
        })
      }
    }
  }
</script>
<style>
  .gear tr {
    display:block;
  }
  .gear thead tr{
    line-height:50px;

  }
  .gear tbody {
    display: block;
    height: 190px;
    overflow: auto;
    font-size: 0;
  }
  .gear tr td,.gear th {
    display: inline-block;
    font-size: 12px;
    float: left;
    width:27%;
    box-sizing: border-box;
  }
  .gear th:nth-of-type(1),.gear tr td:nth-of-type(1){
    width:10%;
  }
  .gear th:nth-last-of-type(1){
    width:9%;
    padding-right: 1%;
  }
  .exInputDia .el-radio{
    color: rgb(255, 255, 255);
  }
  .exInputDia .el-radio{
    display:inline;
  }
  #container .el-dialog{
    background: #21201A;
  }
  .codeStylePwd{
    width: 160px;
    border: none;
    outline: none;
    height: 28px;
    border-radius: 3px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .elRadio{
    padding: 8px 10px;
    border-bottom: 1px solid #979797;
    width:300px;
    box-sizing: border-box;
  }
  .elRadioSpan{
    color:#FFFFFF;
    padding-left: 10px;
  }
  .forPwd{
    display: inline-block;
    float: right;
    text-align: right;
    color: #FFFFFF;
    cursor: pointer;
  }
  #container .el-dialog__header{
    text-align: center;
  }
  #container .el-dialog__title{
    color: #FFFFFF;
  }
  .dialogForm button{
    width: 300px;
    height: 30px;
    line-height: 30px;
    padding:0;
  }
  .reSendCodePwd button{
    height: 30px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    float: right;
    position: absolute;
    margin-left: 10px;
    width:130px;
  }
  .dialogForm .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
  .ulTop{
    margin-left: 31px;
  }
  .ulTop>li{
    margin-right: 70px;
    cursor: pointer;
  }
  .firstLi{
    width: 34%;
    position: relative;
    padding: 14px 21px 13.7px 33px;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    background: #F7F7F7;
    height: 84px;
    cursor: pointer;
  }
  .firstLi>div:nth-of-type(1){
    display: inline-block;
    text-align: left;
    color:#101010;
    width: 60px;
    margin-right: 30px;
  }
  .arrow{
    display: inline-block;
    float: right;
    transform: rotate(0deg);
    transition: all 0.5s;
  }
  .width{
    width: 22%;
    text-align: center;
    border-left: 1px solid #CCCCCC;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    height: 84px;
    vertical-align: top;
    padding: 9px 0;
  }
  .width>div:nth-of-type(1){
    font-size: 14px;color: #AA9882;
  }
  .listBackCo{
    background: #D8D8D8!important;
  }
  .width>div:nth-of-type(2){
    font-size: 16px;
  }
  .liUl{
    position: absolute;
    top: 91px;
    border: 1px solid #CCCCCC;
    left: 0;
    width: 100%;
    z-index: 5;
    max-height:500px;
    overflow: auto;
  }
  .liUl>li{
    padding: 14px 21px 13.7px 23px;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    background: #F7F7F7;
    height: 84px;
    border-bottom: 1px solid  #FFFFFF;
  }
  .liUlfirdiv{
    display: inline-block;
    text-align: left;
    color:#101010;
    width: 77px;
  }
  .underLine{
    border-bottom:2px solid #E2CDAA;
    width:73px;
    position: relative;
    left:0;
    top:-5px;
    transition: all 0.5s;
  }
  .underLine1{
    border-bottom:2px solid #E2CDAA;
    width:56px;
    position: relative;
    left:0;
    top:-5px;
    transition: all 0.5s;
  }
  .ulCenter{
    font-size: 0px;
    border: 1px solid #CCCCCC;
    height: 84px;
  }
  .ulTop>li,.ulCenter>li{
    display: inline-block;
    font-size: 12px;
  }
  .buySell{
    border-bottom:2px solid #E2CDAA;
    width:48px;
    position: relative;
    left:98px;
    top:-9px;
    transition: all 0.5s;
  }
  .buySellHead{
    cursor: pointer;
  }
  .header{
    height: 60px;
    line-height: 60px;
    background: #21201A;
    color:#FFFFFF;
  }
  .num{
    color: #00CC66;
    display: inline-block;
  }
  .num>span:nth-child(1){
    font-size: 22px;
  }
  .num>span:nth-child(2){
    font-size: 14px;
  }

  .echart-tops{
    /*height: 36px;*/
    /*line-height: 36px;*/
    background: #F7F7F7;
    border-bottom: 1px solid #CCCCCC;
    letter-spacing: 0;
  }
  .echart-tops>span:nth-of-type(1){
    margin-left: 33px;
    color:#222222;
  }
  .time{
    display: inline-block;
    margin-left: 32px;
  }
  .time>li{
    display: inline-block;
    color: #B5ACA4;
    margin-right: 13px;
  }
  .buyleft,.buyrigth{
    width:48%;
    border: 1px solid #CCCCCC;
    height: 460px;
    float: left;
  }
  .buyrigth{
    float: right;
  }
  .buyrigth>table{
    width: 100%;
  }
  .buyrigth tbody{
    text-align: center;
    color:#009966;
  }
  .buyrigth tbody:nth-of-type(1){
    color: #CC0000;
  }
  .right-top tr{
    height: 50px;
  }
  th{
    font-weight: normal;
  }
  tbody tr{
    height: 17px;
    margin-bottom: 4px;
  }
  .left-top,.right-top{
    height: 50px;
    background: #21201A;
    color: #FFFFFF;
  }
  .left-top > ul{
    font-size: 0;
    height: 100%;
    line-height: 50px;
    text-align: center;
  }
  .left-top > ul >li{
    display: inline-block;
    width: 50%;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    font-size: 14px;
  }
  .left-content{
    width: 385px;
    margin:0 auto;
    padding:15px 0 39px 0;
  }
  .con-fir{
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #222222;
    letter-spacing: 0;
    margin-bottom: 15px;
  }
  .con-fir>span:nth-of-type(2){
    float: right;
    color: #AA9882;
  }
  .buyDetail>li{
    margin-bottom: 20px;
    border: 1px solid #999999;
    border-radius: 3px;
    background: #FFFFFF;
    height: 40px;
    line-height: 40px;
  }
  .buyDetail>li>span:nth-of-type(1){
    padding-left:13px;
    color: #999999;
  }
  .buyDetail>li>span:nth-of-type(2){
    float: right;
    padding-right: 13px;
  }
  .buyDetail>li:nth-of-type(3){
    margin-bottom: 30px;
  }
  .sureBuy button{
    margin:30px 0 13px 0;
    text-align: center;
    background: #AD9C86;
    border-radius: 3px;
    padding:12px 0;
    color: #FFFFFF;
    width:100%;
    border-radius: 3px;
  }
  .inputSty{
    text-align:right;
    float: right;
    height: 96%;
    border: none;
    outline: none;
    margin-right: 13px;
    width:262px;
  }
  .ulLiBtn{
    display: inline-block;
    margin-right: 18.7px
  }
  .ulLiBtn:nth-of-type(5){
    margin-right: 0;
  }
  .newstex>tr>td{
    border-bottom: 1px solid #EDEDED;
    height: 40px;
    line-height: 40px;
  }
  .my-table-top{
    padding-left: 33px;
    height: 40px;
    line-height: 40px;
    background: #21201A;
    font-size: 14px;
    border-bottom: 2px solid #373631;
  }
  .my-table-top>li{
    display: inline-block;
    margin-right: 33px;
    cursor: pointer;
  }
  .my-tbody>tr{
    border-bottom: 1px solid  #6C6863;
    height: 40px;
  }
  .cancelOrder{
    /*border: 1px solid #CEC6BE;*/
    /*border-radius: 2px;*/
    /*width: 48px;*/
    /*height: 22px;*/
    /*line-height: 22px;*/
    /*display: inline-block;*/
    /*cursor: pointer;*/
  }
  .cancelOrder button{
    width: 48px;
    height: 22px;
    line-height: 22px;
    padding:0;
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.3s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateX(300px);
  }
  .flip-list-move {
    transition: transform 0.3s;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  .ex-button button:hover{
    background: #AD9C86;
    color: #FFFFFF;
  }
  .ex-button button{
    width:62px;
  }
  .buttClass{
    background: #AD9C86;
    color: #FFFFFF;
  }
  .green{
    color: #009966;
  }
  .red{
    color: #CC0000;
  }
  input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
    -webkit-appearance:textfield;
  }
  input[type="number"]{
    -moz-appearance:textfield;
  }
  .buyAndSellStyle{
    display: inline-block;
    width: 60px;
    height: 45px;
  }
  .borderBottom{
    border-bottom: 2px solid #E2CDAA;
  }
  .seleCombine .el-input__inner{
    background: #21201A;
    border:none;
    width:40px;
    padding-left: 0;
    color: #FFFFFF;
  }
  .seleCombine .el-select:hover{
    border:none;
  }
</style>
