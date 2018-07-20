<template>
    <div>
      <countCenterRigHeader>
        <div class="back">工单管理</div>
      </countCenterRigHeader>
      <div class="manageSubmit">
        <myPropertyTitle>
          <span style="margin-left: 20px;">
            <span class="fontColor">待解决问题：</span>
            <span class="fontRed">{{work_num.wait_work}}</span>
          </span>
          <span style="margin-left: 170px;">
            <span class="fontColor">已解决问题：</span>
            <span class="fontRed">{{work_num.over_work}}</span>
          </span>
        </myPropertyTitle>
        <div style="padding: 15px 30px;">
          <span>
            <span class="fontColor">临时联系人：</span>
            <span class="manageSubPeop">
              <el-input v-model="input1" placeholder="请输入提交人姓名" @change="phone('name')" clearable></el-input>
            </span>
          </span>
          <span style="margin-left: 70px;">
            <span class="fontColor">临时联系电话：</span>
            <span class="manageSubPeop">
              <el-input v-model="input2" placeholder="请输入电话" @change="phone('phone')" clearable></el-input>
            </span>
            <span style="color: red;" v-if="numberType">电话号码格式不正确</span>
          </span>
        </div>
        <div class="manageTextarea">
          <el-input
            type="textarea"
            clearable
            :autosize="{ minRows: 4}"
            placeholder="说说您遇到的问题，我们会尽快为您解答"
            v-model="textarea2"  @input="questionCon">
          </el-input>
        </div>
        <div class="submitQuestion">
          <el-button type="primary" @click="submitQues" :disabled="submintQDis">提交问题</el-button>
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
          input1: '',
          input2: '',
          textarea2:'',
          work_num:{},
          submintQDis:true,
          numberType:false
        }
    },
    methods:{
      phone(type){
        if(type == 'name'){
          if(this.input1.length>30){
            this.input1 = this.input1.slice(0,30)
          }
        }else{
          var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          if(!myreg.test(this.input2)){
            this.numberType = true;
          }else{
            this.numberType = false;
          }
        }
      },
      questionCon(){
        if(this.textarea2){
          this.submintQDis = false;
        }else{
          this.submintQDis = true;
        }
      },
      submitQues(){
        var that = this;
        that.submintQDis = true;
        this.interFace('insert_work',{
          work_body:that.textarea2,
          work_name:that.input1,
          work_phone:that.input2
        }).then(function(res){
          that.submintQDis = false;
          if(res.body){
            that.$notify.error({
              title: '提交失败',
            });
          }else{
            that.work_count();
            that.$notify({
              title: '提交成功',
              type: 'success'
            });
            that.$router.push({name:'management'})
          }
        })
      },
      work_count(){
        var that = this;
        this.interFace('work_count',{}).then(function(res){
            console.log(res)
          that.work_num = res;

        })
      }
    },
    created(){
      this.work_count()
    },
    components:{
      countCenterRigHeader,myPropertyTitle
    }
  }
</script>
<style>
  .manageSubmit{
    padding:30px;
  }
  .manageSubPeop{
    display: inline-block;
    width:150px;
  }
  .manageSubPeop .el-input__inner{
    font-size: 12px;
    height: 30px;
  }
  .fontColor{
    color: #FFFFFF;
  }
  .fontRed{
    color: #FF0D2A;
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
  .submitQuestion{
    margin:30px 0;
    text-align: right;
  }
  .submitQuestion button{
    width:160px;
    height: 30px;
    padding:0;
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
</style>
