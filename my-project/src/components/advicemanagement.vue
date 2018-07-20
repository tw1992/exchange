<template>
  <div class="management">
    <div class="managementTitle">
        意见反馈
    </div>
    <div class="managementContent">
      <div>
        <el-button type="primary" size="medium" @click="advice('advice')">提意见</el-button>
        <span>
          <span class='adviceNum'>{{numPass}}</span>
          待处理建议
        </span>
      </div>
      <div>
        <el-button type="primary" size="medium" @click="advice('myAdvice')">我的建议</el-button>
        <span>
          <span class='adviceNum'>{{numAccept}}</span>
          条建议累积采纳
        </span>
      </div>
    </div>
  </div>
</template>
<style>
  .management{
    width:1000px;
    margin:20px auto;
    border: 1px solid #ddd;
    min-height: 500px;
  }
  .managementTitle{
    background: #21201A;
    color: #FFFFFF;
    padding:0 27px;
    height: 50px;
    line-height: 50px;
  }
  .managementContent{
    height: 360px;
  }
  .managementContent>div{
    margin-top: 24px;
  }
  .managementContent button{
    width: 160px;
    height: 30px;
    line-height: 30px;
    padding:0;
    margin:0 28px;
  }
  .adviceNum{
      font-size: 20px;
  }
</style>
<script>
    export default{
        data(){
            return {
              numAccept:0,
              numPass:0
            }
        },
        methods:{
          advice(type){
            if(type == 'advice'){
              this.$router.push({name:'advice'})
            }else if(type == 'myAdvice'){
              this.$router.push({name:'myAdvice'})
            }
          }
        },
        created(){
          var that = this;
          this.interFace('feedback_count',{}).then(function(res){
            that.numAccept = res.wait_feedback
            that.numPass = res.over_feedback;
          })
        },
        components: {

        }
    }
</script>
