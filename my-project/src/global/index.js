/**
 * Created by gm on 2017/12/21.
 */
export default{
  install(Vue){
    var global = {
      user_registered:'Api/User/user_registered',//注册接口
      user_email:'Api/User/user_email',//注册邮箱接口
      user_login:'Api/User/user_login',//登录接口
      user_pass:'Api/User/user_pass',//找回密码
      user_email_pass:'Api/User/user_email_pass',//修改密码邮箱接口
      user_find:'Api/User_index/user_find',//个人信息查询（需登录）
      user_head:'Api/User_index/user_head',//上传头像
      trend_list:'Api/New_trend/trend_list',//获取最新动态列表
      trend_find:'Api/New_trend/trend_find',//获取单条动态详细内容接口
      banner:'Api/Home/banner',//获取banner图接口
      user_type:'Api/User_index/user_type',//个人信息状态获取
      user_check_first:'Api/User_index/user_check_first',//用户初级认证
      user_check_last:'Api/User_index/user_check_last',//高级认证提交接口
      user_check_code:'Api/User_index/user_check_code',//手机号获取验证码（设置个人资料）
      user_check_phone:'Api/User_index/user_check_phone',//设置手机号
      user_check_pass:'Api/User_index/user_check_pass',//设置支付密码
      user_remove_phone:'Api/User_index/user_remove_phone',//解绑手机号
      user_remove_pass:'Api/User_index/user_remove_pass',//解绑交易密码
      download_list:'Api/Download/download_list',//下载中心
      currency_list:'Api/Area/currency_list',//获取指定专区内货币列表
      currency_trade:'Api/Trade/currency_trade',//买入或卖出货币
      area_list:'Api/Area/area_list',//获取专区列表
      getOrdersKline:'Api/Area/getOrdersKline',//获取K线图
      getOrdersByStatusc:'Api/Area/getOrdersByStatusc',//获取指定货币的委托订单记录
      getOrdersByBuySell:'Api/Area/getOrdersByBuySell',//获取买卖委托单
      area_currency_member:'Api/User_index/area_currency_member',//交易界面获取个人资产及对应委托交易记录
      cancel:'Api/Trade/cancel',//交易页撤单
      pay_money:'Api/User_index/pay_money',//获取所有货币及账户余额
      getOrdersMember:'Api/User_index/getOrdersMember',//获取更多个人委托单或已成交订单
      myDeal:'Api/User_index/myDeal',//获取个人财务记录
      bpay:'Api/User_index/bpay',//获取提币地址
      tcoin:'Api/Pay/tcoin',//提币接口
      sign_out:'Api/User_index/sign_out',//退出登录
      invite:'Api/User_index/invite',//邀请好友接口
      bottom_find:'Api/Home/bottom_find',//获取底部关于我们详情页
      bottom_list:'Api/Home/bottom_list',//获取底部关于我们列表及缩略图
      bottom:'Api/Home/bottom',//网页端底部导航及推广关键词
      sysmessage:'Api/User_index/sysmessage',//获取个人消息接口
      delete_message:'/Api/User_index/delete_message',//删除用户消息接口
      insert_currency_url:'/Api/Pay/insert_currency_url',//添加提币地址
      select_currency_url:'/Api/Pay/select_currency_url',//获取提币货币地址
      url_code:'/Api/Pay/url_code',//获取验证码   不需要手机号
      delete_currency_url:'/Api/Pay/delete_currency_url',//删除提币地址
      tcoin:'/Api/Pay/tcoin',//提币接口
      currency_select:'/Api/User_index/currency_select',//获取货币种类
      sysmessage_find:'/Api/User_index/sysmessage_find',//个人消息详情页
      query_message:'/Api/User_index/query_message',//个人消息设置已读接口
      user_check_email:'Api/User_index/user_check_email',//用户忘记交易密码获取验证码
      user_check_passup:'Api/User_index/user_check_passup',//用户忘记交易密码获取验证码
      getOrdersMember_name:'/Api/User_index/getOrdersMember_name',
      tichu_push:'Api/Trade/tichu_push',//一键转入push
      work_list:'Api/User_work/work_list',//获取工单列表
      work_count:'Api/User_work/work_count',//提交工单页面获取数量
      insert_work_comment:'Api/User_work/insert_work_comment',//回复工单
      update_status_work:'Api/User_work/update_status_work',//删除工单
      insert_work:'Api/User_work/insert_work',//提交工单页面提交工单
      work_find:'Api/User_work/work_find',//工单详细信息查看
      work_comment:'Api/User_work/work_comment',//工单查看更多回复
      feedback_count:'Api/User_work/feedback_count',//意见反馈按钮页获取数量
      feedback_list:'Api/User_work/feedback_list',//意见反馈列表获取
      insert_feedback:'Api/User_work/insert_feedback',//提交意见反馈
      feedback_find:'Api/User_work/feedback_find',//意见反馈查看详情
      update_status_feedback:'Api/User_work/update_status_feedback',//修改意见反馈状态
      orders_ranking:'Api/Area/orders_ranking',//排名活动
      lottery:'Api/Lottery/lottery',//抽奖活动
      lottery_num:'Api/Lottery/lottery_num',//抽奖机会接口
      pwdtrade_email:'Api/User_index/pwdtrade_email',//设置交易面获取邮箱验证码
      pwdtrade_type:'Api/User_index/pwdtrade_type',//设置交易面状态
      code_member_back_card:'Api/User_index/code_member_back_card',//设置银行卡获取手机验证码
      insert_member_back_card:'Api/User_index/insert_member_back_card',//设置银行卡
      select_member_back_card:'Api/User_index/select_member_back_card',//获取个人银行卡接口
      delete_member_back_card:'Api/User_index/delete_member_back_card',//删除个人银行卡接口
      withdraw:'Api/Pay/withdraw',//银行卡提现
      withdraw_list:'Api/User_index/withdraw_list'//获取个人提现记录
    };
    Vue.prototype.resUrl = function(type){
      var url = type?'/exconfig':'/static/js/tsconfig.json';
      return new Promise((resolve, reject) => {
        this.$http.get(window.location.protocol +'//'+ window.location.host+url).then(function (response) {
          if(type == 'online'){//线上
            var obj = {interFaceUrl:window.location.protocol +'//'+ window.location.host+'/',ws:response.data.productionWebsock}
          }else{
            // var obj = {interFaceUrl:'/api/',ws:response.data.underLineWs};
            var obj = {interFaceUrl:'/api/',ws:response.data.onLineWs};
          }
          resolve(obj)
        })
      })
    }
    Vue.prototype.regex = function(){
      var obj = {
        phoneReg : /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
        code:/^\d{4}$/,
        email:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
        pwd:/^[a-zA-Z0-9]{6,20}$/,//6-20位的密码
        exchangePwd:/^\d{6}$/,//6位数的交易密码
      }
      return obj;
    }
    Vue.prototype.interFace = function(urlParam,params){
      if(window.location.host.indexOf('192.168') == -1 && window.location.host.indexOf('127.0') == -1){
        var url = window.location.protocol +'//'+ window.location.host+'/'+global[urlParam];
      }else{
        var url = '/api/'+global[urlParam];//'http://www.bjex/'+global[urlParam];
      }
      if(params){
        params.platform = 'web';
      }else{
        var params = {};
        params.platform = 'web';
      }
      var promise = new Promise((resolve, reject)=>{
        var that = this;
        var banAlert = ['bpay','select_currency_url','user_check_pass','currency_trade','insert_member_back_card','withdraw'] //禁止出弹出框的接口;
        var resData = ['user_registered','user_email','user_login','user_email_pass','tichu_push','tcoin','insert_work','update_status_work','insert_work_comment','user_check_pass','lottery_num','pwdtrade_email','pwdtrade_type','currency_trade','bpay','code_member_back_card','delete_member_back_card','withdraw','insert_member_back_card'];//需要返回值的接口
        this.$http.post(url,this.qs.stringify(params),{'xhrFields' : {withCredentials: true},crossDomain: true}).then(function(res){
          if(res.data.type != 1){
            if(res.data.type == 404){
              that.$router.push({name:'error'});
            }
            if(resData.indexOf(urlParam)>-1){
              resolve(res.data);
            }
            switch (res.data.body){
              case '未登录':
                that.$store.state.user_find_data = '';
                if(urlParam == 'area_currency_member'){
                  resolve(res.data);
                  return;
                }
                if(urlParam == 'sysmessage'){
                  return;
                }
                sessionStorage.clear();
                that.$router.push({name:'login'});
                return;
              case '资料不完整':
                that.$confirm('资料不完整,前往完善？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  lockScroll:false
                }).then(() => {
                  that.$router.push({name:'certifiState'});
                });
                return;
              case '请求次数频繁，请1小时后再试':
                resolve(res.data);
            }
            if(banAlert.indexOf(urlParam) == -1){
              that.$confirm(res.data.body, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                lockScroll:false
              }).then(() => {
                if(res.data.body == '未登录'){
                  that.$router.push({name:'login'})
                }else if(res.data.body == '未注册'){

                }else if(res.data.body == '资料不完整'){
                  that.$router.push({name:'certifiState'})
                }
              }).catch(() => {});
            }else{
              resolve(res.data.body || '请求失败')
            }
          }else{
            resolve(res.data.data)
          }
        }).catch(function(err){
          reject(err)
        })
      })
      return promise;
    };
    Vue.filter('time', function (value) {
      if (!value) return '';
      var timeTrans = new Date(parseInt(value) * 1000);
      return timeTrans.toLocaleString('chinese',{hour12:false})
    });
    Vue.filter('exchangeType',function(value){
      if (!value) return '';
      if(value == 'sell'){
        return '卖'
      }else{
        return '买'
      }
    })
    Vue.filter('cutOut',function(value,index){
      if (!value) return '';
      if(value.length > index){
        return value.substring(0,index) + '...'
      }
      return value.substring(0,index)
    })
    Vue.filter('finalStatus',function(value){
      if (!value) return '';
      switch(value)
      {
        case '0':
          return '提币中'
          break;
        case '1':
          return '提币成功'
          break;
        case '2':
          return '充币中'
          break;
        case '3':
          return '充币成功'
          break;
        default:
          return ''
      }
    })
    Vue.filter('withdraw',function(value){
      if (!value) return '';
      switch(value)
      {
        case '1':
          return '提现成功'
          break;
        case '2':
          return '提现失败'
          break;
        case '3':
          return '等待审核'
          break;
        default:
          return ''
      }
    })
    Vue.filter('point',function(value,bit,isFixZero){//isFixZero为真  不留0， 否则留零
      if (!value) {
        if(value === 0){
          if(isFixZero){
            return value;
          }
          return parseFloat(value).toFixed(8);
        }
        return '';
      }
      var lastValue;
      if(bit){
        lastValue = parseFloat(value).toFixed(bit)
      }else{
        lastValue = parseFloat(value).toFixed(8);
      }
      if(isFixZero){
        lastValue = Number(lastValue);
      }
      return lastValue;
    })
    Vue.filter('manageStatus',function(value){
      switch(value)
      {
        case "0":
          return '处理中';
          break;
        case "1":
          return '已完成';
          break;
        case "-1":
          return '已关闭';
          break;
        default:''
      }
    })
    Vue.filter('myAdviceFilter',function(value){
      switch(value)
      {
        case "0":
          return '处理中';
          break;
        case "1":
          return '已完成';
          break;
        default:''
      }
    })
    Vue.filter('hideEmail',function(value){
      if(value){
        var showValue1 = value.split('@')[0];
        var showValue2 = value.split('@')[1];
        if(showValue1.length>2){
          var showValue3 = showValue1[0]+ '*****'+ showValue1[showValue1.length - 1];
        }else{
          var showValue3 = showValue1;
        }
        return showValue3+ '@'+showValue2;
      }
      return ''
    })
    Vue.filter('gradeFil',function(value){
      if(value){
        var arr = ['一等奖','二等奖','三等奖','四等奖','五等奖'];
        return arr[Number(value) - 1];
      }
      return '';
    })
  }
}

