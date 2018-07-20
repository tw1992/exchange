<template>
  <div class="myAdvice margin_center content-center" v-loading="loadingShow">
    <div class="myAdviceTitle">
      <!--<div v-if="page.total == 0">-->
      <!--我的建议-->
      <!--<span style="float: right;">-->
      <!--<el-button type="primary" @click="goToAdvice">+提建议</el-button>-->
      <!--</span>-->
      <!--</div>-->
      <div style="height: 100%;">
        <ul class="myAdviceUl">
          <li v-for="item,index in tab" :class="{'adviceTab':index == currentTab}" @click="tabStatus(index)">
            {{item}}
          </li>
          <li style="float: right;line-height: 60px;height: 100%;">
                  <span style="float: right;" v-if="page.total == 0">
                    <el-button type="primary" @click="goToAdvice">+提建议</el-button>
                  </span>
          </li>
        </ul>

      </div>
    </div>
    <div class="myAdviceContent">
      <ul v-if="mark.length">
        <li v-for="item in mark">
          <img :src="item.head" alt="" style="width: 30px;height: 30px;border-radius: 50%;margin-right: 15px;vertical-align: top;">
          <div style="display: inline-block;word-break: break-all;width: calc(100% - 50px);">
            <div>
              <span style="color: #A6A6A6;">我的意见反馈：</span>
              <span style="color:#313131">{{item.content | cutOut(60)}}</span>
            </div>
            <div style="margin-top: 10px;" class="timelineDiv">
                  <span>
                    {{item.timeline | time}}
                  </span>
              <span :class="{'color0':item.solve == 0,'color1':item.solve == 1}">
                    {{item.solve | myAdviceFilter}}
                  </span>
              <span @click="detail('detail',item.id)" class="myAdviceColor">
                    查看详情
                  </span>
              <span @click="detail('dele',item.id)" class="myAdviceColor" v-if="item.solve == 1">
                    删除
                  </span>
            </div>
          </div>
        </li>
        <li>
          <div style="text-align: center;margin: 20px 0;" v-if="page.total">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="page.current"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="page.total*10">
            </el-pagination>
          </div>
        </li>
      </ul>
      <div style="text-align: center;margin-top: 200px;" v-if="page.total == 0">
        你目前没有{{solve | myAdviceFilter}}的建议
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        tab:['全部建议','处理中','已处理'],
        name:'',
        img:'',
        question:'',
        advice:'',
        solve:'2',
        currentTab:0,
        page:{
          current:1,
          total:0
        },
        mark:[],
        loadingShow:true
      }
    },
    methods:{
      detail(type,id){
        if(type == 'detail'){
          this.$router.push({name:'myAdviceDetail',params:{id:id}})
        }else if(type == 'dele'){
          var that  = this;
          this.interFace('update_status_feedback',{
            feedback_id:id,
            solve:'2'
          }).then(function(res){
            that.$notify({
              title: '删除成功',
              type: 'success'
            });
            if(that.page.current == 1){
              that.feedback_list();
            }else{
              that.page.current = 1
            }
          })
        }
      },
      tabStatus(index){
        if(this.currentTab != index){
          this.loadingShow = true;
          this.currentTab = index;
          if(index == 0){
            this.solve = '2'
          }else if(index == 1){
            this.solve = '0'
          }else{
            this.solve = '1'
          }
          if(this.page.current == 1){
            this.feedback_list();
          }else{
            this.page.current = 1
          }
        }
      },
      handleCurrentChange(data){
        this.page.current = data;
        this.feedback_list();
      },
      goToAdvice(){
        this.$router.push({name:'advice'})
      },
      feedback_list(){
        var that = this;
        this.interFace('feedback_list',{
          solve:this.solve,   //0处理中   1已完成   2全部
          list:this.page.current - 1,
          value:10
        }).then(function(res){
          that.loadingShow = false;
          that.page.total = res.list;
          that.mark = res.mark;
        })
      }
    },
    created(){
      this.feedback_list()
    }
  }
</script>
<style>
  .myAdviceTitle{
    height: 60px;
    line-height: 50px;
    background: #21201A;
    color: #FFFFFF;
    padding:0 30px;
  }
  .myAdviceTitle button{
    width:80px;
    height: 30px;
    padding:0;
    line-height: 30px;
  }
  .myAdviceTitle > span{
    float: right;
  }
  .myAdviceContent{
    border:1px solid #ddd;
    min-height: 500px;
  }
  .myAdviceContent>ul>li{
    padding:20px 30px;
    border-bottom: 1px solid #EDEDED;
  }
  .myAdviceContent>ul>li:nth-last-of-type(1){
    border-bottom: none;
  }
  .adviceTab{
    border-bottom: 3px solid #E2CDAA;
  }
  .imgStyle{
    width: 45px;
    height: 45px;
    display: inline-block;
    vertical-align: top;
  }
  .adviceStyle{
    width:887px;
    display: inline-block;
  }
  .myAdviceUl{
    height: 92%;
  }
  .myAdviceUl li{
    cursor: pointer;
    display: inline-block;
    margin-right: 20px;
    height: 100%;
    line-height: 66px;
  }
  .myAdviceColor{
    color: #AA9882;
    cursor: pointer;
  }
  .color0{
    color: #CC0000;
  }
  .color1{
    color: #009765;
  }
  .timelineDiv span{
    margin-right: 10px;
  }
</style>
