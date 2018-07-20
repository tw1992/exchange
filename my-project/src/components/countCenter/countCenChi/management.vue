<template>
  <div v-loading="loading">
    <div>
      <!--<countCenterRigHeader>-->
      <ul class="manageTab">
        <li v-for="item,key in tabList" :class="{'manageTabSele':key == index}" @click="tabClick(key)">
          {{item}}
        </li>
      </ul>
      <!--<div class="mamageLine"></div>-->
      <!--</countCenterRigHeader>-->
      <div class="manageTop">
        <div class="manageHead">
          <span style="color: #FFFFFF;">工单编号</span>
          <span class="manageInput">
             <el-input
               placeholder="请输入编号"
               v-model="inputId"
               clearable>
              </el-input>
          </span>
          <span style="color: #FFFFFF;float: right;" class="picker1">
            <span>日期</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
              size="small">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              v-model="value2"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
              size="small">
            </el-date-picker>
            <span>关键字</span>
            <span class="manageInput">
             <el-input
               placeholder="请输入内容"
               v-model="inputContent"
               clearable>
              </el-input>
          </span>
            <span class="buttrecord">
               <el-button type="primary" @click="search">搜索</el-button>
            </span>
          </span>
        </div>
        <div style="padding: 30px;">
          <table class="manageTable">
            <thead>
            <tr>
              <th v-for="item in theader">
                {{item}}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list" style="border-bottom: 1px solid #6C6863">
              <td style="text-align: center;color:#FFFFFF;">{{item.id}}</td>
              <td style="color: #AA9882;cursor: pointer" @click="$router.push({name:'managementDetail',params:{id:item.id}})">{{item.content | cutOut(16)}}</td>
              <td class="tdStyle">{{item.timeline | time}}</td>
              <td class="tdStyle">{{item.temporary_name}}</td>
              <td class="tdStyle">{{item.status | manageStatus}}</td>
              <td class="tdLast"><span @click="$router.push({name:'managementDetail',params:{id:item.id}})">查看</span><span v-if="item.status == 1 || item.status == -1" @click="deleteManage(item.id)"> | 删除</span></td>
            </tr>
            </tbody>
            <tfoot v-if="list.length == 0">
            <tr>
              <td colspan="6" style="text-align: center;">
                <div style="margin: 20px;">
                  <img src="../../../assets/img/nodata.png" alt="">
                  <div style="color: #FFFFFF;">
                    暂无数据
                  </div>
                </div>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
        <div style="text-align: center;" v-if="page.total>0">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="page.currentpage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="page.total*10">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import countCenterRigHeader from '../common/countCenterRigHeader.vue';
  export default{
    data(){
      return {
        page:{
          total:0,
          currentpage:1
        },
        inputContent: '',
        index:0,
        inputId:'',
        tabList:['全部工单','处理中','已完成','已关闭'],
        theader:['工单编号','问题内容','提交时间','提交人','状态','操作'],
        value1:'',
        value2:'',
        list:[],
        loading:true
      }
    },
    created(){
      this.work_list(2)
    },
    methods:{
      handleCurrentChange(data){
        console.log(data)
        this.page.currentpage = data;
        this.work_list(this.stautsFn(this.index))
      },
      work_list(stauts){
        var that = this;
        if(that.value1){
          var stime = this.value1.getTime() / 1000;
        }
        if(that.value2){
          var etime = this.value2.getTime() / 1000;
        }
        this.interFace('work_list',{
          status:stauts,
          work_id:that.inputId,
          stime:stime,
          etime:etime,
          work_title:that.inputContent,
          list:that.page.currentpage - 1,
          value:10
        }).then(function(res){
          that.list = res.mark;
          that.page.total = res.list;
          that.loading = false;
        })
      },
      stautsFn(index){
        var status = '';
        switch (index){
          case 0:
            status = 2;
            break;
          case 1:
            status = 0;
            break;
          case 2:
            status = 1;
            break;
          case 3:
            status = -1;
            break;
        }
        return status
      },
      tabClick(index){
        //0:处理中  1：已完成  -1：已关闭   2：获取全部  ／／['全部工单','处理中','已完成','已关闭']
        if(index != this.index){
          this.loading = true;
          this.index = index;
          this.work_list(this.stautsFn(index));
        }
      },
      search(){
        this.work_list(this.stautsFn(this.index))
      },
      deleteManage(id){
        var that = this;
        this.interFace('update_status_work',{
          work_id:id,
          status:2
        }).then(function(res){
          console.log(res);
          that.work_list(that.stautsFn(that.index))
        })
      },
      pickerOptions1:{
        disabledDate(time){
          return time.getTime() > Date.now();
        }
      },
    },
    components:{
      countCenterRigHeader
    }
  }
</script>
<style>
  .manageTab{
    height: 60px;
    background: #21201A;
    line-height: 60px;
    padding-left: 30px!important;
  }
  .manageTab li{
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    color:#908F8C;
  }
  .manageTabSele{
    color: #FFFFFF!important;
    border-bottom:2px solid  #E2CDAA;
  }
  .manageTop{
    border-top: 2px solid #373631;
    margin-bottom: 30px;
  }
  .manageHead{
    background: #21201A;
    padding: 20px 30px;
  }
  .picker1 .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:129px!important;
    border:none!important;
    outline: none;
  }
  .picker1 .el-date-editor.el-input, .el-date-editor.el-input__inner>input{
    border:none;
    outline: none;
    height: 30px;
    box-sizing: border-box;
  }
  .picker1 .el-input--small .el-input__inner{
    height: 30px;
  }
  .buttrecord button{
    width:80px;
    height: 30px;
    padding-top:0;
    padding-bottom: 0;
    margin-left:10px;
    cursor: pointer;
  }
  .manageTable{
    width: 100%;
    border-collapse: collapse;
  }
  .manageTable th:nth-of-type(2){
    width:34%;
  }
  .manageTable thead{
    color: #FFFFFF;
    background: #AA9882;
  }
  .manageTable tr{
    height: 40px;
  }
  .manageInput{
    display: inline-block;
    width:100px;
  }
  .manageInput .el-input__inner{
    height: 30px;
    font-size: 12px;
  }
  .tdStyle{
    text-align: center;color: #FFFFFF;
  }
  .tdLast{
    text-align: center;
    color: #AA9882;
    cursor: pointer
  }
</style>
