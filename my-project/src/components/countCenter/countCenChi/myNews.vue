<template>
  <div>
    <countCenterRigHeader>
      <div style="position: relative;">
        <ul class="myNewsUlTab" ref="ulList">
          <li @click="myNewsTab('noRead',1)" >
            <span :class="{'sele':currentTab == 1}">未读消息</span><span style="color:red;">（{{noRead+'条'}}）</span>
          </li>
          <li @click="myNewsTab('Read',2)">
            <span :class="{'sele':currentTab == 2}">已读消息</span><span style="color:red;">（{{Read+'条'}}）</span>
          </li>
          <li @click="myNewsTab('allNews',0)">
            <span :class="{'sele':currentTab == 0}">我的消息</span>
          </li>
        </ul>
        <!--<i class="myNewsTab" ref="myNewsTab"></i>-->
      </div>
    </countCenterRigHeader>
    <div class="myNews"  v-loading="newsLoading">
      <div style="height: 40px;background: #AA9882;line-height: 40px;padding: 0 20px;box-sizing: border-box;">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" id="aaa">
          <span style="color: #FFFFFF;margin-left: 20px;">我的消息列表</span>
        </el-checkbox>
        <span style="color: white;float: right;">时间</span>
      </div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <ul>
          <li v-for="city in cities" style="height: 40px;line-height: 40px;padding: 0 20px;box-sizing:border-box;border-bottom: 1px solid #6C6863;position: relative;">
              <span>
                <el-checkbox  :label="city" :key="city.message_id">
                  <span style="border: 5px solid #AA9882;display: inline-block;border-radius: 50%;position: absolute;left: 25px;top: 15px;" v-if="city.status == 0"></span>
                  <span style="display:inline-block;width: 500px;color: white;margin-left: 20px;">
                  {{city.title | cutOut(50)}}
                  </span>
                </el-checkbox>
                <span style="display: inline-block;width: 670px;height: 40px;background: wheat;position: absolute;left: 40px;top: 0;opacity: 0;cursor: pointer;" @click="goToDetail(city.message_id)"></span>
              </span>
            <span style="color: white;float: right;">
                {{city.add_time | time}}
              </span>
          </li>
        </ul>
      </el-checkbox-group>
      <div style="height: 300px;text-align: center;padding: 100px;box-sizing: border-box;" v-if="cityOptions.length == 0">
        <img src="../../../assets/img/nodata.png" alt="">
        <div style="color: #FFFFFF;">暂无消息</div>
      </div>
      <span class="myNewsList" v-if="cityOptions.length>0">
          <el-button size="mini" type="primary" :disabled="deleDisable" @click="delateNews">删除</el-button>
          <el-button size="mini" type="primary" @click="mark" :disabled="markDisable">标记为已读</el-button>
          <el-button size="mini" type="primary" @click="allMark" :disabled="allMarkDisable">全部标记为已读</el-button>
        </span>
      <div style="display: inline-block;width: 450px;float: right;margin-top: 23px;" class="pagemyNews" v-if="cityOptions.length>0">
        <el-pagination
          background
          @current-change="pagechange"
          :current-page.sync="page.current"
          :page-size="10"
          layout="prev, pager, next"
          :total="page.total*10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import countCenterRigHeader from '../common/countCenterRigHeader.vue';
  import pagination from '../../pagination.vue'
  export default{
    data(){
      return {
        page:{
          current:1,
          total:0
        },
        Read:0,
        deleDisable:true,
        markDisable:true,
        cityOptions:[],
        checkAll: false,
        checkedCities: [],
        cities: this.cityOptions,
        isIndeterminate: true,
        noRead:0,
        seleTab:true,
        type:'noRead',
        currentTab:1,
        newsLoading:true,
        allMarkDisable:false
      }
    },
    methods:{
      goToDetail(id){
        this.$router.push({name:'myNewsDetail',params: { id: id }})
      },
      handleCheckAllChange(val) {
        console.log(val)
        this.checkedCities = val ? this.cityOptions : [];
        this.isIndeterminate = false;
        if(val){
          this.deleDisable = false;
          this.markDisable = false;
        }else{
          this.deleDisable = true;
          this.markDisable = true;
        }
      },
      handleCheckedCitiesChange(value) {
        console.log(value.length)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        this.deleDisable = true;
        this.markDisable = true;
        if(this.isIndeterminate || this.checkAll){
          this.deleDisable = false;
          if(this.type != 'Read'){
            this.markDisable = false;
          }
        }
      },
      myNewsTab(type,index){
        if(type == this.type){
          return;
        }else{
          this.type = type;
          this.currentTab = index;
          if(this.page.current != 1){
            this.page.current = 1;
          }else{
            this.sysmessage(this.currentTab - 1);
          }   ////deleDisable  mark  allMark
          if(type == 'Read'){
            this.allMarkDisable = true;
          }else{
            this.allMarkDisable = false;
          }
        }
      },
      delateNews(){
        var that = this;
        that.deleDisable = true;
        that.markDisable = true;
        this.interFace('delete_message',{
          message_id:that.checkedCities.map(
            function(data){
              return data.message_id
            }).join()
        }).then(function(res){
          that.$notify({
            title: '提示',
            message: '删除成功',
            offset: 300,
            duration:2000
          });
          var isNoRead = that.currentTab - 1;
          that.sysmessage(isNoRead);
        })
      },
      pagechange(data){
        this.page.current = data;
        var isNoRead = this.currentTab - 1;
        this.sysmessage(isNoRead);
      },
      markNews(seleCity){
        var  that = this;
        that.deleDisable = true;
        that.markDisable = true;
        this.interFace('query_message',{
          message_id:seleCity.join()
        }).then(function(res){
          that.$notify({
            title: '提示',
            message: '标记已读成功',
            offset: 300,
            duration:2000
          });
          var isNoRead = this.currentTab - 1;
          that.sysmessage(isNoRead)
        })
      },
      mark(){
        this.markNews(this.checkedCities.map(function(res){return res.message_id}))
      },
      allMark(){
        this.markNews(this.cities.map(function(data){return data.message_id}))
      },
      sysmessage(type){
        var that = this;
        that.interFace('sysmessage',{
          list:that.page.current - 1,
          value:10,
          type:type
        }).then(function(res){
          that.newsLoading = false;
          that.cityOptions = res.array;
          that.cities =  res.array;
          that.page.total = res.list;
          that.checkedCities = [];
          that.noRead = res.no_select;
          that.deleDisable = true;
          that.markDisable = true;
          that.Read = res.yes_select;
          if(that.noRead>0){
            sessionStorage.setItem('noReadNews',1);
            that.$store.state.noReadNews = true;
          }else{
            sessionStorage.setItem('noReadNews',0);
            that.$store.state.noReadNews = false;
          }
        })
      }
    },
    created(){
      this.sysmessage(0);
    },
    components:{
      countCenterRigHeader,pagination
    }
  }
