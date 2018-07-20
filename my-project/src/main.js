// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Button ,Select,Option,DatePicker,Icon,MessageBox,Message,Loading,Table,TableColumn,Checkbox,CheckboxGroup,Dialog,Tooltip,Notification,Pagination,Input,Popover,RadioGroup,Radio,Slider} from 'element-ui'
import router from './router'
import axios from 'axios'
import global from './global'
import store from './store'
import qs from 'qs'

Vue.prototype.$http = axios;
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Tooltip)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Icon)
Vue.use(Loading.directive)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Popover)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Slider)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$loading = Loading.service
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.use(global)
import './assets/css/index.css';
import './assets/css/button.css';
import './assets/css/message-box.css';
import './assets/css/loading.css';
import './assets/css/table-column.css';
import './assets/css/table.css';
import './assets/css/checkbox.css';
import './assets/css/checkbox-group.css';
import './assets/css/dialog.css';
import './assets/css/notification.css';
import './assets/css/pagination.css';
import './assets/css/message.css';
import './assets/css/kline.css';
import './assets/css/input.css';
import './assets/css/popover.css';
import './assets/css/tooltip.css';
import './assets/css/radio.css';
import './assets/css/slider.css';
import './assets/css/radio-group.css';
Vue.prototype.qs = qs;
Vue.config.productionTip = false;
router.beforeEach(function(to, from, next){
  if(to.matched.some(function(data){return data.meta.requiresAuth})){
    if(sessionStorage.getItem('loginState')){
      next();
    }else{
      sessionStorage.clear();
      router.push({name:'login'})
    }
  }else{
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data:{},
  watch:{
    '$route': 'fetchData'
  },
  methods: {
    fetchData(newValue,oldValue){
      if(newValue.name == 'myNews'){
        return
      }
      if(newValue && newValue.matched.some(function(data){return !data.meta.loginRegister})){
        if(sessionStorage.getItem('loginState') == 1 && sessionStorage.getItem('noReadNews') != 1){
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
  },
  created(){}
})
