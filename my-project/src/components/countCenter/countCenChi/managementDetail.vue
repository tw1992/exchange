<template>
    <div>
      <countCenterRigHeader>
        <div class="back" @click="backMyPro">< 全部工单</div>
      </countCenterRigHeader>
      <div class="manageDetail">
        <myPropertyTitle>
          <span style="margin-left: 20px;color: #FFFFFF;">工单详情</span>
        </myPropertyTitle>
        <div>
          <ul class="manageDUl">
            <li>
              <div style="margin-right: 30px;">
                <span class="questionTitle">问题内容：</span>
                <span class="questionCon">{{work.content}}</span>
              </div>
              <div class="questionConMid">
                <span>
                  <span class="questionTitle">工单编号：</span>
                  <span class="questionCon">{{work.id}}</span>
                </span>
                <span>
                  <span class="questionTitle">提交时间：</span>
                  <span class="questionCon">{{work.timeline | time}}</span>
                </span>
                <span>
                  <span class="questionTitle">工单状态：</span>
                  <span class="questionCon">{{work.status | manageStatus}}</span>
                </span>
                <span style="color: #AA9882;cursor: pointer;" @click="overOrder('delete')" v-if="work.status != 0">
                  删除工单
                </span>
              </div>
              <div class="questionConMid">
                <span>
                  <span class="questionTitle">临时联系人：</span>
                  <span class="questionCon">{{work.temporary_name}}</span>
                </span>
                <span>
                  <span class="questionTitle">临时联系电话：</span>
                  <span class="questionCon">{{work.temporary_phone}}</span>
                </span>
              </div>
            </li>
            <li>
              <span class="questionCon">沟通记录</span>
            </li>

            <li v-for="item in comment" style="padding:10px 30px">
              <span style="display: inline-block;margin-right: 15px;vertical-align: top;">
                <img :src="item.head" alt="" style="width: 30px;height: 30px;border-radius: 50%;">
              </span>
              <div style="display: inline-block;width:calc(100% - 50px);">
                <span v-if="item.member_id != 0" class="questionTitle" style="word-break: break-all;">
                我的回复: {{item.body}}
                </span>
                <span v-if="item.member_id == 0" class="questionCon">
                  官方回复: {{item.body}}
                </span>
                <div class="questionTitle" style="margin-top: 8px;">
                  {{item.timeline|time}}
                </div>
              </div>
            </li>
            <div style="text-align: right;padding: 10px 0;" v-if="work.status == 0">
              <span class="submitMamagement" style="margin-right: 10px;">
                  <el-button type="primary" @click="overOrder('close')" :disabled="closeBut">关闭工单</el-button>
              </span>
              <span class="submitMamagement">
                  <el-button type="primary" @click="overOrder('over')" :disabled="overBut">完成工单</el-button>
              </span>
            </div>
          </ul>
          <div style="text-align: center;margin: 20px 0;" v-if="page.total">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="page.currentpage"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="page.total*10">
            </el-pagination>
          </div>
          <div v-if="work.status != 1 && work.status!=-1">
            <div class="manageTextarea">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="请输入"
                v-model="textarea2"  @input="questionCon">
              </el-input>
            </div>
            <div class="manageSubBut">
              <el-button type="primary" @click="submit" :disabled="manaDetaiSub">提交</el-button>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>
<script>
  import countCenterRigHeader from '../common/countCenterRigHeader.vue';
  import myPropertyTitle from '../common/certifyTitle.vue';
  export default{
    data(){
      return {
        page:{
          total:0,
          currentpage:1
        },
        work:{},
        showBut:true,
        closeBut:false,
        overBut:false,
        comment:[],
        textarea2:'',
        manaDetaiSub:false,
      }
    },
    created(){
      this.work_find(this.$route.params.id)
    },
    methods:{
      submit(){
        var that = this;
        that.manaDetaiSub = true;
        this.interFace('insert_work_comment',{
          work_id:this.$route.params.id,
          body:this.textarea2
        }).then(function(res){
          that.manaDetaiSub = false;
          if(!res.body){
            that.textarea2 = '';
            that.$notify({
              title: '回复成功',
              type: 'success'
            });
            if(that.page.currentpage != 1){
              that.page.currentpage = 1;
            }else{
              that.work_find(that.$route.params.id)
            }
          }else{
            that.$notify.error({
              title: res.body,
            });
          }
        })
      },
      work_comment(){
        var that = this;
        this.interFace('work_comment',{
          work_id:this.$route.params.id,
          list:this.page.currentpage - 1,
          value:5
        }).then(function(res){
          that.comment =res.comment
        })
      },
      questionCon(data){

      },
      handleCurrentChange(data){
        this.page.currentpage = data;
        this.work_comment();
      },
      work_find(id){
        var that = this;
        this.interFace('work_find',{work_id:id,value:5}).then(function(res){
          console.log(res)
          that.page.total = res.list;
          that.page.total = res.list;
          that.work = res.work;
          if(that.page.currentpage == 1){
            that.comment = res.comment;
          }
        })
      },
      backMyPro(){
        this.$router.push({name:'management'})
      },
      overOrder(type){
        if(type == 'over'){
          var stauts = 1;
          var tip = '结束工单'
        }else if(type == 'close'){
          var stauts = -1;
          var tip = '关闭工单'
        }else if(type == 'delete'){
          var stauts = 2;
          var tip = '删除工单';
        }
        var that = this;
        that.closeBut = true;
        that.overBut = true;
        this.interFace('update_status_work',{
          work_id:this.$route.params.id,
          status:stauts    //2删除   1完成  -1 关闭
        }).then(function(res){
          that.closeBut = false;
          that.overBut = false;
          if(res.body){
            that.$notify.error({
              title: tip + '失败',
            });
            return;
          }
          that.showBut = false;
          that.$notify({
            title: tip + '成功',
            type: 'success'
          });
          if(stauts == 1 || stauts == -1){
            that.work_find(that.$route.params.id);
          }else{
            that.$router.push({name:'management'})
          }
        })
      }
    },
    components: {
      countCenterRigHeader,myPropertyTitle
    }
  }
</script>
<style>
  .back{
    cursor: pointer;
  }
  .manageDetail{
    padding:30px;
  }
  .submitMamagement button{
    width:160px;
    height: 30px;
    padding:0;
  }
  .manageDUl li{
    padding: 10px 0 10px 30px;
    border-bottom: 1px solid #6C6863;
  }
  .questionTitle{
    color: #A6A6A6;
  }
  .questionCon{
    color: #FFFFFF;
  }
  .questionConMid{
    margin: 8px 0;
  }
  .questionConMid>span{
    display: inline-block;
  }
  .questionConMid>span:nth-of-type(1),.questionConMid>span:nth-of-type(2){
    width: 30%;
  }
  .questionConMid>span:nth-of-type(3){
    width: 20%;
  }
  .questionConMid>span:nth-of-type(4){
    float: right;
  }
  .manageTextarea textarea{
    resize:none!important;
  }
  .manageTextarea .el-textarea__inner{
    font-size: 12px;
    background-color: #353535;
    border:none;
    color: #FFFFFF;
  }
  .manageSubBut{
    text-align: right;
    margin-top: 10px;
  }
  .manageSubBut button{
    width:160px;
    height: 30px;
    padding:0;
  }
</style>