</script>
<style>
  #aaa .el-checkbox__inner{
    border:1px solid white;
  }
  .myNews{
    padding:26px 30px;
  }
  table .el-checkbox__inner{
    border-radius: 50%;
  }
  .newsTable{
    border-collapse: collapse;
  }
  .newsTable tr > td:nth-of-type(1){
    padding:0 25px;
    width:50px;
  }
  .newsTable tr{
    height: 40px;
    line-height: 40px;
  }
  .myNewsList{
    height: 71px;
    line-height: 71px;
  }
  .myNewsList button{
    width:unset;
    height: 27px;
    padding:0 5px;
  }
  .sele{
    color: #FFFFFF;
    border-bottom: 1px solid #E2CDAA;
  }
  .myNewsTab{
    display: inline-block;
    width: 45px;
    border-bottom: 2px solid #E2CDAA;
    left: 0px;
    top: 25px;
    position: absolute;
    transition: all 0.5s;
  }
  .pagemyNews li{
    height: 27px;
  }
  .pagemyNews .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    margin: 0 3px;
  }
  .pagemyNews .el-pagination{
    display: inline-block;
    float: right;
  }
  .myNewsUlTab{
    position: relative;
  }
  .myNewsUlTab li{
    display: inline-block;
    cursor: pointer;
    margin-right: 15px;
    /*padding-bottom: 15px;*/
  }
  .myNewsUlTab li span:nth-of-type(1){
    padding-bottom: 15px;
  }
</style>
