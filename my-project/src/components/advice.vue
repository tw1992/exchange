<template>
  <div class="advice margin_center content-center">
    <div class="managementTitle clear">
      <span>意见反馈</span>
      <span class="gomyAdvice">
              <el-button type="primary" size="medium" @click="myAdvice">
                我的建议
              </el-button>
            </span>
    </div>
    <ul>
      <li>
        <p>
          【意见或反馈内容】：
        </p>
        <el-input
          type="textarea"
          clearable
          :autosize="{ minRows: 5}"
          placeholder="请描述您的建议..."
          @change="content('question')"
          v-model="discript" @input="content">
        </el-input>
      </li>
    </ul>
    <div class="adviceSub">
          <span>
            <el-button type="primary" size="medium" @click="submit()" :disabled="disable">提交建议</el-button>
          </span>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        discript:'',
        adviceContent:'',
        disable:true
      }
    },
    methods:{
      myAdvice(){
        this.$router.push({name:'myAdvice'})
      },
      submit(){
        if(this.discript){
          var that = this;
          this.interFace('insert_feedback',{
            feedback_body:this.discript,
          }).then(function(res){
            console.log(res)
            that.$notify({
              title: '您的建议提交成功',
              type: 'success'
            });
            that.$router.push({name:'myAdvice'})
          })
        }else{

        }
      },
      content(data){
        if(this.discript){
          this.disable = false;
        }else{
          this.disable = true;
        }
      }
    }
  }
</script>
<style>
  .advice{
    border:1px solid #ddd;
    box-sizing: border-box;
    min-height: 500px;
  }
  .advice li{
    margin:30px;
  }
  .advice p{
    margin-bottom: 10px!important;
  }
  .managementTitle{
    background: #21201A;
    color: #FFFFFF;
    padding:0 27px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
  }
  textarea{
    width:100%;
    outline: none;
    padding:5px 10px;
    box-sizing: border-box;
  }
  .adviceSub{
    margin: 30px;
    text-align: right;
  }
  .adviceSub button{
    width:147px;
    height: 30px;
    padding:0;
    line-height: 30px;
  }
  .gomyAdvice{
    float: right;
  }
  .gomyAdvice button{
    width: 120px;
    height: 30px;
    padding:0;
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
</style>
