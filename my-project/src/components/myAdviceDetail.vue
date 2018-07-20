<template>
  <div class="myAdviceDetail margin_center content-center" v-loading="loadingShow">
    <div class="myAdviDetai" @click="goToBack">
      <  {{status | myAdviceFilter}}
    </div>
    <div>
      <ul class="advicedetailUl">
        <li v-for="item,key in itemFeedback_find">
          <img :src="item.head" alt="" style="width: 30px;height: 30px;border-radius: 50%;vertical-align: top;margin-right: 15px;">
          <div style="display: inline-block;word-break: break-all;width: calc(100% - 50px);">
            <div v-if="key == 0" style="color:#A6A6A6;">
              我的意见反馈：<span>
                  {{item.body}}
                </span>
            </div>
            <div v-if="key == 1" style="color:#313131;">
                <span>
                    {{item.name}}：
                </span>
              <span>
                  {{item.body}}
                </span>
            </div>
            <div style="color:#A6A6A6;margin-top: 8px;">
                <span>
                    {{item.timeline | time}}
                </span>
            </div>
          </div>
        </li>
      </ul>
      <div style="text-align: right;margin-top: 20px;margin-right: 30px;" class="advicedetailbut" v-if="status == 1">
        <el-button type="primary" @click="deleAdvice">删除已完成建议</el-button>
      </div>
    </div>
  </div>
</template>
<style>
  .myAdviceDetail{
    min-height: 500px;
    border: 1px solid #EDEDED;
  }
  .advicedetailbut button{
    width: 160px;
    height: 30px;
    padding:0;
  }
  .myAdviDetai{
    height: 60px;
    background: #21201A;
    line-height: 60px;
    color: #CEC6BE;
    padding-left: 30px;
    cursor: pointer;
  }
  .advicedetailUl li{
    padding:10px 30px;
    border-bottom: 1px solid #EDEDED;
  }
</style>
<script>
  export default{
    data(){
      return {
        itemFeedback_find:[],
        status:'',
        loadingShow:true
      }
    },
    methods:{
      goToBack(){
        this.$router.push({name:'myAdvice'})
      },
      deleAdvice(id){
        var that = this;
        this.interFace('update_status_feedback',{
          feedback_id:this.$route.params.id,
          solve:2
        }).then(function(res){
          console.log(res)
          that.$notify({
            title: '删除成功',
            type: 'success'
          });
          that.$router.push({name:'myAdvice'})
        })
      }
    },
    created(){
      var that = this;
      this.interFace('feedback_find',{
        feedback_id:this.$route.params.id
      }).then(function(res){
        console.log(res)
        that.loadingShow = false;
        that.itemFeedback_find = res.comment;
        that.status = res.comment[0].solve;
      })
    }
  }
</script>
