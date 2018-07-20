import Vue from 'vue'
import Router from 'vue-router'
import countCenter from '@/components/countCenter'
import announce from '@/components/announce'
import announceDetail from '@/components/announceDetail'
import newst from '@/components/newst'
import downloadCenter from '@/components/downloadCenter'
import MarkTradExchange from '@/components/MarkTradExchange'
import Exchange from '@/components/Exchange'
import login from '@/components/login'
import register from '@/components/register'
import detail from '@/components/detail'
import myProperty from '@/components/countCenter/countCenChi/myProperty'
import myChange from '@/components/countCenter/countCenChi/myChange'
import finalRecord from '@/components/countCenter/countCenChi/finalRecord'
import onlineService from '@/components/countCenter/countCenChi/onlineService'
import exit from '@/components/countCenter/countCenChi/exit'
import certification from '@/components/countCenter/countCenChi/certification'
import bindBank from '@/components/countCenter/countCenChi/bindBank'
import bindPhone from '@/components/countCenter/countCenChi/bindPhone'
import setPwd from '@/components/countCenter/countCenChi/setPwd'
import editPwd from '@/components/editPwd'
import myPropertyCurrency from '@/components/countCenter/countCenChi/myPropertyCurrency'
import certifiState from '@/components/countCenter/countCenChi/certifiState'
import myNews from '@/components/countCenter/countCenChi/myNews'
import invateFri from '@/components/countCenter/countCenChi/invateFri'
import changeImg from '@/components/countCenter/countCenChi/changeImg'
import management from '@/components/countCenter/countCenChi/management'
import submitOrder from '@/components/countCenter/countCenChi/submitOrder'
import managementDetail from '@/components/countCenter/countCenChi/managementDetail'
import about from '@/components/about'
import myNewsDetail from '@/components/myNewsDetail'
// import advice from '@/components/advice'
import myAdvice from '@/components/myAdvice'
import myAdviceDetail from '@/components/myAdviceDetail'
import forgetChangePwd from '@/components/countCenter/countCenChi/forgetChangePwd'
import editChangePwd from '@/components/countCenter/countCenChi/editChangePwd'
import cptRank from '@/components/cptRank'
import error from '@/components/error'
import reword from '@/components/reword'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/MarketTrad',
      name: 'MarketTrad',
      component:  resolve => require(['@/components/MarketTrad'], resolve),//懒加载
    },{
      path: '/home',
      name: 'home',
      component:  resolve => require(['@/components/home'], resolve),//懒加载
    },{
      path:'/countCenter',
      component:countCenter,
      children:[{
        path:'',
        name:'countCenter',
        component:myProperty,
        meta: { requiresAuth: true },
      },{
        path:'myChange',
        name:'myChange',
        component:myChange
      },{
        path:'finalRecord',
        name:'finalRecord',
        component:finalRecord
      },{
        path:'onlineService',
        name:'onlineService',
        component:onlineService
      },{
        path:'exit',
        name:'exit',
        component:exit
      },{
        path:'setPwd',
        name:'setPwd',
        component:setPwd
      },{
        path:'/forgetChangePwd',
        name:'forgetChangePwd',
        component:forgetChangePwd
      },{
        path:'/editChangePwd',
        name:'editChangePwd',
        component:editChangePwd
      },{
        path:'bindPhone',
        name:'bindPhone',
        component:bindPhone
      },{
        path:'certification',
        name:'certification',
        component:certification
      },{
        path:'bindBank',
        name:'bindBank',
        component:bindBank
      },{
        path:'certifiState',
        name:'certifiState',
        component:certifiState
      },{
        path:'myPropertyCurrency/:id/:mark/:evalute?',
        name:'myPropertyCurrency',
        component:myPropertyCurrency
      },{
        path:'management',
        name:'management',
        component:management
      },{
        path:'managementDetail/:id',
        name:'managementDetail',
        component:managementDetail
      },{
        path:'submitOrder',
        name:'submitOrder',
        component:submitOrder
      },{
        path:'myNews',
        name:'myNews',
        component:myNews
      },{
        path:'invateFri',
        name:'invateFri',
        component:invateFri
      },{
        path:'changeImg',
        name:'changeImg',
        component:changeImg
      }]
    },{
      path: '/newst',
      name: 'newst',
      component: newst
    },{
      path:'/downloadCenter',
      name:'downloadCenter',
      component:downloadCenter
    },{
      path:'/MarkTradExchange/:area_currency_id/:currency_mark',
      name:'MarkTradExchange',
      component:MarkTradExchange
    },{
      path:'/Exchange/:area_currency_id/:currency_mark',
      name:'Exchange',
      component:Exchange,
      meta:{exchange:true},
    },{
      path:'/login',
      name:'login',
      meta:{loginRegister:true},
      component:login
    },{
      path:'/register/:code?',
      name:'logregisterin',
      meta:{loginRegister:true},
      component:register
    },{
      path:'/detail',
      name:'detail',
      component:detail
    },{
      path:'/editPwd',
      name:'editPwd',
      component:editPwd
    },{
      path:'/about/:id',
      name:'about',
      component:about
    },{
      path:'/myNewsDetail/:id',
      name:'myNewsDetail',
      component:myNewsDetail
    },{
      path:'/myAdvice',
      name:'myAdvice',
      component:myAdvice,
      meta:{requiresAuth:true},
    },{
      path:'/myAdviceDetail/:id',
      name:'myAdviceDetail',
      component:myAdviceDetail,
      meta:{requiresAuth:true}
    },{
      path:'/advice',
      name:'advice',
      component:  resolve => require(['@/components/advice'], resolve),//懒加载
      meta:{requiresAuth:true}
    },{
      path:'/error',
      name:'error',
      component:error
    },{
      path:'/announceDetail',
      name:'announceDetail',
      component:announceDetail
    },{
      path:'/announce',
      name:'announce',
      component:announce
    },{
      path:'/cptRank',
      name:'cptRank',
      component:cptRank
    },{
      path:'/reword',
      name:'reword',
      component:reword
    },{
      path:'*',
      redirect: '/MarketTrad'
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
})

