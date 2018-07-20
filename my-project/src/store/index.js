/**
 * Created by gm on 2017/12/12.
 */
import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
Vue.use(vuex);

export default new vuex.Store({
  state:{
    certification:false,
    bindPhone:false,
    bank_card:false,
    setPwd:false,
    phone_value:'',
    user_find_data:{},
    noReadNews:false,
    myPropertyStore:''
  },
  actions:{
    user_find(context){
      var that = this;
      if(window.location.host.indexOf('192.168') == -1 && window.location.host.indexOf('127.0') == -1){
        var url =  window.location.protocol +'//'+ window.location.host;
      }else{
        var url = '/api/';
      }
      axios({
        method: 'post',
        url: url+'/Api/User_index/user_find',
        data: 'platform=web'
      }).then(function(res){
        if(res.data.type == 530){
          sessionStorage.setItem('loginInfo','');
          sessionStorage.setItem('loginState',0);
          that.state.user_find_data = '';
        }else if(res.data.type == 1){
          that.state.user_find_data = res.data.data;
          sessionStorage.setItem('loginInfo',JSON.stringify(res.data.data))
          sessionStorage.setItem('loginState',1)
        }
      })
    }
  }
})
